<?php
/**
 * Plugin Name: WPE Headless
 * Plugin URI: https://somesite.com/
 * Description: Generates Headlesss and allows you to exchange them for REST API access tokens
 * Author: Will Johnston
 * Version: 0.0.1
 * Author URI: https://github.com/wjohnsto
 */

define( 'WPE Headless', '0.0.1' );

/**
 * Include the plugin system.
 */
require_once( dirname( __FILE__ ) . '/class.wpe-headless-constants.php' );
require_once( dirname( __FILE__ ) . '/class.wpe-headless-crypto.php' );
require_once( dirname( __FILE__ ) . '/class.wpe-headless-api.php' );
require_once( dirname( __FILE__ ) . '/class.wpe-headless-redirect.php' );
require_once( dirname( __FILE__ ) . '/class.wpe-headless.php' );

register_activation_hook(__FILE__, array('WPE_Headless', 'activate'));
register_deactivation_hook(__FILE__, array('WPE_Headless', 'deactivate'));
WPE_Headless::init();
