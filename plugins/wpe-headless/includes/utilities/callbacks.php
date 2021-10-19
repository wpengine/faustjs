<?php
/**
 * Utility callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Utilities;

use function WPE\FaustWP\Settings\{
	get_secret_key,
	faustwp_get_settings,
	faustwp_update_setting
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_activation_hook( FAUSTWP_FILE, __NAMESPACE__ . '\\handle_activation' );
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
function handle_activation() {
	$secret_key = get_secret_key();
	$settings   = faustwp_get_settings();

	if ( empty( $settings ) ) {
		faustwp_update_setting( 'disable_theme', '1' );
		faustwp_update_setting( 'enable_rewrites', '1' );
		faustwp_update_setting( 'enable_redirects', '1' );
	}

	if ( ! $secret_key ) {
		faustwp_update_setting( 'secret_key', wp_generate_uuid4() );
	}

	flush_rewrite_rules();
}

register_deactivation_hook( FAUSTWP_FILE, __NAMESPACE__ . '\\handle_deactivation' );
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
function handle_deactivation() {
	flush_rewrite_rules();
}
