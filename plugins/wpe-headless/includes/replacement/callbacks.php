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

add_filter( 'preview_post_link', 'wpe_headless_preview_post_link', 10, 2 );
/**
 * Callback for WordPress 'preview_post_link' filter.
 *
 * Swap the post preview link for headless front-end.
 *
 * @todo Should this always be enabled?
 *
 * @param string  $preview_link URL used for the post preview.
 * @param WP_Post $post         Post object.
 *
 * @return string URL used for the post preview.
 */
function wpe_headless_preview_post_link( $preview_link, $post ) {
	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( $frontend_uri ) {
		$preview_link = sprintf(
			'%s%s/?status=%s&preview=true',
			$frontend_uri,
			base64_encode( 'post:' . $post->ID ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
			$post->post_status
		);
	}

	return $preview_link;
}

add_filter( 'post_link', 'wpe_headless_post_link', 10, 3 );
/**
 * Callback for WordPress 'post_link' filter.
 *
 * Modify the post link for a post type "post" for headless.
 *
 * @todo Should this always be enabled?
 *
 * @param string  $permalink The post's permalink.
 * @param WP_Post $post      The post in question.
 * @param bool    $leavename Whether to keep the post name.
 *
 * @return string The post's permalink.
 */
function wpe_headless_post_link( $permalink, $post, $leavename ) {
	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( empty( $frontend_uri ) ) {
		return $permalink;
	}

	$frontend_uri = trailingslashit( $frontend_uri );

	if ( 'draft' === $post->post_status ) {
		$permalink = sprintf(
			'%s%s/?status=%s&preview=true',
			$frontend_uri,
			base64_encode( 'post:' . $post->ID ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
			$post->post_status
		);
	} else {
		$permalink = $frontend_uri . $post->post_name;
	}

	return $permalink;
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
