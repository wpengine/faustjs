<?php
/**
 * Plugin Name: Faust.js™
 * Plugin URI: https://faustjs.org/
 * Description: Plugin for working with Faust.js™, the Headless WordPress Framework.
 * Author: WP Engine
 * Author URI: https://wpengine.com/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: faustwp
 * Domain Path: /languages
 * Version: 1.0.0
 * Requires PHP: 7.2
 * Requires at least: 5.7
 *
 * @package FaustWP
 */

namespace WPE\FaustWP;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FAUSTWP_FILE', __FILE__ );
define( 'FAUSTWP_DIR', dirname( __FILE__ ) );
define( 'FAUSTWP_URL', plugin_dir_url( __FILE__ ) );
define( 'FAUSTWP_PATH', plugin_basename( FAUSTWP_FILE ) );
define( 'FAUSTWP_SLUG', dirname( plugin_basename( FAUSTWP_FILE ) ) );

require FAUSTWP_DIR . '/includes/auth/functions.php';
require FAUSTWP_DIR . '/includes/telemetry/functions.php';
require FAUSTWP_DIR . '/includes/replacement/functions.php';
require FAUSTWP_DIR . '/includes/settings/functions.php';
require FAUSTWP_DIR . '/includes/graphql/functions.php';
require FAUSTWP_DIR . '/includes/utilities/functions.php';
require FAUSTWP_DIR . '/includes/auth/callbacks.php';
require FAUSTWP_DIR . '/includes/deny-public-access/functions.php';
require FAUSTWP_DIR . '/includes/detect-conflicts/functions.php';
require FAUSTWP_DIR . '/includes/deny-public-access/callbacks.php';
require FAUSTWP_DIR . '/includes/menus/callbacks.php';
require FAUSTWP_DIR . '/includes/admin-menus/callbacks.php';
require FAUSTWP_DIR . '/includes/replacement/callbacks.php';
require FAUSTWP_DIR . '/includes/replacement/graphql-callbacks.php';
require FAUSTWP_DIR . '/includes/graphql/callbacks.php';
require FAUSTWP_DIR . '/includes/rest/callbacks.php';
require FAUSTWP_DIR . '/includes/settings/callbacks.php';
require FAUSTWP_DIR . '/includes/updates/upgrade-database.php';
require FAUSTWP_DIR . '/includes/utilities/callbacks.php';
require FAUSTWP_DIR . '/includes/detect-conflicts/callbacks.php';
