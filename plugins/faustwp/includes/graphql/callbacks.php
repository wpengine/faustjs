<?php
/**
 * Various callbacks to augment WP GraphQL by adding types, fields, etc.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\GraphQL;

use function WPE\FaustWP\Auth\generate_authorization_code;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'graphql_register_types', __NAMESPACE__ . '\\register_templates_field' );
/**
 * Registers templates field on the UniformResourceIdentifiable type in WP GraphQL. This templates field lists out the
 * templates that WordPress would typically try to locate and load for a given URI.
 *
 * A good amount of the logic in the resolver for this type is extracted from WordPress' template-loader.php file. It's
 * important that we keep this in sync as much as possible to ensure that the returned array is consistent with what
 * WordPress would actually do.
 *
 * @return void
 *
 * @uses WPE\FaustWP\GraphQL\log_template_hierarchy
 * @uses WPE\FaustWP\GraphQL\template_hierarchy_types
 * @uses WPE\FaustWP\GraphQL\get_conditional_tags
 *
 * @see  template-loader.php
 * @uses register_graphql_field
 */
function register_templates_field() {
	register_graphql_field(
		'UniformResourceIdentifiable',
		'templates',
		array(
			'type'    => array( 'list_of' => 'String' ),
			'resolve' => __NAMESPACE__ . '\\templates_resolver',
		)
	);
}

add_action( 'graphql_register_types', __NAMESPACE__ . '\\register_faust_toolbar_field' );
/**
 * Registers a field on the User model called "shouldShowFaustToolbar" which
 * gets the user's WP Admin toolbar preference. This is then used to conditionally
 * show the Faust toolbar on the headless frontend.
 *
 * @return void
 *
 * @uses register_graphql_field
 * @uses wp_get_current_user
 * @uses get_user_meta
 */
function register_faust_toolbar_field() {
	register_graphql_field(
		'User',
		'shouldShowFaustToolbar',
		array(
			'type'    => 'Boolean',
			'resolve' => function() {
				$user                    = wp_get_current_user();
				$toolbar_preference_meta = get_user_meta( $user->ID, 'show_admin_bar_front', true );

				return 'true' === $toolbar_preference_meta ? true : false;
			},
		)
	);
}

add_action( 'graphql_register_types', __NAMESPACE__ . '\\register_global_stylesheet_field' );
/**
 * Registers a field on the User model called "globalStylesheet" which
 * returns the stylesheet resulting of merging core, theme, and user data.
 *
 * @return void
 *
 * @uses register_graphql_enum_type
 * @uses register_graphql_field
 * @uses wp_get_global_stylesheet
 *
 * @link https://developer.wordpress.org/reference/functions/wp_get_global_stylesheet/
 */
function register_global_stylesheet_field() {
	register_graphql_enum_type(
		'GlobalStylesheetTypesEnum',
		array(
			'description' => __( 'Types of styles to load', 'faustwp' ),
			'values'      => array(
				'VARIABLES'          => array(
					'value' => 'variables',
				),
				'PRESETS'            => array(
					'value' => 'presets',
				),
				'STYLES'             => array(
					'value' => 'styles',
				),
				'BASE_LAYOUT_STYLES' => array(
					'value' => 'base-layout-styles',
				),
			),
		)
	);

	register_graphql_field(
		'RootQuery',
		'globalStylesheet',
		array(
			'type'        => 'String',
			'args'        => array(
				'types' => array(
					'type'        => array( 'list_of' => 'GlobalStylesheetTypesEnum' ),
					'description' => __( 'Types of styles to load.', 'faustwp' ),
				),
			),
			'description' => __( 'Returns the stylesheet resulting of merging core, theme, and user data.', 'faustwp' ),
			'resolve'     => function( $root, $args, $context, $info ) {
				$types = $args['types'] ?? null;

				return wp_get_global_stylesheet( $types );
			},
		)
	);
}

/**
 * Resolver for getting the templates that will be loaded on a given node
 *
 * @param array       $root  GraphQL Root Object.
 * @param array       $args  Args passed to query.
 * @param AppContext  $context The context of the query to pass along.
 * @param ResolveInfo $info The ResolveInfo object.
 *
 * @return array|string[]
 */
function templates_resolver( $root, $args, AppContext $context, ResolveInfo $info ) {
	global $wp_query;
	global $faustwp_checked_templates;
	$faustwp_checked_templates = array();

	// Loop through each of the template conditionals, and find the appropriate template file.
	foreach ( template_hierarchy_types() as $type ) {
		add_filter( "{$type}_template_hierarchy", __NAMESPACE__ . '\\log_template_hierarchy' );
	}

	$template = false;

	/**
	 * Force $wp_query to initialize as WP GraphQL does not always parse the query. This is important for getting
	 * all of the templates for the site root.
	 */
	$wp_query->parse_query();

	foreach ( get_conditional_tags() as $tag => $tag_info ) {
		if ( empty( $tag_info['template_getter'] ) ) {
			continue;
		}

		$template_getter = $tag_info['template_getter'];

		if ( call_user_func( $tag ) ) {
			$template = call_user_func( $template_getter );
		}

		if ( $template ) {
			if ( 'is_attachment' === $tag ) {
				remove_filter( 'the_content', 'prepend_attachment' );
			}

			break;
		}
	}

	foreach ( template_hierarchy_types() as $type ) {
		remove_filter( "{$type}_template_hierarchy", __NAMESPACE__ . '\\log_template_hierarchy' );
	}

	/* Strip PHP extension from the checked templates */
	$faustwp_checked_templates = array_map(
		function ( $template ) {
			return basename( $template, '.php' );
		},
		$faustwp_checked_templates
	);

	/**
	 * Add index as the default template.
	 */
	return array_unique( array_merge( $faustwp_checked_templates, array( 'index' ) ) );
}

