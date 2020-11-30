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
 * Generate a code and redirect to the `frontend_uri` or development domain.
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

	$redirect_uri = isset( $_GET['redirect_uri'] ) ? $_GET['redirect_uri'] : '';

	if ( ! is_user_logged_in() ) {
		wp_redirect(
			wp_login_url( '/generate/?redirect_uri=' . urlencode( $redirect_uri ) )
		);

		exit;
	}

	if ( ! wpe_headless_can_redirect( $redirect_uri ) ) {
		return;
	}

	$code = WPE_Headless_Crypto::encrypt( 'ac|' . wp_get_current_user()->ID . '|' . time() );

	if ( parse_url( $redirect_uri, PHP_URL_QUERY ) ) {
	    $redirect_uri .= "&code={$code}";
	} else {
	    $redirect_uri .= "?code={$code}";
	}

	wp_redirect( $redirect_uri );

	exit;
}
