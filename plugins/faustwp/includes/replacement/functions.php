<?php
/**
 * Replacement functions.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Replacement;

use function WPE\FaustWP\Settings\{
	faustwp_get_setting,
	is_rewrites_enabled
};

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

/**
 * Returns the equivalent WordPress URL given a frontend URL.
 *
 * @param string $url      The URL to normalize.
 * @param bool   $frontend Returns an equivalent frontend URL given a WordPress URL if true.
 * @return string The WordPress URL.
 */
function normalize_url( $url, $frontend = false ) {
	$frontend_uri = faustwp_get_setting( 'frontend_uri' );

	// Return the URL as is if frontend uri is empty.
	if ( ! $frontend_uri ) {
		return $url;
	}

	$frontend_uri = trailingslashit( $frontend_uri );
	$home_url     = trailingslashit( get_home_url() );

	$normalized_url = $frontend
		? str_replace( $home_url, $frontend_uri, $url )
		: str_replace( $frontend_uri, $home_url, $url );

	return $normalized_url;
}

/**
 * Returns the equivalent WordPress URL given a frontend URL.
 *
 * @param string $url The frontend URL.
 * @return string The WordPress URL.
 */
function equivalent_wp_url( $url ) {
	return normalize_url( $url, false );
}

/**
 * Returns the equivalent frontend URL given a WordPress URL.
 *
 * @param string $url The WordPress URL.
 * @return string The frontend URL.
 */
function equivalent_frontend_url( $url ) {
	return normalize_url( $url, true );
}

/**
 * Normalizes a sitemap URL to be the original WordPress URL.
 *
 * @param array $sitemap_entry The sitemap entry containing the URL to normalize.
 * @return array
 */
function normalize_sitemap_entry( $sitemap_entry ) {
	if ( ! isset( $sitemap_entry['loc'] ) ) {
		return $sitemap_entry;
	}

	$sitemap_entry['loc'] = equivalent_wp_url( $sitemap_entry['loc'] );

	return $sitemap_entry;
}
