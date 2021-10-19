<?php
/**
 * Plugin Name: Faust WP
 * Plugin URI: https://wpengine.com/
 * Description: Plugin for working with Faust.js, the Headless WordPress Framework.
 * Author: WP Engine
 * Author URI: https://wpengine.com/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: faustwp
 * Domain Path: /languages
 * Version: 0.6.1
 * Requires PHP: 7.2
 *
 * @package FaustWP
 */

namespace WPE\FaustWP;

use function WPE\FaustWP\Settings\is_events_enabled;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FAUSTWP_FILE', __FILE__ );
define( 'FAUSTWP_DIR', dirname( __FILE__ ) );
define( 'FAUSTWP_URL', plugin_dir_url( __FILE__ ) );
define( 'FAUSTWP_PATH', plugin_basename( FAUSTWP_FILE ) );
define( 'FAUSTWP_SLUG', dirname( plugin_basename( FAUSTWP_FILE ) ) );

require FAUSTWP_DIR . '/includes/auth/functions.php';
require FAUSTWP_DIR . '/includes/replacement/functions.php';
require FAUSTWP_DIR . '/includes/settings/functions.php';
require FAUSTWP_DIR . '/includes/updates/functions.php';
require FAUSTWP_DIR . '/includes/graphql/functions.php';
require FAUSTWP_DIR . '/includes/utilities/functions.php';
require FAUSTWP_DIR . '/includes/auth/callbacks.php';
require FAUSTWP_DIR . '/includes/deny-public-access/callbacks.php';
require FAUSTWP_DIR . '/includes/menus/callbacks.php';
require FAUSTWP_DIR . '/includes/admin-menus/callbacks.php';
require FAUSTWP_DIR . '/includes/replacement/callbacks.php';
require FAUSTWP_DIR . '/includes/replacement/graphql-callbacks.php';
require FAUSTWP_DIR . '/includes/graphql/callbacks.php';
require FAUSTWP_DIR . '/includes/rest/callbacks.php';
require FAUSTWP_DIR . '/includes/settings/callbacks.php';
require FAUSTWP_DIR . '/includes/updates/callbacks.php';
require FAUSTWP_DIR . '/includes/utilities/callbacks.php';

if ( is_events_enabled() ) {
	require FAUSTWP_DIR . '/includes/events/callbacks.php';
}

add_action( 'activated_plugin', 'activated_plugin', 10, 2 );
/**
 * Callback for WordPress 'activated_plugin' action.
 *
 * Redirect the user to Faust WP settings page on activation.
 *
 * @param string $plugin       The plugin name.
 * @param bool   $network_wide True if a network plugin, false if else.
 */
function activated_plugin( $plugin, $network_wide ) {
	if ( ! defined( 'WP_CLI' ) && ! $network_wide && FAUSTWP_PATH === $plugin ) {
		wp_safe_redirect( esc_url_raw( admin_url( 'options-general.php?page=faustwp-settings&new_activation=1' ) ) );
		exit;
	}
}
