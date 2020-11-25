<?php
/**
 * Replacement functions.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Determine if domain replacement can be done.
 *
 * Enabled if query string parameter 'replace-domain' is present.
 *
 * @return bool True if can proceed with replacement, false if else.
 */
function wpe_headless_domain_replacement_enabled() {
	$enabled = false;

	if ( isset( $_GET['replace-domain'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$enabled = true;
	}

	if ( isset( $_SERVER['HTTP_X_WP_HEADLESS'] ) ) {
		$enabled = true;
	}

	/**
	 * Filter 'wpe_headless_domain_replacement_enabled'.
	 *
	 * Used to override or extend if domain replacement is enabled.
	 *
	 * @param bool $enabled True if domain replacement is enabled, false if else.
	 */
	return apply_filters( 'wpe_headless_domain_replacement_enabled', $enabled );
}
