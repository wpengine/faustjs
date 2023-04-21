<?php
/**
 * Replacement related callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Replacement;

use function WPE\FaustWP\Settings\{
	faustwp_get_setting,
	is_image_source_replacement_enabled,
	is_rewrites_enabled
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'the_content', __NAMESPACE__ . '\\content_replacement' );
/**
 * Callback for WordPress 'the_content' filter.
 *
 * @param string $content The post content.
 *
 * @return string The post content.
 * @todo Needs work...
 */
function content_replacement( $content ) {
	if ( ! domain_replacement_enabled() ) {
		return $content;
	}

	$replacement = faustwp_get_setting( 'frontend_uri' );
	$site_url    = site_url();

	if ( ! $replacement ) {
		$replacement = '/';
	}

	$content = str_replace( "href=\"{$site_url}", "href=\"{$replacement}", $content );

	return str_replace( 'href="//', 'href="/', $content );
}

add_filter( 'the_content', __NAMESPACE__ . '\\image_source_replacement' );
/**
 * Callback for WordPress 'the_content' filter to replace paths to media.
 *
 * @param string $content The post content.
 *
 * @return string The post content.
 */
function image_source_replacement( $content ) {
	if ( ! is_image_source_replacement_enabled() ) {
		return $content;
	}

	$frontend_uri = faustwp_get_setting( 'frontend_uri' );
	$site_url     = site_url();

	// For urls with no domain or the frontend domain, replace with the wp site_url.
	$patterns = array(
		"#src=\"{$frontend_uri}/#",
		'#src="/#',
	);
	return preg_replace( $patterns, "src=\"{$site_url}/", $content );
}

add_filter( 'wp_calculate_image_srcset', __NAMESPACE__ . '\\image_source_srcset_replacement' );
/**
 * Callback for WordPress 'the_content' filter to replace paths to media.
 *
 * @param array $sources One or more arrays of source data to include in the 'srcset'.
 *
 * @return string One or more arrays of source data.
 */
