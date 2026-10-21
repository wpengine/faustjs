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
 * Note: matches REQUEST_URI against the filtered output of home_url(). Plugins
 * that filter home_url() to prepend locale paths (WPML, Polylang, TranslatePress)
 * may cause this match to fail when the frontend calls '/generate' directly
 * without a locale prefix. If that combination surfaces in support, the
 * follow-up will likely migrate '/generate' to a proper REST route so locale
 * filters cannot affect the match.
 *
 * @return void
 */
function handle_generate_endpoint() {
	$search_pattern = ':^' . home_url( '/generate', 'relative' ) . ':';

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

add_action( 'parse_request', __NAMESPACE__ . '\\handle_logout_request' );
/**
 * Callback for WordPress 'parse_request' action.
 *
 * Log the browser out of WordPress when it visits a logout URL from the
 * faustwp/v1/logout endpoint, then redirect to the requested url. Without
 * this, a user who logged in through WordPress would be logged straight back
 * in after logging out of the frontend.
 *
 * The code only logs out the user it was created for, so a logout URL can't
 * log out anyone else.
 *
 * @return void
 */
function handle_logout_request() {
	if ( empty( $_GET['faust_logout'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return;
	}

	$user = get_user_from_logout_code( wp_unslash( $_GET['faust_logout'] ) ); // phpcs:ignore WordPress.Security

	if ( $user && get_current_user_id() === $user->ID ) {
		wp_logout();
	}

	$fallback     = faustwp_get_setting( 'frontend_uri' ) ? faustwp_get_setting( 'frontend_uri' ) : home_url( '/' );
	$redirect_uri = empty( $_GET['redirect_uri'] ) ? $fallback : wp_unslash( $_GET['redirect_uri'] ); // phpcs:ignore WordPress.Security

	wp_safe_redirect( wp_validate_redirect( $redirect_uri, $fallback ) );

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

add_filter( 'map_meta_cap', __NAMESPACE__ . '\\map_upload_blocks_capability', 10, 2 );
/**
 * Callback for WordPress 'map_meta_cap' filter.
 *
 * Uploading a blockset replaces the blocks registered for the whole site, so it
 * needs the same access as managing the site's options, or the network's on
 * Multisite. It can't be granted through a role.
 *
 * @param string[] $caps Primitive capabilities the user needs.
 * @param string   $cap  Capability being checked.
 *
 * @return string[] Primitive capabilities the user needs.
 */
function map_upload_blocks_capability( $caps, $cap ) {
	if ( 'faustwp_upload_blocks' === $cap ) {
		return array( is_multisite() ? 'manage_network_options' : 'manage_options' );
	}

	return $caps;
}

add_filter( 'user_has_cap', __NAMESPACE__ . '\\grant_exchange_tokens_capability' );
/**
 * Callback for WordPress 'user_has_cap' filter.
 *
 * Lets administrators exchange authorization codes for tokens with an Application
 * Password. Other users need a role that includes 'faustwp_exchange_tokens'.
 *
 * @param bool[] $allcaps The user's capabilities.
 *
 * @return bool[] The user's capabilities.
 */
function grant_exchange_tokens_capability( $allcaps ) {
	if ( ! empty( $allcaps['manage_options'] ) ) {
		$allcaps['faustwp_exchange_tokens'] = true;
	}

	return $allcaps;
}
