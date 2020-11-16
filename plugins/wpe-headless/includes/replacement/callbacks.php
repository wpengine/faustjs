<?php
/**
 * Replacement related callbacks.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
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
 * @param string  $link URL used for the post preview and/or post.
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
