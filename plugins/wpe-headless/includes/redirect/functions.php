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
 * Determine if a url is allowed as a redirect destination.
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