function image_source_srcset_replacement( $sources ) {
	if ( ! is_image_source_replacement_enabled() ) {
		return $sources;
	}

	$frontend_uri = faustwp_get_setting( 'frontend_uri' );
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

add_filter( 'preview_post_link', __NAMESPACE__ . '\\post_preview_link', 1000, 2 );
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
function post_preview_link( $link, $post ) {
	$frontend_uri = faustwp_get_setting( 'frontend_uri' );

	if ( $frontend_uri ) {
		$home_url     = trailingslashit( get_home_url() );
		$frontend_uri = trailingslashit( $frontend_uri );

		$link = str_replace( $home_url, $frontend_uri, $link );

		// Replace the schemes, if different.
		$frontend_uri_scheme = wp_parse_url( $frontend_uri, PHP_URL_SCHEME );
		$link_scheme         = wp_parse_url( $link, PHP_URL_SCHEME );
		if ( $frontend_uri_scheme !== $link_scheme ) {
			$link = str_replace( $link_scheme . '://', $frontend_uri_scheme . '://', $link );
		}

		/**
		 * This should already be handled by WPE\FaustWP\Replacement\post_link, but
		 * it's here for verbosity's sake and if the other filter changes for any reason.
		 */
		$parsed_link_query = wp_parse_url( $link, PHP_URL_QUERY );
		$args              = wp_parse_args( $parsed_link_query );
		$preview_id        = isset( $args['preview_id'] ) ? $args['preview_id'] : $post->ID;

		// Remove ?p=xx&preview=true from link temporarily.
		$link = remove_query_arg(
			array_keys( $args ),
			$link
		);

		if ( ! isset( $args['previewPathname'] ) ) {
			$args['previewPathname'] = rawurlencode( wp_make_link_relative( get_permalink( $post ) ) );
		}

		// Add p=xx if it's missing, which is the case for published posts.
		if ( ! isset( $args['p'] ) ) {
			$args['p'] = $preview_id;
		}

		// Add preview=true in case other plugins have stripped it.
		if ( ! isset( $args['preview'] ) ) {
			$args['preview'] = 'true';
		}

		// Add page_id=xx if it's missing, which is the case for published pages.
		if ( ! isset( $args['page_id'] ) && 'page' === $post->post_type ) {
			$args['page_id'] = $preview_id;
		}

		/**
		 * We use this query param to get the correct preview post type.
		 * This saves us a second request to the GraphQL endpoint, as we first
		 * need to determine the preview node post type before retrieving
		 * the data.
		 */
		$post_type_object = get_post_type_object( $post->post_type );
		if (
			! isset( $args['typeName'] ) &&
			isset( $post_type_object ) &&
			! empty( $post_type_object->graphql_single_name )
		) {
			$gql_type_name    = ucfirst( $post_type_object->graphql_single_name );
			$args['typeName'] = $gql_type_name;
		}

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

add_filter( 'post_link', __NAMESPACE__ . '\\post_link', 1000 );
add_filter( 'page_link', __NAMESPACE__ . '\\post_link', 1000 );
/**
 * Callback for WordPress 'post_link' & 'page_link' filter.
 *
 * Swap post links in admin for headless front-end.
 *
 * @param string $link URL used for the post.
 *
 * @return string URL used for the post.
 */
function post_link( $link ) {
	if (
		! is_rewrites_enabled()
		|| ( function_exists( 'is_graphql_request' ) && is_graphql_request() )
	) {
		return $link;
	}

	return equivalent_frontend_url( $link );
}

add_filter( 'term_link', __NAMESPACE__ . '\\term_link', 1000 );
/**
 * Rewrites term links to point to the specified front-end URL.
 *
 * @param string $term_link Term link URL.
 *
 * @return string
 */
function term_link( $term_link ) {
	if ( ! is_rewrites_enabled() ) {
		return $term_link;
	}

	return equivalent_frontend_url( $term_link );
}


add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_preview_scripts' );
/**
 * Adds JavaScript file to the Gutenberg editor page that prepends /preview to the preview link.
 *
 * XXX: Please remove this once this issue is resolved: https://github.com/WordPress/gutenberg/issues/13998
 */
function enqueue_preview_scripts() {
	wp_enqueue_script( 'faustwp-gutenberg-filters', plugins_url( '/previewlinks.js', __FILE__ ), array(), '1.0.0', true );
	wp_localize_script( 'faustwp-gutenberg-filters', '_faustwp_preview_link', array( '_preview_link' => get_preview_post_link() ) );
}

add_filter( 'wp_sitemaps_posts_entry', __NAMESPACE__ . '\\sitemaps_posts_entry' );
/**
 * Filters the sitemap entry for an individual post.
 *
 * @param array $sitemap_entry Sitemap entry for the post.
 */
function sitemaps_posts_entry( $sitemap_entry ) {
	return normalize_sitemap_entry( $sitemap_entry );
}

add_filter( 'wp_sitemaps_taxonomies_entry', __NAMESPACE__ . '\\sitemaps_taxonomies_entry' );
/**
 * Filters the sitemap entry for an individual term.
 *
 * @param array $sitemap_entry Sitemap entry for the term.
 */
function sitemaps_taxonomies_entry( $sitemap_entry ) {
	return normalize_sitemap_entry( $sitemap_entry );
}

add_filter( 'wpseo_xml_sitemap_post_url', __NAMESPACE__ . '\\yoast_sitemap_post_url' );
/**
 * Filter the URL Yoast SEO uses in the XML sitemap.
 *
 * Note that only absolute local URLs are allowed as the check after this removes external URLs.
 *
 * @param string $url URL to use in the XML sitemap.
 */
function yoast_sitemap_post_url( $url ) {
	return equivalent_wp_url( $url );
}
