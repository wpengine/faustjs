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
	if ( ! is_redirects_enabled() || is_customize_preview() ) {
		return;
	}

	$frontend_uri = faustwp_get_setting( 'frontend_uri' );

	if ( ! $frontend_uri ) {
		return;
	}

	$frontend_uri = trailingslashit( $frontend_uri );

	// Get the request uri with query params.
	$request_uri = home_url( add_query_arg( null, null ) );

	// Allow saving from file editor.
	if ( doing_file_editor_save() ) {
		return;
	}

	$response_code = 302;
	$redirect_url  = str_replace( trailingslashit( get_home_url() ), $frontend_uri, $request_uri );

	header( 'X-Redirect-By: WP Engine Headless plugin' ); // For support teams. See https://developer.yoast.com/blog/x-redirect-by-header/.
	header( 'Location: ' . esc_url_raw( $redirect_url ), true, $response_code );
	exit;
}
