<?php
/*
Plugin Name: Test CPT Plugin
*/

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

add_action('init', 'register_cpt');
function register_cpt()
{
	$args = array(
		'label' => 'Document',
		'public' => true,
		'publicly_queryable' => true,
		'exclude_from_search' => false,
		'show_ui' => true,
		'show_in_menu' => true,
		'has_archive' => true,
		'rewrite' => true,
		'query_var' => true,
		'show_in_rest' => true,
		'supports' => array('editor'),
		'show_in_graphql' => true,
		'hierarchical' => true,
		'graphql_single_name' => 'document',
		'graphql_plural_name' => 'documents',
	);
	register_post_type('document', $args);
}
