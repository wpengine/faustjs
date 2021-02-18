<?php
/**
 * Plugin Name: WPEngine Content Model
 * Plugin URI: https://wpengine.com/
 * Description: Plugin for content modeling in WordPress.
 * Author: WPEngine
 * Author URI: https://wpengine.com/
 * Text Domain: wpe-content-model
 * Domain Path: /languages
 * Version: 0.1.0
 *
 * @package WPE_Content_Model
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPE_CONTENT_MODEL_FILE', __FILE__ );
define( 'WPE_CONTENT_MODEL_DIR', __DIR__ );
define( 'WPE_CONTENT_MODEL_URL', plugin_dir_url( __FILE__ ) );
define( 'WPE_CONTENT_MODEL_PATH', plugin_basename( WPE_CONTENT_MODEL_FILE ) );
define( 'WPE_CONTENT_MODEL_SLUG', dirname( plugin_basename( WPE_CONTENT_MODEL_FILE ) ) );

add_action( 'plugins_loaded', 'wpe_content_model_loader' );
/**
 * Bootstraps the plugin.
 */
function wpe_content_model_loader(): void {
	require_once __DIR__ . '/includes/settings/settings-callbacks.php';
	require_once __DIR__ . '/includes/content-registration/custom-post-types-registration.php';
}