/**
 * Callback to log the templates that will be located by WordPress into a global variable.
 *
 * @param string[] $templates Templates being loaded.
 *
 * @return array
 */
function log_template_hierarchy( $templates ) {
	global $faustwp_checked_templates;
	$faustwp_checked_templates = array_merge( $faustwp_checked_templates, $templates );
	return $faustwp_checked_templates;
}

add_action( 'graphql_register_types', __NAMESPACE__ . '\\register_conditional_tags_field' );
/**
 * Adds ConditionalTags type and registers it as a field on the UniformResourceIdentifiable type. This type handles
 * evaluating the supported conditional tags and providing it over GraphQL for a given URI.
 *
 * @return void
 * @uses register_graphql_field
 * @uses WPE\FaustWP\GraphQL\get_conditional_tags
 *
 * @uses register_graphql_object_type
 *
 * @deprecated
 */
function register_conditional_tags_field() {
	register_graphql_object_type(
		'ConditionalTags',
		array(
			'description' => __( 'GraphQL representation of WordPress Conditional Tags.', 'faustwp' ),
			'fields'      => array_map(
				function ( $tag ) {
					return array(
						'type'              => 'Boolean',
						'deprecationReason' => __( 'Deprecated in favor of using Next.js pages', 'faustwp' ),
						'description'       => $tag['description'],
					);
				},
				array_combine(
					array_map(
						'\WPE\FaustWP\Utilities\camelcase',
						array_keys( get_conditional_tags() )
					),
					array_values( get_conditional_tags() )
				)
			),
		)
	);

	register_graphql_field(
		'UniformResourceIdentifiable',
		'conditionalTags',
		array(
			'type'              => 'ConditionalTags',
			'deprecationReason' => __( 'Deprecated in favor of using Next.js pages', 'faustwp' ),
			'resolve'           => __NAMESPACE__ . '\\conditional_tags_resolver',
		)
	);
}

/**
 * Resolver for conditionalTags field.
 *
 * @param array       $root  GraphQL Root Object.
 * @param array       $args  Args passed to query.
 * @param AppContext  $context The context of the query to pass along.
 * @param ResolveInfo $info The ResolveInfo object.
 *
 * @return array
 */
function conditional_tags_resolver( $root, $args, AppContext $context, ResolveInfo $info ) {
	$conditional_tag_values = array();

	foreach ( get_conditional_tags() as $tag => $tag_info ) {
		$conditional_tag_values[ \WPE\FaustWP\Utilities\camelcase( $tag ) ] = $tag();
	}

	return $conditional_tag_values;
}

add_action( 'graphql_register_types', __NAMESPACE__ . '\\register_generate_ac_mutation' );
/**
 * Register a mutation for exchanging a username/email and password for a short-lived authorization code.
 *
 * @return void
 */
function register_generate_ac_mutation() {
	register_graphql_mutation(
		'generateAuthorizationCode',
		array(
			'inputFields'         => array(
				'username' => array(
					'type'        => 'String',
					'description' => __( 'Username for WordPress user', 'faustwp' ),
				),
				'email'    => array(
					'type'        => 'String',
					'description' => __( 'Email for WordPress user', 'faustwp' ),
				),
				'password' => array(
					'type'        => 'String',
					'description' => __( 'Password for WordPress user', 'faustwp' ),
				),
			),
			'outputFields'        => array(
				'code'  => array(
					'type'        => 'String',
					'description' => __( 'Authorization code used for requesting refresh/access tokens', 'faustwp' ),
				),
				'error' => array(
					'type'        => 'String',
					'description' => __( 'Error encountered during user authentication, if any', 'faustwp' ),
				),
			),
			'mutateAndGetPayload' => function( $input, $context, $info ) {
				$is_email = isset( $input['email'] ) ? true : false;
				$username = isset( $input['username'] ) ? $input['username'] : null;
				$email = isset( $input['email'] ) ? $input['email'] : null;
				$password = isset( $input['password'] ) ? $input['password'] : null;

				if ( $is_email ) {
					$authenticate = wp_authenticate_email_password(
						null,
						$email,
						$password
					);

					$user = get_user_by( 'email', $email );
				} else {
					$authenticate = wp_authenticate_username_password(
						null,
						$username,
						$password
					);

					$user = get_user_by( 'login', $username );
				}

				if ( is_wp_error( $authenticate ) ) {
					return array(
						'code'  => null,
						'error' => $authenticate->get_error_message(),
					);
				}

				// Generate an authorization code that expires in 1 minute.
				$code = generate_authorization_code( $user, MINUTE_IN_SECONDS * 1 );

				return array(
					'code'  => $code,
					'error' => null,
				);
			},
		)
	);
}
