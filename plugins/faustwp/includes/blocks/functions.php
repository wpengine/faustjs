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
