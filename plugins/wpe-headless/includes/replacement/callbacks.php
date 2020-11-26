<?php
/**
 * Replacement related callbacks.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'the_content', 'wpe_headless_content_replacement' );
/**
 * Callback for WordPress 'the_content' filter.
 *
 * @todo Needs work...
 *
 * @param string $content The post content.
 *
 * @return string The post content.
 */
function wpe_headless_content_replacement( $content ) {
	if ( ! wpe_headless_domain_replacement_enabled() ) {
		return $content;
	}

	$replacement = wpe_headless_get_setting( 'replacement_domain' );
	$site_url    = site_url();

	if ( ! $replacement ) {
		$replacement = '/';
	}

	$content = str_replace( "href=\"{$site_url}", "href=\"{$replacement}", $content );
	return str_replace( 'href="//', 'href="/', $content );
}
