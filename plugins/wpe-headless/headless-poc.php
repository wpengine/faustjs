<?php
/**
 * Plugin Name: WPEngine Headless
 * Plugin URI: https://wpengine.com/
 * Description: Plugin for working with headless WordPress.
 * Author: WPEngine
 * Author URI: https://wpengine.com/
 * Text Domain: wpe-headless
 * Domain Path: /languages
 * Version: 0.1.1-dev
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPE_HEADLESS_FILE', __FILE__ );
define( 'WPE_HEADLESS_DIR', dirname( __FILE__ ) );

require WPE_HEADLESS_DIR . '/includes/settings/functions.php';
require WPE_HEADLESS_DIR . '/includes/replacement/functions.php';
require WPE_HEADLESS_DIR . '/includes/updates/functions.php';

require WPE_HEADLESS_DIR . '/includes/class.wpe-headless.php';
require WPE_HEADLESS_DIR . '/includes/redirect/class.wpe-headless-redirect.php';
require WPE_HEADLESS_DIR . '/includes/rest/class.wpe-headless-api.php';
require WPE_HEADLESS_DIR . '/includes/settings/class.wpe-headless-constants.php';
require WPE_HEADLESS_DIR . '/includes/settings/class.wpe-headless-crypto.php';

require WPE_HEADLESS_DIR . '/includes/menus/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/admin-menus/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/replacement/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/replacement/graphql-callbacks.php';
require WPE_HEADLESS_DIR . '/includes/settings/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/updates/callbacks.php';

if ( wpe_headless_is_events_enabled() ) {
	require WPE_HEADLESS_DIR . '/includes/events/callbacks.php';
}

register_activation_hook(__FILE__, array('WPE_Headless', 'activate'));
register_deactivation_hook(__FILE__, array('WPE_Headless', 'deactivate'));

WPE_Headless::init();
