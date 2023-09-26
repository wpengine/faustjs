<?php
/**
 * Functions related to block support.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Blocks;

use function WPE\FaustWP\Utilities\{
	rrmdir,
	unzip_to_directory,
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Corrects the asset path by replacing the 'file:./' prefix and appending the base URL.
 *
 * @param string $path      The original asset path.
 * @param string $base_url  The base URL to prepend to the asset path.
 *
 * @return string           The corrected asset path.
 */
function correct_asset_path( $path, $base_url ) {
	return $base_url . str_replace( 'file:./', '', $path );
}

/**
 * Infer a human-readable title based on the block's name.
 *
 * @param string $block_name The block's name.
 * @return string The inferred title.
 */
function infer_title_from_name( $block_name ) {
	$block_name_parts = explode( '/', $block_name );
	$fallback_title   = end( $block_name_parts ); // Get the last part of the block's name.
	return ucwords( str_replace( '-', ' ', $fallback_title ) ); // Convert to title case.
}

/**
 * Determines the path to the manifest.json file.
 *
 * @return string The path to the manifest.json file.
 */
function get_manifest_file_path() {
	$uploads_dir = wp_upload_dir();
	return trailingslashit( $uploads_dir['basedir'] ) . 'faustwp/blocks/manifest.json';
}

/**
 * Fetches and decodes the JSON data from the manifest file.
 *
 * @param string $file_path Path to the manifest file.
 * @return array|false Decoded manifest data or false on failure.
 */
function get_manifest_data( $file_path ) {
	// phpcs:disable WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	$manifest_content = file_get_contents( $file_path );
	return json_decode( $manifest_content, true );
}

/**
 * Handle the uploaded blockset file and unzip it.
 * Returns true upon success.
 *
 * @param array $file The uploaded file details.
 * @return \WP_Error|bool
 */
function handle_uploaded_blockset( $file ) {
	// Ensure ZipArchive class is available.
	if ( ! class_exists( 'ZipArchive' ) ) {
		return new \WP_Error( 'ziparchive_missing', __( 'The ZipArchive class is not available', 'faustwp' ) );
	}

	// Check if it's a zip file.
	if ( 'application/zip' !== $file['type'] ) {
		return new \WP_Error( 'wrong_type', __( 'Not a zip file', 'faustwp' ) );
	}

	// Define directories.
	$upload_dir = wp_upload_dir();
	$target_dir = trailingslashit( $upload_dir['basedir'] ) . 'faustwp/';
	$blocks_dir = $target_dir . 'blocks/';
	$tmp_dir    = $target_dir . 'tmp_blocks/';

	// Ensure temporary directory exists.
	if ( ! file_exists( $tmp_dir ) && ! wp_mkdir_p( $tmp_dir ) ) {
		return new \WP_Error( 'mkdir_error', __( 'Could not create temporary directory', 'faustwp' ) );
	}

	// Move the uploaded file.
	$target_file = $target_dir . sanitize_file_name( basename( $file['name'] ) );
	if ( ! move_uploaded_file( $file['tmp_name'], $target_file ) ) {
		return new \WP_Error( 'move_error', __( 'Could not move uploaded file', 'faustwp' ) );
	}

	// Unzip the file to the temporary directory.
	if ( ! unzip_to_directory( $target_file, $tmp_dir ) ) {
		rrmdir( $tmp_dir );  // Cleanup the temporary directory in case of unzip failure.
		return new \WP_Error( 'unzip_error', __( 'Could not unzip the file', 'faustwp' ) );
	}

	// Replace the old blocks directory with the new content.
	if ( is_dir( $blocks_dir ) ) {
		rrmdir( $blocks_dir );
	}

	if ( ! rename( $tmp_dir, $blocks_dir ) ) {
		return new \WP_Error( 'rename_error', __( 'Could not rename the directory', 'faustwp' ) );
	}

	return true;
}

/**
 * Enqueue an asset and return its handle.
 *
 * @param string      $relative_path Relative path to the asset.
 * @param string      $base_url Base URL for the asset.
 * @param string|bool $script 'style' for styles, true for scripts.
 * @param array       $dependencies Array of handles that a given script/style is dependent on.
 *
 * @return string|bool The asset handle or false on failure.
 */
function enqueue_asset( $relative_path, $base_url, $script = true, $dependencies = array() ) {
	$url                = correct_asset_path( $relative_path, $base_url );
	$handle             = basename( $relative_path, '.' . pathinfo( $relative_path, PATHINFO_EXTENSION ) );
	$manifest_file_path = get_manifest_file_path();

	if ( 'style' === $script ) {
		wp_register_style(
			$handle,
			$url,
			$dependencies,
			filemtime( $manifest_file_path )
		);

		return $handle;
	} elseif ( $script ) {
		wp_register_script(
			$handle,
			$url,
			$dependencies,
			filemtime( $manifest_file_path ),
			true
		);

		return $handle;
	}

	return false;
}

