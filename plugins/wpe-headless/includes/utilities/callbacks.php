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
 * 1. Set default settings if no settings exist.
 * 2. Set secret_key if does not exist.
 * 3. Flush rewrite rules.
 *
 * @todo is flush_rewrite_rules() needed?
 *
 * @link https://developer.wordpress.org/reference/functions/register_activation_hook/
 *
 * @return void
 */
function wpe_headless_handle_activation() {
	$secret_key = wpe_headless_get_secret_key();
	$settings   = wpe_headless_get_settings();

	if ( empty( $settings ) ) {
		wpe_headless_update_setting( 'disable_theme', '1' );
		wpe_headless_update_setting( 'enable_rewrites', '1' );
		wpe_headless_update_setting( 'enable_redirects', '1' );
	}

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
 * @todo is flush_rewrite_rules() needed?
 *
 * @link https://developer.wordpress.org/reference/functions/register_deactivation_hook/
 *
 * @return void
 */
function wpe_headless_handle_deactivation() {
	flush_rewrite_rules();
}
