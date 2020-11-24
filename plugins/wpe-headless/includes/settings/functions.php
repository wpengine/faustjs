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
 * @param string  $name    The setting name.
 * @param boolean $default Optional setting value.
 *
 * @return mixed The setting value.
 */
function wpe_headless_get_setting( $name, $default = false ) {
	$value    = $default;
	$settings = wpe_headless_get_settings();

	if ( isset( $settings[ $name ] ) ) {
		$value = $settings[ $name ];
	}

	return $value;
}

/**
 * Get all headless settings.
 *
 * @return array An array of settings.
 */
function wpe_headless_get_settings() {
	return get_option( 'wpe_headless', array() );
}
