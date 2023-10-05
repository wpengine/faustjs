<?php
/**
 * Various utility functions used through the Faust plugin.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Utilities;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Converts string to camelCase. Added to ensure that fields are compliant with the GraphQL spec.
 *
 * @param string $str The string to be converted to camelCase.
 * @param array  $preserved_chars The characters to preserve.
 *
 * @credit http://www.mendoweb.be/blog/php-convert-string-to-camelcase-string/
 *
 * @return string camelCase'd string
 */
function camelcase( $str, $preserved_chars = array() ) {
	/* Convert non-alpha and non-numeric characters to spaces. */
	$str = preg_replace( '/[^a-z0-9' . implode( '', $preserved_chars ) . ']+/i', ' ', $str );
	$str = trim( $str );

	/* Uppercase the first character of each word. */
	$str = ucwords( $str );
	$str = str_replace( ' ', '', $str );

	return lcfirst( $str );
}

/**
 * Returns the current version of this plugin.
 *
 * @return string The current plugin version.
 */
function plugin_version() {
	$plugin = get_plugin_data( FAUSTWP_FILE );

	return $plugin['Version'];
}

/**
 * Unzip a file to a specified directory.
 *
 * @param string $file_path Path to the zip file.
 * @param string $destination Directory to unzip to.
 * @return bool True on success, false on failure.
 */
function unzip_to_directory( $file_path, $destination ) {
	$zip = new \ZipArchive();
	if ( true !== $zip->open( $file_path ) ) {
		return false;
	}

	$zip->extractTo( $destination );
	$zip->close();
	unlink( $file_path ); // Delete the zip file.

	return true;
}

/**
 * Recursive function to remove a directory and its contents.
 *
 * @param string $dir Directory path.
 */
function rrmdir( $dir ) {
	if ( ! is_dir( $dir ) ) {
		return;
	}

	$objects = scandir( $dir );
	foreach ( $objects as $object ) {
		if ( '.' === $object || '..' === $object ) {
			continue;
		}

		$item_path = $dir . '/' . $object;
		if ( is_dir( $item_path ) ) {
			rrmdir( $item_path );
		} else {
			unlink( $item_path );
		}
	}
	rmdir( $dir );
}
