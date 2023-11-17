<?php
/**
 * Functions related to block support.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Blocks;

use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once ABSPATH . 'wp-admin/includes/file.php';

/**
 * Handle the uploaded blockset file and unzips it.
 * Returns true upon success.
 *
 * @param array $file The uploaded file details.
 * @return WP_Error|bool
 */
function handle_uploaded_blockset( $file ) {
	WP_Filesystem();
	global $wp_filesystem;

	$error = validate_uploaded_file( $wp_filesystem, $file );
	if ( is_wp_error( $error ) ) {
		return $error;
	}

	$dirs  = define_directories();
	$error = ensure_directories_exist( $dirs );
	if ( is_wp_error( $error ) ) {
		return $error;
	}

	return process_and_replace_blocks( $wp_filesystem, $file, $dirs );
}

/**
 * Processes the uploaded blockset file, unzips it, and replaces the old blocks directory.
 *
 * @param WP_Filesystem_Base $wp_filesystem Filesystem object.
 * @param array              $file The uploaded file details.
 * @param array              $dirs Directories array.
 * @return WP_Error|bool True on success, WP_Error on failure.
 */
function process_and_replace_blocks( $wp_filesystem, $file, $dirs ) {
	$target_file = trailingslashit( $dirs['target'] ) . sanitize_file_name( basename( $file['name'] ) );

	$move_result = move_uploaded_file( $wp_filesystem, $file, $target_file );
	if ( is_wp_error( $move_result ) ) {
		return $move_result;
	}

	$unzip_result = unzip_uploaded_file( $target_file, $dirs['target'] );
	if ( is_wp_error( $unzip_result ) ) {
		return $unzip_result;
	}

	cleanup_temp_directory( $wp_filesystem, $dirs['temp'] );

	return true;
}

/**
 * Validates the uploaded file type and readability.
 *
 * @param WP_Filesystem_Base $wp_filesystem Filesystem object.
 * @param array              $file The uploaded file details.
 * @return WP_Error|bool
 */
function validate_uploaded_file( $wp_filesystem, $file ) {
	if ( 'application/zip' !== $file['type'] ) {
		return new WP_Error( 'wrong_type', __( 'Not a zip file', 'faustwp' ) );
	}

	if ( ! $wp_filesystem->is_readable( $file['tmp_name'] ) ) {
		return new WP_Error( 'file_read_error', __( 'Uploaded file is not readable', 'faustwp' ) );
	}

	return true;
}

/**
 * Defines and returns necessary directories for file processing.
 *
 * @return array
 */
function define_directories() {
	$upload_dir = wp_upload_dir();
	$base_dir   = trailingslashit( $upload_dir['basedir'] ) . trailingslashit( FAUSTWP_SLUG );

	return array(
		'target' => $base_dir . 'blocks',
		'temp'   => $base_dir . 'tmp_blocks',
	);
}

/**
 * Ensures that the necessary directories exist.
 *
 * @param array $dirs Directories array.
 * @return WP_Error|true
 */
function ensure_directories_exist( $dirs ) {
	foreach ( $dirs as $dir ) {
		if ( ! wp_mkdir_p( $dir ) ) {
			/* translators: %s: directory path */
			return new WP_Error( 'mkdir_error', sprintf( __( 'Could not create directory: %s', 'faustwp' ), $dir ) );
		}
	}

	return true;
}



/**
 * Moves the uploaded file to the target directory.
 *
 * @param WP_Filesystem_Base $wp_filesystem Filesystem object.
 * @param array              $file The uploaded file details.
 * @param string             $target_file The target file path.
 * @return WP_Error|bool True on success, WP_Error on failure.
 */
function move_uploaded_file( $wp_filesystem, $file, $target_file ) {
	if ( ! $wp_filesystem->move( $file['tmp_name'], $target_file, true ) ) {
		return new WP_Error( 'move_error', __( 'Could not move uploaded file', 'faustwp' ) );
	}
	return true;
}

/**
 * Unzips the uploaded file.
 *
 * @param string $target_file The target file path.
 * @param string $destination The destination directory for unzipping.
 * @return WP_Error|bool True on success, WP_Error on failure.
 */
function unzip_uploaded_file( $target_file, $destination ) {
	$unzip_result = unzip_file( $target_file, $destination );
	if ( is_wp_error( $unzip_result ) ) {
		return $unzip_result;
	}
	return true;
}

/**
 * Cleans up temporary files or directories.
 *
 * @param WP_Filesystem_Base $wp_filesystem Filesystem object.
 * @param string             $temp_dir The temporary directory path.
 * @return void
 */
function cleanup_temp_directory( $wp_filesystem, $temp_dir ) {
	if ( $wp_filesystem->is_dir( $temp_dir ) ) {
		$wp_filesystem->delete( $temp_dir, true );
	}
}
