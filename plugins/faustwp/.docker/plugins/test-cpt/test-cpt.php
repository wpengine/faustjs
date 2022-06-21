<?php
/**
 * Plugin Name: Test CPT Plugin
 *
 * @package TestCPT
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', 'register_cpt' );
/**
 * Register CPT
 */
function register_cpt() {
	$args = array(
		'label'               => 'Document',
		'show_in_graphql'     => true,
		'graphql_single_name' => 'document',
		'graphql_plural_name' => 'documents',
		'public'              => true,
		'show_in_rest'        => true,
		'supports'            => array( 'editor' ),
	);
	register_post_type( 'document', $args );
}
