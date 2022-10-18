<?php
/**
 * Redirect related callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Auth;

use function WPE\FaustWP\Settings\faustwp_get_setting;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'parse_request', __NAMESPACE__ . '\\handle_generate_endpoint' );
/**
 * Callback for WordPress 'parse_request' action.
 *
 * Generate an authorization code and redirect to the requested url.
 *
 * @return void
 */
function handle_generate_endpoint() {
	$search_pattern = ':^' . site_url( '/generate', 'relative' ) . ':';

	if ( ! preg_match( $search_pattern, $_SERVER['REQUEST_URI'] ) ) { // phpcs:ignore WordPress.Security
		return;
	}

	if ( empty( $_GET['redirect_uri'] ) ) { // phpcs:ignore WordPress.Security
		return;
	}

	$redirect_uri = wp_unslash( $_GET['redirect_uri'] ); // phpcs:ignore WordPress.Security

	if ( ! is_user_logged_in() ) {
		wp_safe_redirect(
			wp_login_url( '/generate/?redirect_uri=' . rawurlencode( $redirect_uri ) )
		);

		exit;
	}

	$auth_code = generate_authorization_code(
		wp_get_current_user(),
		MINUTE_IN_SECONDS * 1
	);

	$redirect_uri = add_query_arg( 'code', rawurlencode( $auth_code ), $redirect_uri );

	wp_safe_redirect( $redirect_uri );

	exit;
}

add_filter( 'allowed_redirect_hosts', __NAMESPACE__ . '\\allowed_redirect_hosts', 10, 2 );
/**
 * Callback for WordPress 'allowed_redirect_hosts' filter.
 *
 * Add frontend_uri host and development domains to allowed redirects.
 *
 * @link https://developer.wordpress.org/reference/hooks/allowed_redirect_hosts/
 *
 * @param string[] $hosts An array of allowed host names.
 * @param string   $host  The host name of the redirect destination; empty string if not set.
 *
 * @return string[] An array of allowed host names.
 */
function allowed_redirect_hosts( $hosts, $host ) {
	$hosts         = wp_parse_args( $hosts, array( 'localhost', '0.0.0.0' ) );
	$frontend_host = wp_parse_url( faustwp_get_setting( 'frontend_uri' ), PHP_URL_HOST );

	if ( $frontend_host ) {
		$hosts[] = $frontend_host;
	}

	return $hosts;
}
