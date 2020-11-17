<?php
/**
 * Plugin Name: WP Headless
 * Plugin URI: https://somesite.com/
 * Description: Generates Headlesss and allows you to exchange them for REST API access tokens
 * Author: Will Johnston
 * Version: 0.0.1
 * Author URI: https://github.com/wjohnsto
 */

define( 'WP Headless', '0.0.1' );

/**
 * Include the plugin system.
 */
require_once( dirname( __FILE__ ) . '/class.wp-headless-constants.php' );
require_once( dirname( __FILE__ ) . '/class.wp-headless-crypto.php' );
require_once( dirname( __FILE__ ) . '/class.wp-headless-api.php' );
require_once( dirname( __FILE__ ) . '/class.wp-headless-redirect.php' );
require_once( dirname( __FILE__ ) . '/class.wp-headless.php' );

register_activation_hook(__FILE__, array('WP_Headless', 'activate'));
register_deactivation_hook(__FILE__, array('WP_Headless', 'deactivate'));
WP_Headless::init();
