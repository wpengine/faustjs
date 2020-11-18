<?php
/**
 * Settings related callbacks.
 *
 * @package WPE_Headless\PluginUpdates
 */

namespace WPE_Headless\PluginUpdates;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'pre_set_site_transient_update_plugins', __NAMESPACE__ . '\check' );
/**
 * Checks the WPE plugin info API for new versions of the plugin
 * and returns the data required to update this plugin.
 *
 * @param object $data WordPress update object.
 *
 * @return object $data An updated object if an update exists, default object if not.
 */
function check( $data ) {
	return check_for_updates( $data );
}

add_filter( 'plugins_api', __NAMESPACE__ . '\plugins_api', 10, 3 );
/**
 * Returns a custom API response for updating the plugin
 * and for displaying information about it in wp-admin.
 *
 * The `plugins_api` filter is documented in `wp-admin/includes/plugin-install.php`.
 *
 * @param false|object|array $api The result object or array. Default false.
 * @param string             $action The type of information being requested from the Plugin Installation API.
 * @param object             $args Plugin API arguments.
 *
 * @return false|stdClass $api Plugin API arguments.
 */
function plugins_api( $api, $action, $args ) {
	if ( empty( $args->slug ) || my_slug() !== $args->slug ) {
		return $api;
	}

	/**
	 * Information from the product info service API.
	 *
	 * @var stdClass $product_info
	 */
	$custom_api = custom_plugins_api( $args->slug );

	if ( empty( $custom_api ) || is_wp_error( $custom_api ) ) {
		return $api;
	}

	return $custom_api;
}

/**
 * Checks for plugin update API errors and shows
 * a message on the Plugins page if errors exist.
 */
add_action(
	'load-plugins.php',
	function() {
		if ( empty( get_api_error() ) ) {
			return;
		}

		add_action(
			'admin_notices',
			function() {
				$plugin_basename = plugin_basename( WPE_HEADLESS_FILE );
				remove_action( "after_plugin_row_{$plugin_basename}", 'wp_plugin_update_row' );
				add_action( "after_plugin_row_{$plugin_basename}", __NAMESPACE__ . '\show_plugin_row_notice', 10, 2 );
			}
		);
	},
	0
);

/**
 * Checks for plugin update API errors and shows
 * a message on the Dashboard > Updates page if errors exist.
 */
add_action(
	'load-update-core.php',
	function() {
		$api_error = get_api_error();

		if ( empty( $api_error ) ) {
			return;
		}

		add_action(
			'admin_notices',
			function() use ( $api_error ) {
				echo wp_kses_post( sprintf( '<div class="error"><p>%s</p></div>', api_error_notice_text( $api_error ) ) );
			}
		);
	},
	0
);
