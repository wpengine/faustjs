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
	faustwp_update_setting,
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
 * Returns the current FaustWP settings while keeping identifiable information private.
 *
 * @return array
 */
function get_anonymous_faustwp_data() {
	$anonymous_data = array(
		'version'                          => get_plugin_version(),
		'has_frontend_uri'                 => has_frontend_uri(),
		'redirects_enabled'                => is_redirects_enabled(),
		'rewrites_enabled'                 => is_rewrites_enabled(),
		'themes_disabled'                  => is_themes_disabled(),
		'image_source_replacement_enabled' => is_image_source_replacement_enabled(),
	);

	return $anonymous_data;
}

/**
 * Returns the current WPGraphQL Content Blocks settings while keeping identifiable information private.
 *
 * @return array
 */
function get_anonymous_wpgraphql_content_blocks_data() {
	$anonymous_data = array(
		'version' => get_wpgraphql_content_blocks_plugin_version(),
	);

	return $anonymous_data;
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

/**
 * Returns the FaustWP plugin version.
 *
 * @return string
 */
function get_plugin_version() {
	$file_data = get_file_data( FAUSTWP_FILE, array( 'Version' ) );
	$version   = $file_data[0];

	return $version;
}

/**
 * Returns the WPGraphql Content Blocks plugin version.
 *
 * @return null|string
 */
function get_wpgraphql_content_blocks_plugin_version() {
	return defined( 'WPGRAPHQL_CONTENT_BLOCKS_VERSION' ) ? WPGRAPHQL_CONTENT_BLOCKS_VERSION : null;
}

/**
 * Returns the anonymous client id for this site that has opted in for telemetry.
 *
 * @return string
 */
function get_telemetry_client_id(): string {
	// Use the default fallback param to generate and save the uuid if not already saved.
	$id = faustwp_get_setting( 'telemetry_client_id', false );
	if ( empty( $id ) ) {
		$id = generate_telemetry_client_id();
	}

	return $id;
}

/**
 * Generates a random uuidv4 and saves it for use with telemetry collection.
 *
 * @return string
 */
function generate_telemetry_client_id(): string {
	$id = wp_generate_uuid4();
	faustwp_update_setting( 'telemetry_client_id', $id );
	return $id;
}
