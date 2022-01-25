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
