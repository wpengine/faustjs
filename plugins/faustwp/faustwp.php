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
 * Version: 1.8.3
 * Requires PHP: 7.4
 * Requires at least: 5.7
 * Tested up to: 6.8.1
 * Update URI: false
 *
 * @package FaustWP
 */

namespace WPE\FaustWP;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FAUSTWP_FILE', __FILE__ );
define( 'FAUSTWP_DIR', __DIR__ );
define( 'FAUSTWP_URL', plugin_dir_url( __FILE__ ) );
define( 'FAUSTWP_PATH', plugin_basename( FAUSTWP_FILE ) );
define( 'FAUSTWP_SLUG', dirname( plugin_basename( FAUSTWP_FILE ) ) );


/**
 * Get the minimum version of PHP required for this plugin.
 *
 * @return string Minimum version required.
 */
function faustwp_minimum_php_requirement() {
	return '7.4';
}

if ( ! is_php_version_compatible( faustwp_minimum_php_requirement() ) ) {
	add_action(
		'admin_notices',
		function () {
			?>
			<div class="notice notice-error">
				<p>
					<?php
					printf(
						/* translators: %s: Minimum required PHP version */
						esc_html__( 'FaustWP requires PHP version %s or later. Please upgrade PHP or disable the plugin.', 'faustwp' ),
						esc_html( faustwp_minimum_php_requirement() )
					);
					?>
				</p>
			</div>
			<?php
		}
	);
	return;
}

// Loads the updater service, if included in this build.
if ( file_exists( FAUSTWP_DIR . '/includes/updates/class-plugin-updater.php' ) ) {
	require FAUSTWP_DIR . '/includes/updates/class-plugin-updater.php';
}
if ( file_exists( FAUSTWP_DIR . '/includes/updates/check-for-updates.php' ) ) {
	require FAUSTWP_DIR . '/includes/updates/check-for-updates.php';
}

require FAUSTWP_DIR . '/includes/auth/functions.php';
require FAUSTWP_DIR . '/includes/telemetry/functions.php';
require FAUSTWP_DIR . '/includes/replacement/functions.php';
require FAUSTWP_DIR . '/includes/settings/functions.php';
require FAUSTWP_DIR . '/includes/graphql/functions.php';
require FAUSTWP_DIR . '/includes/utilities/functions.php';
require FAUSTWP_DIR . '/includes/auth/callbacks.php';
require FAUSTWP_DIR . '/includes/deny-public-access/functions.php';
require FAUSTWP_DIR . '/includes/detect-conflicts/functions.php';
require FAUSTWP_DIR . '/includes/blocks/functions.php';
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
require FAUSTWP_DIR . '/includes/blocks/callbacks.php';
require FAUSTWP_DIR . '/includes/telemetry/callbacks.php';
