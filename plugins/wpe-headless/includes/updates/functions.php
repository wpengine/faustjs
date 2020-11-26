<?php
/**
 * Handles communicating with the WPE product update API
 * and saving the data for WordPress to use for plugin updates.
 *
 * @package WPE_Headless\PluginUpdates
 */

namespace WPE_Headless\PluginUpdates;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use stdClass;

define( 'WPE_HEADLESS_PRODUCT_INFO_URL', 'https://wp-product-info-staging.wpesvc.net/v1/plugins' );

/**
 * Convenience function to return the plugin slug name. Ex. headless-poc/headless-poc.php
 *
 * @return string $slug The plguin slug.
 */
function my_plugin_path() {
	return plugin_basename( WPE_HEADLESS_FILE );
}

/**
 * Convenience function to return the plugin slug name. Ex. headless-poc
 *
 * @return string $slug The plguin slug.
 */
function my_slug() {
	return dirname( plugin_basename( WPE_HEADLESS_FILE ) );
}

/**
 * Checks the WPE plugin info API for new versions of the plugin
 * and returns the data required to update this plugin.
 *
 * @param object $data WordPress update object.
 *
 * @return object $data An updated object if an update exists, default object if not.
 */
function check_for_updates( $data ) {

	// No update object exists. Return early.
	if ( empty( $data ) ) {
		return $data;
	}

	$response = get_product_info();

	if ( empty( $response->requires_at_least ) || empty( $response->version ) ) {
		return $data;
	}

	$current_plugin_data = get_plugin_data( WPE_HEADLESS_FILE );
	$meets_wp_req        = version_compare( get_bloginfo( 'version' ), $response->requires_at_least, '>=' );

	// Only update the response if there's a newer version, otherwise WP shows an update notice for the same version.
	if ( $meets_wp_req && version_compare( $current_plugin_data['Version'], $response->version, '<' ) ) {
		$response->plugin                   = plugin_basename( WPE_HEADLESS_FILE );
		$data->response[ my_plugin_path() ] = $response;
	}

	return $data;
}

/**
 * Returns a custom API response for updating the plugin
 * and for displaying information about it in wp-admin.
 *
 * The `plugins_api` filter is documented in `wp-admin/includes/plugin-install.php`.
 *
 * @param string $slug The plguin slug.
 *
 * @return false|stdClass $api Plugin API arguments.
 */
function custom_plugins_api( $slug ) {

	/**
	 * Information from the product info service API.
	 *
	 * @var stdClass $product_info
	 */
	$product_info = get_product_info();

	if ( empty( $product_info ) || is_wp_error( $product_info ) ) {
		return;
	}

	$current_plugin_data = get_plugin_data( WPE_HEADLESS_FILE );
	$meets_wp_req        = version_compare( get_bloginfo( 'version' ), $product_info->requires_at_least, '>=' );

	$api                        = new stdClass();
	$api->author                = 'WP Engine';
	$api->homepage              = 'https://wpengine.com';
	$api->name                  = $product_info->name;
	$api->requires              = isset( $product_info->requires_at_least ) ? $product_info->requires_at_least : $current_plugin_data['RequiresWP'];
	$api->sections['changelog'] = isset( $product_info->sections->changelog ) ? $product_info->sections->changelog : '<h4>1.0</h4><ul><li>Initial release.</li></ul>';
	$api->slug                  = $args->slug;

	// Only pass along the update info if the requirements are met and there's actually a newer version.
	if ( $meets_wp_req && version_compare( $current_plugin_data['Version'], $product_info->version, '<' ) ) {
		$api->version       = $product_info->version;
		$api->download_link = $product_info->download_link;
	}

	return $api;
}

/**
 * Fetches and returns the plugin info api error.
 *
 * @return mixed Value set for the option.
 */
function get_api_error() {
	return get_option( 'wpe_headless_poc_product_info_api_error', false );
}

/**
 * Fetches and returns the plugin info from the WPE product info API.
 *
 * @return stdClass
 */
function get_product_info() {
	$current_plugin_data = get_plugin_data( WPE_HEADLESS_FILE );

	// Check for a cached response before making an API call.
	$response = get_transient( 'wpe_headless_poc_product_info' );

	if ( false === $response ) {
		$request_args = array(
			'timeout'    => ( ( defined( 'DOING_CRON' ) && DOING_CRON ) ? 30 : 3 ),
			'user-agent' => 'WordPress/' . get_bloginfo( 'version' ) . '; ' . get_bloginfo( 'url' ),
			'body'       => array(
				'version' => $current_plugin_data['Version'],
			),
		);

		$response = wp_remote_get( WPE_HEADLESS_PRODUCT_INFO_URL . '/headless-poc', $request_args );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

			// Save the error code so we can use it elsewhere to display messages.
			if ( is_wp_error( $response ) ) {
				update_option( 'wpe_headless_poc_product_info_api_error', $response->get_error_code(), false );
			} else {
				$response_body = json_decode( wp_remote_retrieve_body( $response ), false );
				$error_code    = ! empty( $response_body->error_code ) ? $response_body->error_code : 'unknown';
				update_option( 'wpe_headless_poc_product_info_api_error', $error_code, false );
			}

			// Cache an empty object for 5 minutes to give the product info API time to recover.
			$response = new stdClass();

			set_transient( 'wpe_headless_poc_product_info', $response, MINUTE_IN_SECONDS * 5 );

			return $response;
		}

		// Delete any existing API error codes since we have a valid API response.
		delete_option( 'wpe_headless_poc_product_info_api_error' );

		$response = json_decode( wp_remote_retrieve_body( $response ) );

		// Cache the response for 12 hours.
		set_transient( 'wpe_headless_poc_product_info', $response, HOUR_IN_SECONDS * 12 );
	}

	return $response;
}

/**
 * Shows a notice on the Plugins page when there is an
 * issue with the subscription key and/or update service.
 *
 * @param string $plugin_file Path to the plugin file relative to the plugins directory.
 * @param array  $plugin_data An array of plugin data.
 */
function show_plugin_row_notice( $plugin_file, $plugin_data ) {
	$api_error = get_option( 'wpe_headless_poc_product_info_api_error', false );

	if ( empty( $api_error ) ) {
		return;
	}

	echo '<tr class="plugin-update-tr active" id="wpe-headless-update" data-slug="wpe-headless" data-plugin="healess-poc/headless-poc.php">';
	echo '<td colspan="3" class="plugin-update">';
	echo '<div class="update-message notice inline notice-error notice-alt"><p>' . wp_kses_post( api_error_notice_text( $api_error ) ) . '</p></div>';
	echo '</td>';
	echo '</tr>';
}

/**
 * Returns the text to be displayed to the user based on the
 * error code received from the Product Info Service API.
 *
 * @param string $reason The reason/error code received the API.
 *
 * @return string
 */
function api_error_notice_text( $reason ) {
	switch ( $reason ) {
		case 'key-unknown':
			return __( 'The product you requested information for is unknown. Please contact support.', 'wpe-headless' );

		default:
			/* translators: %1$s: Link to account portal. %2$s: The text that is linked. */
			return sprintf(
				__(
					'There was an unknown error connecting to the update service. This issue could be temporary. Please contact support if this error persists.',
					'wpe-headless'
				),
				'https://my.wpengine.com/products',
				esc_html__( 'WP Engine Account Portal', 'wpe-headless' )
			);
	}
}
