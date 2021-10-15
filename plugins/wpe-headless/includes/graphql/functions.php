<?php
/**
 * Utility functions pertaining to augmenting WP GraphQL.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\GraphQL;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns list of conditional tags applicable to a headless frontend.
 *
 * Important note, the order of these tags must follow the order set in WordPress' template-loader.php file so we can
 * accurately get the list of templates to be located for a given URI.
 *
 * @return array  {
 *     list of conditional tags
 *
 * @type string $description Description of the template getter. This will be displayed in the GraphQL docs.
 * @type string $template_getter Core function in WordPress used to locate the templates if the conditional tag
 *                                    returns true.
 * }
 * @see template-loader.php
 */
function get_conditional_tags() {
	return array(
		'is_search'            => array(
			'description'     => __( 'Determines whether the query is for a search.', 'faustwp' ),
			'template_getter' => 'get_search_template',
		),
		'is_front_page'        => array(
			'description'     => __( 'Determines whether the query is for the front page of the site.', 'faustwp' ),
			'template_getter' => 'get_front_page_template',
		),
		'is_home'              => array(
			'description'     => __( 'Determines whether the query is for the blog homepage.', 'faustwp' ),
			'template_getter' => 'get_home_template',
		),
		'is_privacy_policy'    => array(
			'description'     => __( 'Determines whether the query is for the Privacy Policy page.', 'faustwp' ),
			'template_getter' => 'get_privacy_policy_template',
		),
		'is_post_type_archive' => array(
			'description'     => __( 'Determines whether the query is for an existing post type archive page.', 'faustwp' ),
			'template_getter' => 'get_post_type_archive_template',
		),
		'is_tax'               => array(
			'description'     => __( 'Determines whether the query is for an existing custom taxonomy archive page.', 'faustwp' ),
			'template_getter' => 'get_taxonomy_template',
		),
		'is_attachment'        => array(
			'description'     => __( 'Determines whether the query is for an existing attachment page.', 'faustwp' ),
			'template_getter' => 'get_attachment_template',
		),
		'is_single'            => array(
			'description'     => __( 'Determines whether the query is for an existing single post.', 'faustwp' ),
			'template_getter' => 'get_single_template',
		),
		'is_page'              => array(
			'description'     => __( 'Determines whether the query is for an existing single page.', 'faustwp' ),
			'template_getter' => 'get_page_template',
		),
		'is_singular'          => array(
			'description'     => __( 'Determines whether the query is for an existing single post of any post type (post, attachment, page, custom post types).', 'faustwp' ),
			'template_getter' => 'get_singular_template',
		),
		'is_category'          => array(
			'description'     => __( 'Determines whether the query is for an existing category archive page.', 'faustwp' ),
			'template_getter' => 'get_category_template',
		),
		'is_tag'               => array(
			'description'     => __( 'Determines whether the query is for an existing tag archive page.', 'faustwp' ),
			'template_getter' => 'get_tag_template',
		),
		'is_author'            => array(
			'description'     => __( 'Determines whether the query is for an existing author archive page.', 'faustwp' ),
			'template_getter' => 'get_author_template',
		),
		'is_date'              => array(
			'description'     => __( 'Determines whether the query is for an existing date archive.', 'faustwp' ),
			'template_getter' => 'get_date_template',
		),
		'is_archive'           => array(
			'description'     => __( 'Determines whether the query is for an existing archive page.', 'faustwp' ),
			'template_getter' => 'get_archive_template',
		),

		/* Conditional tags without template getters */
		'is_day'               => array(
			'description' => __( 'Determines whether the query is for an existing day archive.', 'faustwp' ),
		),
		'is_multi_author'      => array(
			'description' => __( 'Determines whether this site has more than one author.', 'faustwp' ),
		),
		'is_month'             => array(
			'description' => __( 'Determines whether the query is for an existing month archive.', 'faustwp' ),
		),
		'is_page_template'     => array(
			'description' => __( 'Determines whether currently in a page template.', 'faustwp' ),
		),
		'is_preview'           => array(
			'description' => __( 'Determines whether the query is for a post or page preview.', 'faustwp' ),
		),
		'is_sticky'            => array(
			'description' => __( 'Determines whether a post is sticky.', 'faustwp' ),
		),
		'is_year'              => array(
			'description' => __( 'Determines whether the query is for an existing year archive.', 'faustwp' ),
		),
	);
}

/**
 * Returns list of template hierarchy types supported by the {$type}_template_hierarchy filters.
 *
 * @return string[] list of template hierarchy types
 */
function template_hierarchy_types() {
	return array(
		'index',
		'404',
		'archive',
		'author',
		'category',
		'tag',
		'taxonomy',
		'date',
		'embed',
		'home',
		'frontpage',
		'privacypolicy',
		'page',
		'paged',
		'search',
		'single',
		'singular',
		'attachment',
	);
}
