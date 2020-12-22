<?php
/**
 * Plugin Name: WPEngine Headless
 * Plugin URI: https://wpengine.com/
 * Description: Plugin for working with headless WordPress.
 * Author: WPEngine
 * Author URI: https://wpengine.com/
 * Text Domain: wpe-headless
 * Domain Path: /languages
 * Version: 0.2.0-dev
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPE_HEADLESS_FILE', __FILE__ );
define( 'WPE_HEADLESS_DIR', dirname( __FILE__ ) );
define( 'WPE_HEADLESS_PATH', plugin_basename( WPE_HEADLESS_FILE ) );
define( 'WPE_HEADLESS_SLUG', dirname( plugin_basename( WPE_HEADLESS_FILE ) ) );

require WPE_HEADLESS_DIR . '/includes/auth/functions.php';
require WPE_HEADLESS_DIR . '/includes/replacement/functions.php';
require WPE_HEADLESS_DIR . '/includes/settings/functions.php';
require WPE_HEADLESS_DIR . '/includes/updates/functions.php';
require WPE_HEADLESS_DIR . '/includes/graphql/functions.php';
require WPE_HEADLESS_DIR . '/includes/utilities/functions.php';
require WPE_HEADLESS_DIR . '/includes/auth/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/deny-public-access/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/menus/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/admin-menus/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/replacement/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/replacement/graphql-callbacks.php';
require WPE_HEADLESS_DIR . '/includes/graphql/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/rest/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/settings/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/updates/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/utilities/callbacks.php';

if ( wpe_headless_is_events_enabled() ) {
	require WPE_HEADLESS_DIR . '/includes/events/callbacks.php';
}

/**
 * Runs plugin activation tasks.
 */
add_action(
	'activated_plugin',
	static function( $plugin, $network_wide ) {
		if ( ! $network_wide && plugin_basename( __FILE__ ) === $plugin ) {
			wp_safe_redirect( esc_url( admin_url( 'options-general.php?page=wpe-headless-settings' ) ) );
			exit;
		}
	},
	10,
	2
);
