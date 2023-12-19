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
 * Register Gutenberg blocks from block.json and index.asset.json files located in the specified paths.
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
		$metadata_file = trailingslashit( $dir ) . 'block.json';
		$asset_file    = trailingslashit( $dir ) . 'index.asset.json';

		if ( file_exists( $metadata_file ) ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$block_metadata = json_decode( file_get_contents( $metadata_file ), true );
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$asset_data = file_exists( $asset_file ) ? json_decode( file_get_contents( $asset_file ), true ) : array();
			$block_name = basename( $dir );

			$dependencies = $asset_data['dependencies'] ?? array();
			$version      = $asset_data['version'] ?? '';

			$block_args = array();

			// Register editor script.
			if ( isset( $block_metadata['editorScript'] ) ) {
				$editor_script_handle = register_block_asset( $block_metadata, 'editorScript', $block_name, $dependencies, $version );
				if ( $editor_script_handle ) {
					$block_args['editor_script'] = $editor_script_handle;
				}
			}

			// Register editor style.
			if ( isset( $block_metadata['editorStyle'] ) ) {
				$editor_style_handle = register_block_asset( $block_metadata, 'editorStyle', $block_name, array(), $version );
				if ( $editor_style_handle ) {
					$block_args['editor_style'] = $editor_style_handle;
				}
			}

			// Register style.
			if ( isset( $block_metadata['style'] ) ) {
				$style_handle = register_block_asset( $block_metadata, 'style', $block_name, array(), $version );
				if ( $style_handle ) {
					$block_args['style'] = $style_handle;
				}
			}

			register_block_type( $metadata_file, $block_args );
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
