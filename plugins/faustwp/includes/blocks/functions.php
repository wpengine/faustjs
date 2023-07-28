<?php
/**
 * Functions related to block support.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the contents of theme.json if present.
 *
 * @return object The contents of theme.json.
 */
function get_theme_json() {
	$file_path = get_template_directory() . '/theme.json';

	if ( ! file_exists( $file_path ) ) {
		return new WP_Error( 'no_theme_json', 'No theme.json file found in the active theme.', array( 'status' => 404 ) );
	}

	// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	$json_content = file_get_contents( $file_path );

	if ( false === $json_content ) {
		return new WP_Error( 'reading_error', 'Error reading theme.json file.', array( 'status' => 500 ) );
	}

	return json_decode( $json_content, true );
}
