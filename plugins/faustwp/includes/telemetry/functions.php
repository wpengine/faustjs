<?php
/**
 * Telemetry functions.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Telemetry;

use function WPE\FaustWP\Settings\{
	is_redirects_enabled,
	is_rewrites_enabled,
	is_themes_disabled,
	is_image_source_replacement_enabled,
	faustwp_get_setting,
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the current WordPress version.
 *
 * @return string
 */
function get_wp_version() {
	return get_bloginfo( 'version' );
}

/**
 * Checks if the current hosting environment is WP Engine.
 *
 * @return boolean
 */
function is_wpe() {
	return defined( 'WPE_APIKEY' );
}

/**
 * Returns the active theme text domain.
 *
 * @return string
 */
function get_active_theme() {
	$theme       = wp_get_theme();
	$text_domain = $theme->get( 'TextDomain' );

	return $text_domain;
}

/**
 * Returns the active theme's version.
 *
 * @return string
 */
function get_active_theme_version() {
	$theme   = wp_get_theme();
	$version = $theme->get( 'Version' );

	return $version;
}

/**
 * Returns an array of active plugin text domains with their versions.
 *
 * @return array
 */
function get_active_plugins() {
	if ( ! function_exists( 'get_plugins' ) ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
	}

	$active_plugin_versions = array();
	$plugins                = \get_plugins();
	$active_plugins         = \get_option( 'active_plugins', array() );

	foreach ( $plugins as $plugin_path => $plugin ) {
		if ( ! in_array( $plugin_path, $active_plugins ) ) {
			continue;
		}

		$active_plugin_versions[ $plugin['TextDomain'] ] = $plugin['Version'];
	}

	return $active_plugin_versions;
}

/**
 * Returns an array of active network plugin text domains with their versions.
 *
 * @return array
 */
function get_active_network_plugins() {
	if ( ! is_multisite() ) {
		return false;
	}

	$active_network_plugins = array();
	$plugins                = wp_get_active_network_plugins();
	$active_plugins         = get_site_option( 'active_sitewide_plugins', array() );

	foreach ( $plugins as $plugin_path ) {
		$plugin_base = plugin_basename( $plugin_path );

		if ( ! array_key_exists( $plugin_base, $active_plugins ) ) {
			continue;
		}

		$plugin = get_plugin_data( $plugin_path );

		$active_network_plugins[ $plugin['TextDomain'] ] = $plugin['Version'];
	}

	return $active_network_plugins;
}

/**
 * Returns the current permalink structure as set in WP settings.
 *
 * @return string
 */
function get_permalink_structure() {
	return get_option( 'permalink_structure' );
}

/**
 * Returns the current FaustWP settings while keeping identifiable information private.
 *
 * @return array
 */
function get_anonymous_faustwp_settings() {
	$anonymous_settings = array(
		'has_frontend_uri'                 => has_frontend_uri(),
		'redirects_enabled'                => is_redirects_enabled(),
		'rewrites_enabled'                 => is_rewrites_enabled(),
		'themes_disabled'                  => is_themes_disabled(),
		'image_source_replacement_enabled' => is_image_source_replacement_enabled(),
	);

	return $anonymous_settings;
}

/**
 * Checks if the frontend_uri FaustWP setting has been set.
 *
 * @return boolean
 */
function has_frontend_uri() {
	$frontend_uri = faustwp_get_setting( 'frontend_uri' );

	if ( empty( $frontend_uri ) ) {
		return false;
	}

	return true;
}
