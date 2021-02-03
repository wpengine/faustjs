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
	/**
	 * Filter 'wpe_headless_domain_replacement_enabled'.
	 *
	 * Used to override or extend if domain replacement is enabled.
	 *
	 * @param bool $enabled True if domain replacement is enabled, false if else.
	 */
	return apply_filters( 'wpe_headless_domain_replacement_enabled', wpe_headless_is_rewrites_enabled() );
}
