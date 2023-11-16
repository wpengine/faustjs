<?php
/**
 * WordPress unit tests bootstrap file.
 *
 * @package FaustWP
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );
$_load_patchwork = getenv( 'LOAD_PATCHWORK' );

define( 'WP_TEST_PLUGINS_DIR', '/var/www/html/wp-content/plugins' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

if ( $_load_patchwork ) {
	require_once __DIR__ . '/../vendor/antecedent/patchwork/Patchwork.php';
}

require_once $_tests_dir . '/includes/functions.php';


tests_add_filter( 'wp_loaded', '_output_wp_version' );
function _output_wp_version() {
	echo "Running on WordPress " . get_bloginfo('version') . "...\n";
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );
/**
 * Callback for WordPress 'muplugins_loaded' action.
 *
 * Manually load the plugin being tested.
 *
 * @return void
 */
function _manually_load_plugin() {
	require dirname( dirname( __FILE__ ) ) . '/faustwp.php';
	
	// Load WP-GraphQL
	require_once WP_TEST_PLUGINS_DIR . '/wp-graphql/wp-graphql.php';
}

require $_tests_dir . '/includes/bootstrap.php';
