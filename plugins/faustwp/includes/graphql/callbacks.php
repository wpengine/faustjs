<?php
/**
 * Various callbacks to augment WP GraphQL by adding types, fields, etc.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\GraphQL;

use function WPE\FaustWP\Auth\generate_authorization_code;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
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
