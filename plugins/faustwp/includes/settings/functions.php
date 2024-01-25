<?php
/**
 * Settings functions.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Settings;

use function WPE\FaustWP\Telemetry\generate_telemetry_client_id;
use function WPE\FaustWP\Telemetry\get_telemetry_client_id;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Determine if redirects are enabled.
 *
 * @return bool True if redirects are enabled, false if else.
 */
function is_redirects_enabled() {
	return '1' === faustwp_get_setting( 'enable_redirects' );
}

/**
 * Determine if rewrites are enabled.
 *
 * @return bool True if rewrites are enabled, false if else.
 */
function is_rewrites_enabled() {
	return '1' === faustwp_get_setting( 'enable_rewrites' );
}

/**
 * Determines if posts and category URLs should link to the WP site.
 *
 * @return bool
 */
function use_wp_domain_for_post_and_category_urls() {
	return ! is_rewrites_enabled();
}

/**
 * Determine if themes are disabled.
 *
 * @return bool True if themes are disabled, false if else.
 */
function is_themes_disabled() {
	return '1' === faustwp_get_setting( 'disable_theme' );
}

/**
 * Determine if sourcing images from WP domain is enabled.
 *
 * @return bool True if image sources from WP are enabled, false if else.
 */
function is_image_source_replacement_enabled() {
	return '1' === faustwp_get_setting( 'enable_image_source' );
}

/**
 * Determine if sourcing images from WP domain is enabled.
 *
 * @return bool True if image sources from WP are enabled, false if else.
 */
function use_wp_domain_for_media() {
	return is_image_source_replacement_enabled();
}

/**
 * Determine if Faust telemetry is enabled.
 *
 * @return bool True if telemetry is enabled, false if else.
 */
function is_telemetry_enabled() {
	return '1' === faustwp_get_setting( 'enable_telemetry' );
}

/**
 * Get the secret key setting.
 *
 * @return string The secret key.
 */
function get_secret_key() {
	return faustwp_get_setting( 'secret_key', '' );
}

/**
 * Get a Faust setting by name.
 *
 * @param string $name    The setting name.
 * @param mixed  $default Optional setting value. Default false.
 *
 * @return mixed The setting value.
 */
function faustwp_get_setting( $name, $default = false ) {
	$value    = $default;
	$settings = faustwp_get_settings();

	if ( isset( $settings[ $name ] ) ) {
		$value = $settings[ $name ];
	}

	/**
	 * Filter 'faustwp_get_setting'.
	 *
	 * @param mixed  $value   The setting value.
	 * @param string $name    The setting name.
	 * @param mixed  $default Optional setting value.
	 */
	return apply_filters( 'faustwp_get_setting', $value, $name, $default );
}

/**
 * Update a Faust setting value.
 *
 * @link https://developer.wordpress.org/reference/functions/update_option/
 *
 * @param string $name  The setting name.
 * @param mixed  $value The setting value.
 *
 * @return void
 */
function faustwp_update_setting( $name, $value ) {
	$settings          = faustwp_get_settings();
	$settings[ $name ] = $value;

	update_option( 'faustwp_settings', $settings );
}

/**
 * Get all Faust settings.
 *
 * @return array An array of settings.
 */
function faustwp_get_settings() {
	$settings = get_option( 'faustwp_settings', array() );

	/**
	 * Filter 'faustwp_get_settings'.
	 *
	 * @param array $settings Array of plugin settings.
	 */
	return apply_filters( 'faustwp_get_settings', $settings );
}

/**
 * Applies the default settings to a site if settings don't already exist.
 *
 * @return void
 */
function maybe_set_default_settings() {
	$secret_key          = get_secret_key();
	$settings            = faustwp_get_settings();
	$telemetry_client_id = get_telemetry_client_id();

	if ( empty( $settings ) ) {
		faustwp_update_setting( 'disable_theme', '0' );
		faustwp_update_setting( 'enable_rewrites', '1' );
		faustwp_update_setting( 'enable_redirects', '1' );

		// Force WP to regenerate rewrite rules without calling flush_rewrite_rules which breaks
		// things when used inside of `switch_to_blog()`.
		if ( is_multisite() ) {
			delete_option( 'rewrite_rules' );
		}
	}

	if ( ! $secret_key ) {
		faustwp_update_setting( 'secret_key', wp_generate_uuid4() );
	}

	if ( ! $telemetry_client_id ) {
		generate_telemetry_client_id();
	}
}

/**
 * Get the contents of an SVG icon.
 *
 * @param string $icon Filename of the SVG without the .svg extension.
 * @return string The SVG icon contents or empty string if the icon file does not exist.
 */
function get_icon( $icon ) {
	$path = __DIR__ . '/assets/icons/' . $icon . '.svg';

	if ( file_exists( $path ) ) {
		return file_get_contents( $path ); //phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	}

	return '';
}

