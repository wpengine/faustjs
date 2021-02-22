<?php
/**
 * WordPress unit tests bootstrap file.
 *
 * @package WPE_Content_Model
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

require_once $_tests_dir . '/includes/functions.php';

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );
/**
 * Callback for WordPress 'muplugins_loaded' action.
 *
 * Manually load the plugin being tested.
 *
 * @return void
 */
function _manually_load_plugin() {
	require dirname( dirname( __FILE__ ) ) . '/wpe-content-model.php';
	require_once WP_CONTENT_DIR . '/plugins/wp-graphql/wp-graphql.php';
}

require $_tests_dir . '/includes/bootstrap.php';
