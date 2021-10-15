<?php
/**
 * Plugin updates related callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Updates;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'pre_set_site_transient_update_plugins', __NAMESPACE__ . '\\check_for_plugin_updates' );
/**
 * Callback for WordPress 'pre_set_site_transient_update_plugins' filter.
 *
 * Check for plugin updates by retrieving data from the plugin update source.
 *
 * This will let WordPress know an update is available.
 *
 * @param object $data WordPress update object.
 *
 * @return object $data An updated object if an update exists, default object if not.
 */
function check_for_plugin_updates( $data ) {
	if ( empty( $data ) ) {
		return $data;
	}

	$response = get_remote_plugin_info();
	if ( empty( $response->requires_at_least ) || empty( $response->version ) ) {
		return $data;
	}

	$current_plugin_data = get_plugin_data( FAUSTWP_FILE );
	$meets_wp_req        = version_compare( get_bloginfo( 'version' ), $response->requires_at_least, '>=' );

	// Only update the response if there's a newer version, otherwise WP shows an update notice for the same version.
	if ( $meets_wp_req && version_compare( $current_plugin_data['Version'], $response->version, '<' ) ) {
		$response->plugin                = plugin_basename( FAUSTWP_FILE );
		$data->response[ FAUSTWP_PATH ] = $response;
	}

	return $data;
}

add_filter( 'plugins_api', __NAMESPACE__ . '\\custom_plugin_api_request', 10, 3 );
/**
 * Callback for WordPress 'plugins_api' filter.
 *
 * Return a custom response for this plugin from the custom endpoint.
 *
 * @link https://developer.wordpress.org/reference/hooks/plugins_api/
 *
 * @param false|object|array $api The result object or array. Default false.
 * @param string             $action The type of information being requested from the Plugin Installation API.
 * @param object             $args Plugin API arguments.
 *
 * @return false|stdClass $response Plugin API arguments.
 */
function custom_plugin_api_request( $api, $action, $args ) {
	if ( empty( $args->slug ) || FAUSTWP_SLUG !== $args->slug ) {
		return $api;
	}

	$response = faustwp_get_plugin_data();
	if ( empty( $response ) || is_wp_error( $response ) ) {
		return $api;
	}

	return $response;
}

add_action( 'admin_notices', __NAMESPACE__ . '\\delegate_plugin_row_notice' );
/**
 * Callback for WordPress 'admin_notices' action.
 *
 * Delegate actions to display an error message on the plugin table row if present.
 *
 * @link https://developer.wordpress.org/reference/hooks/admin_notices/
 *
 * @return void
 */
function delegate_plugin_row_notice() {
	$screen = get_current_screen();
	if ( 'plugins' !== $screen->id ) {
		return;
	}

	$error = get_plugin_api_error();
	if ( ! $error ) {
		return;
	}

	$plugin_basename = plugin_basename( FAUSTWP_FILE );

	remove_action( "after_plugin_row_{$plugin_basename}", 'wp_plugin_update_row' );
	add_action( "after_plugin_row_{$plugin_basename}", __NAMESPACE__ . '\\display_plugin_row_notice', 10, 2 );
}

/**
 * Callback for WordPress 'after_plugin_row_{plugin_basename}' action.
 *
 * Show a notice in the plugin table row when there is an error present.
 *
 * @param string $plugin_file Path to the plugin file relative to the plugins directory.
 * @param array  $plugin_data An array of plugin data.
 *
 * @return void
 */
function display_plugin_row_notice( $plugin_file, $plugin_data ) {
	$error = get_plugin_api_error();

	?>
	<tr class="plugin-update-tr active" id="wpe-headless-update" data-slug="wpe-headless" data-plugin="wpe-headless/wpe-headless.php">
		<td colspan="3" class="plugin-update">
			<div class="update-message notice inline notice-error notice-alt">
				<p>
					<?php echo wp_kses_post( get_api_error_text( $error ) ); ?>
				</p>
			</div>
		</td>
	</tr>
	<?php
}

add_action( 'admin_notices', __NAMESPACE__ . '\\display_update_page_notice' );
/**
 * Callback for WordPress 'admin_notices' action.
 *
 * Display an error notice on the "WordPress Updates" page if present.
 *
 * @link https://developer.wordpress.org/reference/hooks/admin_notices/
 *
 * @return void
 */
function display_update_page_notice() {
	$screen = get_current_screen();
	if ( 'update-core' !== $screen->id ) {
		return;
	}

	$error = get_plugin_api_error();
	if ( ! $error ) {
		return;
	}

	?>
		<div class="error">
			<p>
				<?php echo wp_kses_post( get_api_error_text( $error ) ); ?>
			</p>
		</div>
	<?php
}
