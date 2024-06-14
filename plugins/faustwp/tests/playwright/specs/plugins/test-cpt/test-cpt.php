<?php
/**
 * Plugin Name: Test CPT Plugin
 *
 * @package TestCPT
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', 'test_cpt_register_cpt' );
/**
 * Register CPT
 */
function test_cpt_register_cpt() {
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

register_activation_hook(__FILE__,'test_cpt_activate_test_cpt' );


/**
 * Register the CPT on activation and create dummy content for testing
 *
 * @return void
 */
function test_cpt_activate_test_cpt() {
	// Register the CPT
	test_cpt_register_cpt();
	flush_rewrite_rules();

	// Create post object
	$test_post = array(
		'post_title'   => 'CPT Document Preview',
		'post_content' => 'Unpublished preview document content.',
		'post_name'    => 'cpt-document-preview',
		'post_type'    => 'document'
	);

	// Insert the post into the database
	wp_insert_post( $test_post );

	// Configure Faust settings
	$faust_settings = get_option( 'faustwp_settings' );

	$faust_settings['secret_key'] = '00000000-0000-4000-8000-000000000001';
	$faust_settings['frontend_uri'] = 'http://localhost:3000';

	update_option( 'faustwp_settings', $faust_settings );
}