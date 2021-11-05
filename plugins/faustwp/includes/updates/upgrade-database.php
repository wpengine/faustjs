<?php
/**
 * Database upgrade functions.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Updates;

add_action( 'plugins_loaded', __NAMESPACE__ . '\\upgrade_database' );
/**
 * Migrates the plugin's stored data to the latest format.
 *
 * @return bool True if updates were carried out or false.
 */
function upgrade_database(): bool {
	$current_version = get_option( 'faustwp_current_version', '0.0.0' );
	$file_data       = get_file_data( FAUSTWP_FILE, array( 'Version' => 'Version' ) );
	$plugin_version  = $file_data['Version'];

	if ( 1 === version_compare( $plugin_version, $current_version ) ) {

		// Array of versions requiring update and their callbacks.
		// Note these do not have to exactly match plugin version.
		$update_versions = array(
			'0.6.1' => 'upgrade_0_6_1',
		);

		foreach ( $update_versions as $version => $callback ) {
			if ( 1 === version_compare( $version, $current_version ) ) {
				call_user_func( __NAMESPACE__ . '\\' . $callback );
			}
		}

		// Save the last updated version.
		update_option( 'faustwp_current_version', $plugin_version );
		return true;
	}

	return false;
}

/**
 * Update settings option name for versions after to 0.6.1.
 *
 * @return bool True if the database was updated or false.
 */
function upgrade_0_6_1(): bool {
	$settings = get_option( 'wpe_headless', array() );

	if ( empty( $settings ) ) {
		return false;
	}

	delete_option( 'wpe_headless' );

	return update_option( 'faustwp_settings', $settings );
}
