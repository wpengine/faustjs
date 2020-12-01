<?php
/**
 * Utility callbacks.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_activation_hook( WPE_HEADLESS_FILE, 'wpe_headless_handle_activation' );
/**
 * Callback for WordPress register_activation_hook() function.
 *
 * Set the secret key and flush rewrite rules.
 *
 * @link https://developer.wordpress.org/reference/functions/register_activation_hook/
 *
 * @return void
 */
function wpe_headless_handle_activation() {
	$secret_key = wpe_headless_get_setting( 'secret_key', '' );

	if ( ! $secret_key ) {
		wpe_headless_update_setting( 'secret_key', wp_generate_uuid4() );
	}

	flush_rewrite_rules();
}

register_deactivation_hook( WPE_HEADLESS_FILE, 'wpe_headless_handle_deactivation' );
/**
 * Callback for WordPress register_deactivation_hook() function.
 *
 * Flush rewrite rules on plugin deactivation.
 *
 * @link https://developer.wordpress.org/reference/functions/register_deactivation_hook/
 *
 * @return void
 */
function wpe_headless_handle_deactivation() {
	flush_rewrite_rules();
}
