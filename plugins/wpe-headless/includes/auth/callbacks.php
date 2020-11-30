<?php
/**
 * Redirect related callbacks.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'parse_request', 'wpe_headless_handle_generate_endpoint' );
/**
 * Callback for WordPress 'parse_request' action.
 *
 * Generate an authentication code and redirect to the requested url.
 *
 * @return void
 */
function wpe_headless_handle_generate_endpoint() {
	if ( ! preg_match( '/^\/generate/', $_SERVER['REQUEST_URI'] ) ) {
		return;
	}

	if ( empty( $_GET['redirect_uri'] ) ) {
		return;
	}

	$redirect_uri = $_GET['redirect_uri'];

	if ( ! is_user_logged_in() ) {
		wp_redirect(
			wp_login_url( '/generate/?redirect_uri=' . urlencode( $redirect_uri ) )
		);

		exit;
	}

	if ( ! wpe_headless_can_redirect( $redirect_uri ) ) {
		return;
	}

	$code = wpe_headless_generate_user_code( wp_get_current_user() );

	if ( parse_url( $redirect_uri, PHP_URL_QUERY ) ) {
	    $redirect_uri .= "&code={$code}";
	} else {
	    $redirect_uri .= "?code={$code}";
	}

	wp_redirect( $redirect_uri );

	exit;
}
