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

add_filter( 'preview_post_link', 'wpe_headless_post_link', 10 );
add_filter( 'post_link', 'wpe_headless_post_link', 10 );

/**
 * Callback for WordPress 'preview_post_link' filter and 'post_link' filter. For now, we use the same callback for both.
 *
 * Swap the post preview link and post links in admin for headless front-end.
 *
 * @todo Should this always be enabled?
 * @todo Page links
 *
 * @param string $link URL used for the post preview and/or post.
 *
 * @return string URL used for the post preview.
 */
function wpe_headless_post_link( $link ) {
	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( $frontend_uri ) {
		return str_replace( trailingslashit( get_home_url() ), trailingslashit( $frontend_uri ), $link );
	}

	return $link;
}

add_filter( 'term_link', 'wpe_headless_term_link' );
/**
 * Rewrites term links to point to the specified front-end URL.
 *
 * @param string $term_link Term link URL.
 *
 * @return string
 */
function wpe_headless_term_link( $term_link ) {
	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( empty( $frontend_uri ) ) {
		return $term_link;
	}

	$frontend_uri = trailingslashit( $frontend_uri );
	$site_url     = trailingslashit( site_url() );

	return str_replace( $site_url, $frontend_uri, $term_link );
}
