<?php
/**
 * Utility functions pertaining to denying public access.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Deny_Public_Access;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Checks if the current request is coming from the file editor.
 *
 * @see https://github.com/WordPress/wordpress-develop/blob/5.8.1/src/wp-includes/load.php#L1591-L1593
 *
 * @return bool
 */
function doing_file_editor_save() {
	// phpcs:disable WordPress.Security.NonceVerification.Recommended, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	// Disabling as we are mimicking WordPress core's own check.
	// https://github.com/WordPress/wordpress-develop/blob/5.8.1/src/wp-includes/load.php#L1591-L1595.
	if ( ! isset( $_REQUEST['wp_scrape_key'] ) || ! isset( $_REQUEST['wp_scrape_nonce'] ) ) {
		return false;
	}

	$key   = substr( sanitize_key( wp_unslash( $_REQUEST['wp_scrape_key'] ) ), 0, 32 );
	$nonce = wp_unslash( $_REQUEST['wp_scrape_nonce'] );
	// phpcs:enable WordPress.Security.NonceVerification.Recommended, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

	// Validate nonce.
	if ( get_transient( 'scrape_key_' . $key ) !== $nonce ) {
		return false;
	}

	return true;
}

/**
 * Builds the front-end URL to redirect a public request to.
 *
 * Strips the WordPress home path from the request first, so a site installed in
 * a subdirectory (such as https://example.com/wp) redirects to the matching
 * front-end path instead of repeating the subdirectory.
 *
 * @param string $request_uri  The request path and query string, such as `/wp/sample-page/?p=1`.
 * @param string $frontend_uri The front-end site URL.
 *
 * @return string
 */
function get_public_redirect_url( $request_uri, $frontend_uri ) {
	$home_path = untrailingslashit( (string) wp_parse_url( home_url(), PHP_URL_PATH ) );

	if (
		'' !== $home_path &&
		(
			$request_uri === $home_path ||
			0 === strpos( $request_uri, $home_path . '/' ) ||
			0 === strpos( $request_uri, $home_path . '?' )
		)
	) {
		$request_uri = substr( $request_uri, strlen( $home_path ) );
	}

	return trailingslashit( $frontend_uri ) . ltrim( $request_uri, '/' );
}
