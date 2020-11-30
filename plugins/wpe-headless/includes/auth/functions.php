<?php
/**
 * Redirect related functions.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate an encrypted code for the given WP_User.
 *
 * @param \WP_User $wp_user A WP_User object.
 *
 * @return string An encrypted code.
 */
function wpe_headless_generate_user_code( $wp_user ) {
	return WPE_Headless_Crypto::encrypt( 'ac|' . $wp_user->ID . '|' . time() );
}

/**
 * Determine if a url is allowed as a redirect destination.
 *
 * @todo Possibly move to another directory.
 *
 * @param string $url The redirect destination url.
 *
 * @return bool True if allowed, false if else.
 */
function wpe_headless_can_redirect( $url ) {
	$target  = '';
	$allowed = wpe_headless_get_allowed_redirects();
	$parts   = parse_url( $url );

	if ( isset( $parts['scheme'] ) && isset( $parts['host'] ) ) {
		$target = sprintf( '%s://%s', $parts['scheme'], $parts['host'] );
	}

	return in_array( $target, $allowed, true );
}

/**
 * Get an array of allowed redirect destination urls.
 *
 * @todo Possibly move to another directory.
 *
 * @return array Array of allowed redirect domains.
 */
function wpe_headless_get_allowed_redirects() {
	$allowed_redirects = array(
		'http://localhost',
		'https://localhost',
		'http://0.0.0.0',
		'https://0.0.0.0',
	);

	$parts = parse_url( wpe_headless_get_setting( 'frontend_uri' ) );

	if ( isset( $parts['scheme'] ) && isset( $parts['host'] ) ) {
		$allowed_redirects[] = sprintf( '%s://%s', $parts['scheme'], $parts['host'] );
	}

	/**
	 * Filter 'wpe_headless_get_allowed_redirects'.
	 *
	 * @param $allowed_redirects Array of allowed redirect domains.
	 */
	return apply_filters( 'wpe_headless_get_allowed_redirects', $allowed_redirects );
}
