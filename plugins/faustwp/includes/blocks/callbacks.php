<?php
/**
 * Callbacks related to block support.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\register_custom_blocks' );
/**
 * Register Gutenberg blocks from block.json files located in the specified paths.
 */
/**
 * Register Gutenberg blocks from block.json files located in the specified paths.
 */
function register_custom_blocks() {
	$uploads = wp_upload_dir();

	// Define the base directory path and URL.
	$base_dir = trailingslashit( $uploads['basedir'] ) . 'faustwp/blocks/';
	$base_url = trailingslashit( $uploads['baseurl'] ) . 'faustwp/blocks/';

	// Check if the directory exists.
	if ( ! is_dir( $base_dir ) ) {
		return;
	}

	// Scan the directory for subdirectories (each representing a block).
	$block_dirs = array_filter( glob( $base_dir . '*' ), 'is_dir' );

	foreach ( $block_dirs as $dir ) {
		// Path to the block.json file.
		$metadata_file = trailingslashit( $dir ) . 'block.json';

		// Check if block.json exists and register the block.
		if ( file_exists( $metadata_file ) ) {
			register_block_type( $metadata_file );
		}
	}
}
