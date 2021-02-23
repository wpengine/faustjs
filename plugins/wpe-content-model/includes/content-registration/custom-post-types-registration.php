<?php
/**
 * Registers custom content types and custom fields.
 *
 * @package WPE_Content_Model
 */

declare(strict_types=1);

namespace WPE\ContentModel\ContentRegistration;

use InvalidArgumentException;

use WPGraphQL\Model\Post;
use WPGraphQL\Registry\TypeRegistry;

add_action( 'init', __NAMESPACE__ . '\register_content_types' );
/**
 * Registers custom content types.
 */
function register_content_types(): void {
	$content_types = get_option( 'wpe_content_model_post_types', false );
	if ( ! $content_types ) {
		return;
	}

	foreach ( $content_types as $slug => $args ) {
		$fields = $args['fields'] ?? false;
		unset( $args['fields'] );

		try {
			$args['labels'] = generate_custom_post_type_labels(
				[
					'singular' => $args['singular_name'],
					'plural'   => $args['name'],
				]
			);
		} catch ( InvalidArgumentException $exception ) {
			// Do nothing and let WP use defaults.
		}

		register_post_type( $slug, $args );

		if ( $fields ) {
			register_meta_types( $slug, $fields );
		}
	}
}

/**
 * Registers custom meta with the specific custom post type.
 *
 * @param string $post_type_slug The custom post type slug.
 * @param array  $fields Custom fields to be registered with the custom post type.
 */
function register_meta_types( string $post_type_slug, array $fields ): void {
	foreach ( $fields as $key => $field ) {
		$field['object_subtype'] = $post_type_slug;
		register_meta( 'post', $key, $field );
	}
}

/**
 * Generates an array of labels for use when registering custom post types.
 *
 * @see get_post_type_labels()
 *
 * @param array $labels {
 *     Singular and plural labels.
 *     @type string $singular Singular name of post type.
 *     @type string $plural Plural name of post type.
 * }
 *
 * @throws InvalidArgumentException When missing singular or plural arguments.
 * @return array
 */
function generate_custom_post_type_labels( array $labels ): array {
	if ( empty( $labels['singular'] ) || empty( $labels['plural'] ) ) {
		throw new InvalidArgumentException(
			__( 'You must provide both singular and plural labels to generate content type labels.', 'wpe-content-model' )
		);
	}

	$singular = $labels['singular'];
	$plural   = $labels['plural'];

	/**
	 * Ignoring these values and using WP defaults:
	 * insert_into_item
	 * add_new
	 * featured_image
	 * set_featured_image
	 * remove_featured_image
	 * use_featured_image
	 * menu_name (same as name)
	 * name_admin_bar (same as singular or name)
	 *
	 * @todo i18n
	 */
	return [
		'name'                     => $plural,
		'singular_name'            => $singular,
		'add_new_item'             => sprintf( 'Add new %s', $singular ),
		'edit_item'                => sprintf( 'Edit %s', $singular ),
		'new_item'                 => sprintf( 'New %s', $singular ),
		'view_item'                => sprintf( 'View %s', $singular ),
		'view_items'               => sprintf( 'View %s', $plural ),
		'search_items'             => sprintf( 'Search %s', $plural ),
		'not_found'                => sprintf( 'No %s found', $plural ),
		'not_found_in_trash'       => sprintf( 'No %s found in trash', $plural ),
		'parent_item_colon'        => sprintf( 'Parent %s:', $singular ),
		'all_items'                => sprintf( 'All %s', $plural ),
		'archives'                 => sprintf( '%s archives', $singular ),
		'attributes'               => sprintf( '%s Attributes', $singular ),
		'uploaded_to_this_item'    => sprintf( 'Uploaded to this %s', $singular ),
		'filter_items_list'        => sprintf( 'Filter %s list', $plural ),
		'items_list_navigation'    => sprintf( '%s list navigation', $plural ),
		'items_list'               => sprintf( '%s list', $plural ),
		'item_published'           => sprintf( '%s published.', $singular ),
		'item_published_privately' => sprintf( '%s published privately.', $singular ),
		'item_reverted_to_draft'   => sprintf( '%s reverted to draft.', $singular ),
		'item_scheduled'           => sprintf( '%s scheduled.', $singular ),
		'item_updated'             => sprintf( '%s updated.', $singular ),
		'parent'                   => sprintf( 'Parent %s', $singular ),
	];
}

/**
 * Gets all content types registered with this plugin.
 *
 * @return array
 */
function get_registered_content_types(): array {
	return get_option( 'wpe_content_model_post_types', array() );
}

/**
 * Returns post types that have `show_in_graphql` support
 * and were created with this plugin.
 *
 * @return array
 */
function get_graphql_enabled_post_types(): array {
	$gql_post_types = array();
	foreach ( get_registered_content_types() as $slug => $content_type ) {
		if ( ! empty( $content_type['show_in_graphql'] ) ) {
			$gql_post_types[ $slug ] = $content_type;
		}
	}
	return $gql_post_types;
}

add_action( 'graphql_register_types', __NAMESPACE__ . '\register_content_fields_with_graphql' );
/**
 * Registers custom fields with the WPGraphQL API.
 *
 * @param TypeRegistry $type_registry The WPGraphQL Type Registry.
 */
function register_content_fields_with_graphql( TypeRegistry $type_registry ) {
	$gql_post_types = get_graphql_enabled_post_types();

	foreach ( $gql_post_types as $post_type => $post_type_args ) {
		if ( empty( $post_type_args['fields'] ) ) {
			continue;
		}

		foreach ( $post_type_args['fields'] as $key => $field ) {
			if ( empty( $field['show_in_graphql'] ) ) {
				continue;
			}

			$gql_field_type = map_html_field_type_to_graphql_field_type( $field['type'] );
			if ( empty( $gql_field_type ) ) {
				continue;
			}

			$field['type'] = $gql_field_type;

			$field['resolve'] = static function( Post $post, $args, $context, $info ) use ( $key ) {
				return get_post_meta( $post->databaseId, $key, true );
			};

			register_graphql_field(
				$post_type_args['graphql_single_name'],
				camelcase( $key ),
				$field
			);
		}
	}
}

/**
 * Maps an HTML field type to a WPGraphQL field type.
 *
 * @param string $field_type The HTML field type.
 * @access private
 *
 * @return string|null
 */
function map_html_field_type_to_graphql_field_type( string $field_type ): ?string {
	if ( empty( $field_type ) ) {
		return null;
	}

	switch ( $field_type ) {
		case 'text':
		case 'textarea':
		case 'string':
		case 'date':
		case 'media':
			return 'String';
		case 'number':
			return 'Float';
		default:
			return null;
	}
}

/**
 * Converts string to camelCase. Added to ensure that fields are compliant with the GraphQL spec.
 *
 * @param string $str The string to be converted to camelCase.
 * @param array  $preserved_chars The characters to preserve.
 *
 * @credit http://www.mendoweb.be/blog/php-convert-string-to-camelcase-string/
 *
 * @return string camelCase'd string
 */
function camelcase( string $str, array $preserved_chars = array() ): string {
	/* Convert non-alpha and non-numeric characters to spaces. */
	$str = preg_replace( '/[^a-z0-9' . implode( '', $preserved_chars ) . ']+/i', ' ', $str );
	$str = trim( $str );

	/* Uppercase the first character of each word. */
	$str = ucwords( $str );
	$str = str_replace( ' ', '', $str );

	return lcfirst( $str );
}
