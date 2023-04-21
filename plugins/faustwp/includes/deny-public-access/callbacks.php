<?php
/**
 * Prevents access to WP front-end URLs by redirecting to a user-specified URL.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Deny_Public_Access;

use function WPE\FaustWP\Settings\{
	faustwp_get_setting,
	is_redirects_enabled
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'template_redirect', __NAMESPACE__ . '\\deny_public_access', 99 );
/**
 * Redirects non-API requests for public URLs to the specified front-end URL.
 *
 * @return void
 */
function deny_public_access() {
	if (
		! is_redirects_enabled() ||
		is_customize_preview() ||
		doing_file_editor_save() ||
		is_feed() ||
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		isset( $_GET['_wp-find-template'] ) // Allow loading full site editor.
	) {
		return;
	}

	$frontend_uri = faustwp_get_setting( 'frontend_uri' );

	if ( ! $frontend_uri ) {
		return;
	}

	/**
	 * Filter 'faustwp_exclude_from_public_redirect'.
	 *
	 * Used to exclude certain routes from being redirected
	 * when enable public route redirects is active.
	 *
	 * @param array $excluded_routes The array of routes to exclude from redirect.
	 */
	$excluded_routes = apply_filters( 'faustwp_exclude_from_public_redirect', array() );

	if ( in_array( basename( add_query_arg( null, null ) ), $excluded_routes, true ) ) {
		return;
	}

	$frontend_uri = trailingslashit( $frontend_uri );

	// Get the request uri with query params.
	$request_uri = home_url( add_query_arg( null, null ) );

	$response_code = 302;
	$redirect_url  = str_replace( trailingslashit( get_home_url() ), $frontend_uri, $request_uri );
	$protocols     = array( 'http', 'https' );

	header( 'X-Redirect-By: WP Engine Headless plugin' ); // For support teams. See https://developer.yoast.com/blog/x-redirect-by-header/.
	header( 'Location: ' . esc_url_raw( $redirect_url, $protocols ), true, $response_code );
	exit;
}
