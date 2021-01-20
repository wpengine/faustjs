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
 * @param string $content The post content.
 *
 * @return string The post content.
 * @todo Needs work...
 */
function wpe_headless_content_replacement( $content ) {
	if ( ! wpe_headless_domain_replacement_enabled() ) {
		return $content;
	}

	$replacement = wpe_headless_get_setting( 'frontend_uri' );
	$site_url    = site_url();

	if ( ! $replacement ) {
		$replacement = '/';
	}

	$content = str_replace( "href=\"{$site_url}", "href=\"{$replacement}", $content );

	return str_replace( 'href="//', 'href="/', $content );
}

add_filter( 'preview_post_link', 'wpe_headless_post_preview_link', 10, 2 );
/**
 * Callback for WordPress 'preview_post_link' filter.
 *
 * Swap the post preview link for headless front-end and to use the API entry to support Next.js preview mode.
 *
 * @param string  $link URL used for the post preview.
 * @param WP_Post $post Post object.
 *
 * @return string URL used for the post preview.
 */
function wpe_headless_post_preview_link( $link, $post ) {
	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( $frontend_uri ) {
		$home_url     = trailingslashit( get_home_url() );
		$frontend_uri = trailingslashit( $frontend_uri );

		/**
		 * This should already be handled by wpe_headless_post_link, but it's here for verbosity's sake and if the
		 * other filter changes for any reason.
		 */
		$link = str_replace( $home_url, $frontend_uri, $link );

		$args       = wp_parse_args( wp_parse_url( $link, PHP_URL_QUERY ) );
		$preview_id = isset( $args['preview_id'] ) ? $args['preview_id'] : $post->ID;

		/**
		 * Remove query vars as Next.js cannot read query params in SSG
		 */
		$link = remove_query_arg( array( 'preview_id', 'preview_nonce', 'preview' ), $link );

		/**
		 * Replace the path with a query param
		 */
		$link_split = explode( '/', $link );
		$path       = join( '/', array_slice( $link_split, 3 ) );

		/**
		 * Add preview and preview ID back to path to support Next.js preview mode
		 */
		$path = trailingslashit( $path ) . 'preview/' . $preview_id;

		$link = add_query_arg(
			array(
				'redirect_uri' => rawurlencode( $path ),
			),
			$frontend_uri . 'api/auth/wpe-headless'
		);
	}

	return $link;
}


add_filter( 'post_link', 'wpe_headless_post_link', 10 );
/**
 * Callback for WordPress 'preview_post_link' filter and 'post_link' filter.
 *
 * Callback for WordPress  'post_link' filter.
 *
 * Swap post links in admin for headless front-end.
 *
 * @param string $link URL used for the post.
 *
 * @return string URL used for the post.
 */
function wpe_headless_post_link( $link ) {
	if ( ! wpe_headless_is_rewrites_enabled() ) {
		return $link;
	}

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
	if ( ! wpe_headless_is_rewrites_enabled() ) {
		return $term_link;
	}

	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( empty( $frontend_uri ) ) {
		return $term_link;
	}

	$frontend_uri = trailingslashit( $frontend_uri );
	$site_url     = trailingslashit( site_url() );

	return str_replace( $site_url, $frontend_uri, $term_link );
}
