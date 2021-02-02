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

	$redirect_base = wpe_headless_get_setting( 'frontend_uri' );

	if (
		defined( 'DOING_CRON' ) ||
		defined( 'REST_REQUEST' ) ||
		is_admin() ||
		is_customize_preview() ||
		( function_exists( 'is_graphql_http_request' ) && is_graphql_http_request() ) || // From https://wordpress.org/plugins/wp-graphql/.
		! empty( $query->query_vars['rest_oauth1'] ) || // From https://oauth1.wp-api.org/.
		! property_exists( $query, 'request' ) ||
		! $redirect_base
	) {
		return;
	}
	$response_code = 302;
	$redirect_url  = trailingslashit( $redirect_base ) . $query->request;

	header( 'X-Redirect-By: WP Engine Headless plugin' ); // For support teams. See https://developer.yoast.com/blog/x-redirect-by-header/.
	header( 'Location: ' . $redirect_url, true, $response_code );
	exit;
}
