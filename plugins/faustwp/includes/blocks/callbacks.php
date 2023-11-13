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

add_action( 'init', __NAMESPACE__ . '\\register_custom_blocks' );
/**
 * Register Gutenberg blocks from block.json files located in the specified paths.
 */
function register_custom_blocks() {
	static $initialized = false;

	// Prevent subsequent runs since blocks should already be registered.
	if ( $initialized ) {
		return;
	}

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

	$initialized = true;
}

add_filter( 'style_loader_src', __NAMESPACE__ . '\\correct_asset_src_for_uploads_dir', 10, 2 );
add_filter( 'script_loader_src', __NAMESPACE__ . '\\correct_asset_src_for_uploads_dir', 10, 2 );
/**
 * Modify the source URL for enqueued assets stored in the uploads directory.
 *
 * Filters the source URL of specific enqueued styles and scripts to correct their paths,
 * focusing on assets that include "faustwp/blocks" in their URL.
 *
 * @param string $src    The source URL of the enqueued asset.
 * @param string $handle The asset's registered handle.
 *
 * @return string        Modified or original source URL.
 *
 * @see https://github.com/WordPress/wordpress-develop/blob/6.3/src/wp-includes/blocks.php#L149-L165C3
 */
function correct_asset_src_for_uploads_dir( $src, $handle ) {
	// Check for the presence of "faustwp/blocks" in the src.
	if ( strpos( $src, 'faustwp/blocks' ) !== false ) {
		// Extract the specific block directory.
		preg_match( '#faustwp/blocks/([^/]+)#', $src, $matches );

		if ( isset( $matches[1] ) ) {
			$uploads_dir = wp_upload_dir();
			$base_url    = trailingslashit( $uploads_dir['baseurl'] );

			$correct_src = $base_url . 'faustwp/blocks/' . $matches[1] . '/' . wp_basename( $src );
			return $correct_src;
		}
	}

	return $src;
}
