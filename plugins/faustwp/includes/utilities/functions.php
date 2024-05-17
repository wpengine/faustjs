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
 * Performs a strict domain comparison
 * Also checks for matching ports (if present).
 *
 * @param string $domain1 The first domain string.
 * @param string $domain2 The second domain string.
 * @return bool True if the domains match (including localhost, loopback, and ports), false otherwise.
 */
function strict_domain_match( string $domain1, string $domain2 ): bool {
	// Parse URLs.
	$parsed_domain1 = wp_parse_url( $domain1 );
	$parsed_domain2 = wp_parse_url( $domain2 );

	// Extract components.
	$host1   = isset( $parsed_domain1['host'] ) ? $parsed_domain1['host'] : null;
	$host2   = isset( $parsed_domain2['host'] ) ? $parsed_domain2['host'] : null;
	$scheme1 = isset( $parsed_domain1['scheme'] ) ? $parsed_domain1['scheme'] : 'http';
	$scheme2 = isset( $parsed_domain2['scheme'] ) ? $parsed_domain2['scheme'] : 'http';
	$port1   = isset( $parsed_domain1['port'] ) ? (int) $parsed_domain1['port'] : ( 'https' === $scheme1 ? 443 : 80 );
	$port2   = isset( $parsed_domain2['port'] ) ? (int) $parsed_domain2['port'] : ( 'https' === $scheme2 ? 443 : 80 );

	if ( empty( $host1 ) || empty( $host2 ) ) {
		return false;
	}

	// Normalize the hosts by removing 'www.' if present.
	$normalized_host1 = preg_replace( '/^www\./', '', $host1 );
	$normalized_host2 = preg_replace( '/^www\./', '', $host2 );

	return ( $normalized_host1 === $normalized_host2 ) && ( $scheme1 === $scheme2 ) && ( $port1 === $port2 );
}
