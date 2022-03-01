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
 * Normalizes a sitemap URL to be the original WordPress URL.
 *
 * @param string $url The sitemap URL to normalize.
 * @return string
 */
function normalize_sitemap_url( $url ) {
	$frontend_uri = faustwp_get_setting( 'frontend_uri' );

	// Return the URL as is if frontend uri is empty.
	if ( ! $frontend_uri ) {
		return $url;
	}

	$frontend_uri = trailingslashit( $frontend_uri );
	$home_url     = trailingslashit( get_home_url() );

	$normalized_url = str_replace( $frontend_uri, $home_url, $url );

	return $normalized_url;
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

	$sitemap_entry['loc'] = normalize_sitemap_url( $sitemap_entry['loc'] );

	return $sitemap_entry;
}
