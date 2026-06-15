<?php
/**
 * Replacement functions.
 *
 * @package FaustWP
 */

declare(strict_types=1);

namespace WPE\FaustWP\Replacement;

use function WPE\FaustWP\Settings\{
	faustwp_get_setting,
	is_rewrites_enabled,
	use_wp_domain_for_post_and_category_urls,
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Determine if domain replacement can be done.
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
	return apply_filters( 'faustwp_domain_replacement_enabled', ! use_wp_domain_for_post_and_category_urls() );
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

/**
 * Check if a string has a file extension.
 *
 * @param string $file The string to check.
 * @return boolean
 */
function has_file_extension( $file ) {
	$file_extension_pattern = '/\.[a-zA-Z0-9]+$/';

	if ( preg_match( $file_extension_pattern, $file ) ) {
		return true;
	} else {
		return false; // String does not have a file extension.
	}
}

/**
 * Determines if an AJAX request to generate permalinks is in progress.
 *
 * @return boolean
 */
function is_ajax_generate_permalink_request(): bool {
	return ( ! empty( $_POST['samplepermalinknonce'] ) && check_ajax_referer( 'samplepermalink', 'samplepermalinknonce' ) );
}

/**
 * Determines if a wp-link-ajax request is in progress.
 *
 * @return boolean
 */
function is_wp_link_ajax_request(): bool {
	return ( wp_doing_ajax()
			&& ! empty( $_POST['_ajax_linking_nonce'] )
			&& wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_ajax_linking_nonce'] ) ), 'internal-linking' )
			&& ! empty( $_POST['action'] )
			&& 'wp-link-ajax' === $_POST['action'] );
}


/**
 * Get all site URLs for each possible HTTP protocol
 *
 * @param string $site_url The site url.
 *
 * @return array<string> An array of site urls.
 */
function faustwp_get_wp_site_urls( string $site_url ): array {

	$host_url = wp_parse_url( $site_url, PHP_URL_HOST );

	$is_https = strpos( $site_url, 'https://' ) === 0;

	return apply_filters(
		'faustwp_get_wp_site_urls',
		array(
			$is_https ? "https://$host_url" : "http://$host_url",
			$is_https ? "http://$host_url" : "https://$host_url",
			"//$host_url",
		)
	);
}

/**
 * Get all media urls based off the available site urls
 *
 * @param array<string> $wp_site_urls The array of potential site urls.
 * @param string        $relative_upload_url The relative upload url.
 *
 * @return array<string> The array of media Urls
 */
function faustwp_get_wp_media_urls( array $wp_site_urls, string $relative_upload_url ) {

	$media_urls = array();
	foreach ( $wp_site_urls as $site_url ) {
		$media_urls[] = $site_url . $relative_upload_url;
	}

	return apply_filters( 'faustwp_get_wp_site_media_urls', $media_urls );
}


/**
 * Gets the relative wp-content upload URL.
 *
 * @param array<string> $site_urls An array of site URLs.
 * @param string        $upload_url An array of site URLs.
 *
 * @return string The relative upload URL.
 */
function faustwp_get_relative_upload_url( array $site_urls, string $upload_url = '' ): string {

	foreach ( $site_urls as $site_url ) {
		if ( strpos( $upload_url, $site_url ) === 0 ) {
			return (string) str_replace( $site_url, '', $upload_url );
		}
	}

	return '';
}
