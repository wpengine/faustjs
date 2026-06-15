<?php
/**
 * Plugin Updater Initialization File
 *
 * This file is responsible for initializing the plugin update checker
 * for the FaustWP plugin, allowing it to receive updates from a custom API endpoint.
 *
 * @package   FaustWP
 */

namespace WPE\FaustWP\Updates;

/**
 * Initialize the checking for plugin updates.
 */
function check_for_updates() {
	$properties = array(
		'plugin_slug'     => 'faustwp', // This must match the key in "https://wpe-plugin-updates.wpengine.com/plugins.json".
		'plugin_basename' => FAUSTWP_PATH,
	);

	new Plugin_Updater( $properties );
}
add_action( 'admin_init', __NAMESPACE__ . '\check_for_updates' );
