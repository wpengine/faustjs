<?php
/**
 * Block support functions for FaustWP.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Blocks;

use WP_Error;

require_once ABSPATH . 'wp-admin/includes/file.php';

/**
 * Handles the uploaded blockset file and unzips it.
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
		return new WP_Error( 'wrong_type', esc_html__( 'Not a zip file', 'faustwp' ) );
	}

	if ( ! $wp_filesystem->is_readable( $file['tmp_name'] ) ) {
		return new WP_Error( 'file_read_error', esc_html__( 'Uploaded file is not readable', 'faustwp' ) );
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
			return new WP_Error( 'mkdir_error', sprintf( esc_html__( 'Could not create directory: %s', 'faustwp' ), $dir ) );
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
		return new WP_Error( 'move_error', esc_html__( 'Could not move uploaded file', 'faustwp' ) );
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

/**
 * Registers a block asset (script or style) if the file exists.
 *
 * This function checks for the existence of the asset file based on the provided metadata
 * and field name, and then registers the asset with WordPress if the file is found.
 *
 * @param array  $metadata     Block metadata, typically from block.json.
 * @param string $field_name   Asset type field name (e.g., editorScript, editorStyle).
 * @param string $block_name   Unique name of the block.
 * @param array  $dependencies Array of script or style dependencies.
 * @param string $version      Version string for the asset.
 * @return string|false        Registered handle on success, false on failure.
 */
function register_block_asset( $metadata, $field_name, $block_name, $dependencies, $version ) {
	// Ensure that the asset path is set in the metadata.
	if ( empty( $metadata[ $field_name ] ) ) {
		return false;
	}

	// Process the asset path and construct the full URL.
	$processed_asset_path = remove_block_asset_path_prefix( $metadata[ $field_name ] );
	$full_url             = trailingslashit( wp_upload_dir()['baseurl'] ) . 'faustwp/blocks/' . $block_name . '/' . ltrim( $processed_asset_path, '/' );

	// Construct the file system path to check for file existence.
	$file_system_path = trailingslashit( wp_upload_dir()['basedir'] ) . 'faustwp/blocks/' . $block_name . '/' . ltrim( $processed_asset_path, '/' );

	// Check if the asset file exists in the file system.
	if ( ! file_exists( $file_system_path ) ) {
		return false;
	}

	// Generate a handle and register the asset.
	$handle = $block_name . '-' . strtolower( $field_name );
	if ( strpos( strtolower( $field_name ), 'script' ) !== false ) {
		wp_register_script( $handle, $full_url, $dependencies, $version, true );
	} elseif ( strpos( strtolower( $field_name ), 'style' ) !== false ) {
		wp_register_style( $handle, $full_url, $dependencies, $version );
	} else {
		return false;
	}

	return $handle;
}
