<?php
/**
 * Utility callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Utilities;

use function WPE\FaustWP\Detect_Conflicts\delete_conflicts_dismissed;
use function WPE\FaustWP\Settings\{
	get_secret_key,
	faustwp_get_settings,
	faustwp_update_setting,
	maybe_set_default_settings
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_activation_hook( FAUSTWP_FILE, __NAMESPACE__ . '\\handle_activation' );
/**
 * Callback for WordPress register_activation_hook() function.
 *
 * 1. Deactivate the WPE Headless plugin if it's active.
 * 2. Set default settings if no settings exist.
 * 3. Set secret_key if does not exist.
 * 4. Flush rewrite rules.
 *
 * @todo is flush_rewrite_rules() needed?
 *
 * @link https://developer.wordpress.org/reference/functions/register_activation_hook/
 *
 * @param bool $network_active True if plugin is network activated.
 *
 * @return void
 */
function handle_activation( $network_active ) {
	if ( is_plugin_active( 'wpe-headless/wpe-headless.php' ) ) {
		deactivate_plugins( 'wpe-headless/wpe-headless.php', true );
	}

	// Handle network activation of plugin within multisite.
	if ( $network_active ) {
		$args  = array(
			'fields' => 'ids',
		);
		$sites = get_sites( $args );

		foreach ( $sites as $site ) {
			switch_to_blog( $site );
			maybe_set_default_settings();
			restore_current_blog();
		}

		return;
	}

	maybe_set_default_settings();
}

register_deactivation_hook( FAUSTWP_FILE, __NAMESPACE__ . '\\handle_deactivation' );
/**
 * Callback for WordPress register_deactivation_hook() function.
 *
 * Clear conflict dismissals and flush rewrites on plugin deactivation.
 *
 * @todo is flush_rewrite_rules() needed?
 *
 * @link https://developer.wordpress.org/reference/functions/register_deactivation_hook/
 *
 * @return void
 */
function handle_deactivation() {
	delete_conflicts_dismissed();
	flush_rewrite_rules();
}

add_action( 'wp_initialize_site', __NAMESPACE__ . '\\handle_new_site_creation' );
/**
 * Fires when a site's initialization routine should be executed.
 *
 * @link https://developer.wordpress.org/reference/hooks/wp_initialize_site/
 *
 * @param WP_Site $new_site New site object.
 *
 * @return void
 */
function handle_new_site_creation( $new_site ) {
	switch_to_blog( $new_site->blog_id );
	maybe_set_default_settings();
	restore_current_blog();
}
