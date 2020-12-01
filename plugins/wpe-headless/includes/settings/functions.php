<?php
/**
 * Settings functions.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Determine if events are enabled.
 *
 * @return bool True if events are enabled, false if else.
 */
function wpe_headless_is_events_enabled() {
	return '1' === wpe_headless_get_setting( 'events_enabled' );
}

/**
 * Get a headless setting by name.
 *
 * @param string $name    The setting name.
 * @param mixed  $default Optional setting value. Default false.
 *
 * @return mixed The setting value.
 */
function wpe_headless_get_setting( $name, $default = false ) {
	$value    = $default;
	$settings = wpe_headless_get_settings();

	if ( isset( $settings[ $name ] ) ) {
		$value = $settings[ $name ];
	}

	/**
	 * Filter 'wpe_headless_get_setting'.
	 *
	 * @param mixed  $value   The setting value.
	 * @param string $name    The setting name.
	 * @param mixed  $default Optional setting value.
	 */
	return apply_filters( 'wpe_headless_get_setting', $value, $name, $default );
}

/**
 * Update a headless setting value.
 *
 * @link https://developer.wordpress.org/reference/functions/update_option/
 *
 * @param string $name  The setting name.
 * @param mixed  $value The setting value.
 *
 * @return void
 */
function wpe_headless_update_setting( $name, $value ) {
	$settings          = wpe_headless_get_settings();
	$settings[ $name ] = $value;

	update_option( 'wpe_headless', $settings );
}

/**
 * Get all headless settings.
 *
 * @return array An array of settings.
 */
function wpe_headless_get_settings() {
	$settings = get_option( 'wpe_headless', array() );

	/**
	 * Filter 'wpe_headless_get_setting'.
	 *
	 * @param array $settings Array of plugin settings.
	 */
	return apply_filters( 'wpe_headless_get_setting', $settings );
}
