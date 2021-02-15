<?php
/**
 * REST related callbacks.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'graphql_authentication_errors', 'wpe_headless_rest_validate_access_token' );
/**
 * Callback for WPGraphQL 'graphql_authentication_errors' filter.
 *
 * If an Authorization header exists, validate it. If it is invalid return a response error. Note
 * that we are returning a WP_Error, but currently WPGraphQL ignores this and sends its own error.
 *
 * @link https://www.wpgraphql.com/filters/graphql_authentication_errors/
 *
 * @param bool $authentication_errors Whether there are authentication errors with the request.
 *
 * @return bool True if the Authorization header exists and is invalid, false otherwise.
 */
function wpe_headless_rest_validate_access_token( $authentication_errors ) {
	if ( empty( $_SERVER['HTTP_AUTHORIZATION'] ) ) {
		return $authentication_errors;
	}

	$parts = explode( ' ', trim( $_SERVER['HTTP_AUTHORIZATION'] ) ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
	if ( count( $parts ) < 2 ) {
		return true;
	}

	$wp_user = wpe_headless_get_user_from_access_token( $parts[1], 5 * MONTH_IN_SECONDS );
	if ( $wp_user ) {
		return false;
	}

	return true;
}

add_filter( 'determine_current_user', 'wpe_headless_rest_determine_current_user', 20 );
/**
 * Callback for WordPress 'determine_current_user' filter.
 *
 * Determine the current user based on authentication token from http header.
 *
 * @todo Does the request type matter? rest, graphql, etc?
 *
 * @link https://developer.wordpress.org/reference/hooks/determine_current_user/
 *
 * @param int|bool $user_id User ID if one has been determined, false otherwise.
 *
 * @return int|bool User ID if one has been determined, false otherwise.
 */
function wpe_headless_rest_determine_current_user( $user_id ) {
	if ( $user_id ) {
		return $user_id;
	}

	if ( ! isset( $_SERVER['HTTP_AUTHORIZATION'] ) ) {
		return $user_id;
	}

	$parts = explode( ' ', trim( $_SERVER['HTTP_AUTHORIZATION'] ) ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
	if ( count( $parts ) < 2 ) {
		return $user_id;
	}

	$wp_user = wpe_headless_get_user_from_access_token( $parts[1], 5 * MONTH_IN_SECONDS );
	if ( $wp_user ) {
		$user_id = $wp_user->ID;
	}

	return $user_id;
}

add_action( 'rest_api_init', 'wpe_headless_register_rest_routes' );
/**
 * Callback for WordPress 'rest_api_init' action.
 *
 * Register the POST /wpac/v1/authorize endpoint.
 *
 * @todo Are we keeping the `wpac` namespace?
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/
 *
 * @return void
 */
function wpe_headless_register_rest_routes() {
	register_rest_route(
		'wpac/v1',
		'/authorize',
		array(
			'methods'             => 'POST',
			'callback'            => 'wpe_headless_handle_rest_authorize_callback',
			'permission_callback' => 'wpe_headless_rest_authorize_permission_callback',
		)
	);
}

/**
 * Callback for WordPress register_rest_route() 'callback' parameter.
 *
 * Handle POST /wpac/v1/authorize response.
 *
 * Use the 'code' (authentication code) parameter to generate a new access token.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#endpoint-callback
 *
 * @param WP_REST_Request $request Current WP_REST_Request object.
 *
 * @return mixed A WP_REST_Response, array, or WP_Error.
 */
function wpe_headless_handle_rest_authorize_callback( WP_REST_Request $request ) {
	$code = trim( $request->get_param( 'code' ) );
	if ( ! $code ) {
		return new WP_Error( 'authentication_code_required', __( 'Authentication code required', 'wpe-headless' ), array( 'status' => 400 ) );
	}

	$wp_user = wpe_headless_get_user_from_authentication_code( $code, MINUTE_IN_SECONDS );
	if ( ! $wp_user ) {
		return new WP_Error( 'invalid_authentication_code', __( 'Invalid authentication code', 'wpe-headless' ), array( 'status' => 400 ) );
	}

	$access_token = wpe_headless_generate_access_token( $wp_user );
	if ( ! $access_token ) {
		return new WP_Error( 'access_token_error', __( 'Access token error', 'wpe-headless' ) );
	}

	return compact( 'access_token' );
}

/**
 * Callback for WordPress register_rest_route() 'permission_callback' parameter.
 *
 * Authorized if the 'secret_key' settings value and http header 'x-wpe-headless-secret' match.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#permissions-callback
 *
 * @param WP_REST_Request $request The current WP_REST_Request object.
 *
 * @return bool True if current user can, false if else.
 */
function wpe_headless_rest_authorize_permission_callback( WP_REST_Request $request ) {
	$secret_key = wpe_headless_get_secret_key();
	$header_key = $request->get_header( 'x-wpe-headless-secret' );

	if ( $secret_key && $header_key ) {
		return $secret_key === $header_key;
	}

	return false;
}
