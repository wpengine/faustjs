<?php
/**
 * Various utility functions used through the Faust plugin.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Utilities;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Converts string to camelCase. Added to ensure that fields are compliant with the GraphQL spec.
 *
 * @param string $str The string to be converted to camelCase.
 * @param array  $preserved_chars The characters to preserve.
 *
 * @credit http://www.mendoweb.be/blog/php-convert-string-to-camelcase-string/
 *
 * @return string camelCase'd string
 */
function camelcase( $str, $preserved_chars = array() ) {
	/* Convert non-alpha and non-numeric characters to spaces. */
	$str = preg_replace( '/[^a-z0-9' . implode( '', $preserved_chars ) . ']+/i', ' ', $str );
	$str = trim( $str );

	/* Uppercase the first character of each word. */
	$str = ucwords( $str );
	$str = str_replace( ' ', '', $str );

	return lcfirst( $str );
}

/**
 * Returns the current version of this plugin.
 *
 * @return string The current plugin version.
 */
function plugin_version() {
	$plugin = get_plugin_data( FAUSTWP_FILE );

	return $plugin['Version'];
}

/**
 * Checks if two domain strings represent the same domain.
 *
 * @param string $domain1 The first domain string.
 * @param string $domain2 The second domain string.
 * @return bool True if the domains match, false otherwise.
 */
function domains_match( $domain1, $domain2 ) {
	// Remove leading "http://" or "https://" if present.
	$first  = preg_replace( '/^(https?:\/\/)?/', '', $domain1 );
	$second = preg_replace( '/^(https?:\/\/)?/', '', $domain2 );

	// Extract the domain part (remove path and query parameters).
	$extract_domain = function ( $url ) {
		return explode( '/', wp_parse_url( $url, PHP_URL_HOST ) )[0];
	};

	return $extract_domain( $first ) === $extract_domain( $second );
}
