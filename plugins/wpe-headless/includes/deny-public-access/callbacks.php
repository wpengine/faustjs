<?php
/**
 * Prevents access to WP front-end URLs by redirecting to a user-specified URL.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'parse_request', 'wpe_headless_deny_public_access', 99 );
/**
 * Redirects non-API requests for public URLs to the specified front-end URL.
 *
 * @param object $query The current query.
 *
 * @return void
 */
function wpe_headless_deny_public_access( $query ) {
	if ( ! wpe_headless_is_redirects_enabled() ) {
		return;
	}

	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if (
		defined( 'DOING_CRON' ) ||
		defined( 'REST_REQUEST' ) ||
		is_admin() ||
		is_customize_preview() ||
		( function_exists( 'is_graphql_http_request' ) && is_graphql_http_request() ) || // From https://wordpress.org/plugins/wp-graphql/.
		! empty( $query->query_vars['rest_oauth1'] ) || // From https://oauth1.wp-api.org/.
		! property_exists( $query, 'request' ) ||
		! $frontend_uri
	) {
		return;
	}

	$frontend_uri = trailingslashit( $frontend_uri );

	// Get the request uri with query params.
	$request_uri = home_url( add_query_arg( null, null ) );

	$response_code = 302;
	$redirect_url  = str_replace( trailingslashit( get_home_url() ), $frontend_uri, $request_uri );

	header( 'X-Redirect-By: WP Engine Headless plugin' ); // For support teams. See https://developer.yoast.com/blog/x-redirect-by-header/.
	header( 'Location: ' . esc_url_raw( $redirect_url ), true, $response_code );
	exit;
}
