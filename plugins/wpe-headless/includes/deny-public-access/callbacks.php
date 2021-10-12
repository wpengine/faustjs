<?php
/**
 * Prevents access to WP front-end URLs by redirecting to a user-specified URL.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'template_redirect', 'wpe_headless_deny_public_access', 99 );
/**
 * Redirects non-API requests for public URLs to the specified front-end URL.
 *
 * @return void
 */
function wpe_headless_deny_public_access() {
	if ( ! wpe_headless_is_redirects_enabled() || is_customize_preview() ) {
		return;
	}

	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( ! $frontend_uri ) {
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
