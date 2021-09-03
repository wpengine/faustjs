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

add_filter( 'the_content', 'wpe_headless_image_source_replacement' );
/**
 * Callback for WordPress 'the_content' filter to replace paths to media.
 *
 * @param string $content The post content.
 *
 * @return string The post content.
 */
function wpe_headless_image_source_replacement( $content ) {
	if ( ! wpe_headless_is_image_source_replacement_enabled() ) {
		return $content;
	}

	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );
	$site_url     = site_url();

	// For urls with no domain or the frontend domain, replace with the wp site_url.
	$patterns = array(
		"#src=\"{$frontend_uri}/#",
		'#src="/#',
	);
	return preg_replace( $patterns, "src=\"{$site_url}/", $content );
}

add_filter( 'wp_calculate_image_srcset', 'wpe_headless_image_source_srcset_replacement' );
/**
 * Callback for WordPress 'the_content' filter to replace paths to media.
 *
 * @param array $sources One or more arrays of source data to include in the 'srcset'.
 *
 * @return string One or more arrays of source data.
 */
function wpe_headless_image_source_srcset_replacement( $sources ) {
	if ( ! wpe_headless_is_image_source_replacement_enabled() ) {
		return $sources;
	}

	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );
	$site_url     = site_url();

	if ( is_array( $sources ) ) {
		// For urls with no domain or the frontend domain, replace with the wp site_url.
		$patterns = array(
			"#^{$frontend_uri}/#",
			'#^/#',
		);
		foreach ( $sources as $width => $source ) {
			$sources[ $width ]['url'] = preg_replace( $patterns, "$site_url/", $sources[ $width ]['url'] );
		}
	}

	return $sources;
}

add_filter( 'preview_post_link', 'wpe_headless_post_preview_link', 1000, 2 );
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

		$parsed_link_query = wp_parse_url( $link, PHP_URL_QUERY );
		$args              = wp_parse_args( $parsed_link_query );
		$frontend_uri_path = wp_parse_url( $frontend_uri, PHP_URL_PATH );
		$parsed_link_path  = wp_parse_url( $link, PHP_URL_PATH );
		$link_path         = str_replace( $frontend_uri_path, '', $parsed_link_path );
		$path              = trailingslashit( $link_path );

		$preview_id = isset( $args['preview_id'] ) ? $args['preview_id'] : $post->ID;

		// Remove ?p=xx&preview=true from link temporarily.
		$link = remove_query_arg(
			array_keys( $args ),
			$link
		);

		// Add p=xx if it's missing, which is the case for published posts.
		if ( ! isset( $args['p'] ) ) {
			$args['p'] = $preview_id;
		}

		// Add page_id=xx if it's missing, which is the case for published pages.
		if ( ! isset( $args['page_id'] ) && 'page' === $post->post_type ) {
			$args['page_id'] = $preview_id;
		}

		$untrailingslash_frontend_uri = untrailingslashit( $frontend_uri );
		$unleadingslash_path          = ltrim( $path, '/\\' );
		$link                         = $untrailingslash_frontend_uri . '/' . $unleadingslash_path;

		// Add ?p=xx&preview=true to link again.
		$link = add_query_arg(
			array(
				$args,
			),
			$link
		);
	}

	return $link;
}


add_filter( 'post_link', 'wpe_headless_post_link', 1000 );
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
	if (
		! wpe_headless_is_rewrites_enabled()
		|| ( function_exists( 'is_graphql_request' ) && is_graphql_request() )
	) {
		return $link;
	}

	$frontend_uri = wpe_headless_get_setting( 'frontend_uri' );

	if ( $frontend_uri ) {
		return str_replace( trailingslashit( get_home_url() ), trailingslashit( $frontend_uri ), $link );
	}

	return $link;
}

add_filter( 'term_link', 'wpe_headless_term_link', 1000 );
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


add_action( 'enqueue_block_editor_assets', 'wpe_headless_enqueue_preview_scripts' );
/**
 * Adds JavaScript file to the Gutenberg editor page that prepends /preview to the preview link.
 *
 * XXX: Please remove this once this issue is resolved: https://github.com/WordPress/gutenberg/issues/13998
 */
function wpe_headless_enqueue_preview_scripts() {
	wp_enqueue_script( 'awp-gutenberg-filters', plugins_url( '/previewlinks.js', __FILE__ ), array(), '1.0.0', true );
	wp_localize_script( 'awp-gutenberg-filters', '_wpe_headless_preview_link', array( '_preview_link' => get_preview_post_link() ) );
}
