<?php
/**
 * Replacement functions.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Replacement;

use function WPE\FaustWP\Settings\is_rewrites_enabled;

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
function domain_replacement_enabled() {
	/**
	 * Filter 'faustwp_domain_replacement_enabled'.
	 *
	 * Used to override or extend if domain replacement is enabled.
	 *
	 * @param bool $enabled True if domain replacement is enabled, false if else.
	 */
	return apply_filters( 'faustwp_domain_replacement_enabled', is_rewrites_enabled() );
}
