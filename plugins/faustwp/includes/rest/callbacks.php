<?php
/**
 * REST related callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\REST;

use function WPE\FaustWP\Auth\{
	get_user_from_access_token,
	get_user_from_refresh_token,
	get_user_from_authorization_code,
	generate_refresh_token,
	generate_access_token
};
use function WPE\FaustWP\Settings\get_secret_key;
use function WPE\FaustWP\Telemetry\{
	get_wp_version,
	is_wpe,
	get_anonymous_faustwp_data,
	get_anonymous_wpgraphql_content_blocks_data,
	get_telemetry_client_id
};
use function WPE\FaustWP\Blocks\handle_uploaded_blockset;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'determine_current_user', __NAMESPACE__ . '\\rest_determine_current_user', 20 );
/**
 * Callback for WordPress 'determine_current_user' filter.
 *
 * Determine the current user based on authentication token from http header.
 * Runs during GraphQL, REST and plain requests.
 *
 * @link https://developer.wordpress.org/reference/hooks/determine_current_user/
 *
 * @param int|bool $user_id User ID if one has been determined, false otherwise.
 *
 * @return int|bool User ID if one has been determined, false otherwise.
 */
function rest_determine_current_user( $user_id ) {
	if ( $user_id ) {
		return $user_id;
	}

	if ( ! isset( $_SERVER['HTTP_AUTHORIZATION'] ) ) {
		return $user_id;
	}

	$parts = explode( ' ', trim( $_SERVER['HTTP_AUTHORIZATION'] ) ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
	if ( count( $parts ) < 2 ) {
		return $user_id;
	}

	$wp_user = get_user_from_access_token( $parts[1] );
	if ( $wp_user ) {
		$user_id = $wp_user->ID;
	}

	return $user_id;
}

add_action( 'rest_api_init', __NAMESPACE__ . '\\register_rest_routes' );
/**
 * Callback for WordPress 'rest_api_init' action.
 *
 * Register the GET /faustwp/v1/telemetry endpoint.
 * Register the POST /faustwp/v1/authorize endpoint.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/
 *
 * @return void
 */
function register_rest_routes() {
	register_rest_route(
		'faustwp/v1',
		'/blockset',
		array(
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\\handle_blockset_callback',
			'permission_callback' => __NAMESPACE__ . '\\rest_blockset_permission_callback',
		)
	);

	register_rest_route(
		'faustwp/v1',
		'/telemetry',
		array(
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\\handle_rest_telemetry_callback',
			'permission_callback' => __NAMESPACE__ . '\\rest_telemetry_permission_callback',
		)
	);

	register_rest_route(
		'faustwp/v1',
		'/authorize',
		array(
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\\handle_rest_authorize_callback',
			'permission_callback' => __NAMESPACE__ . '\\rest_authorize_permission_callback',
		)
	);

	register_rest_route(
		'faustwp/v1',
		'/process_telemetry',
		array(
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\\handle_rest_process_telemetry_callback',
			'permission_callback' => __NAMESPACE__ . '\\rest_process_telemetry_permission_callback',
		)
	);

	/**
	 * Faust.js packages now use `faustwp/v1/authorize`.
	 *
	 * @deprecated
	 */
	register_rest_route(
		'wpac/v1',
		'/authorize',
		array(
			'methods'             => 'POST',
			'callback'            => __NAMESPACE__ . '\\handle_rest_authorize_callback',
			'permission_callback' => __NAMESPACE__ . '\\wpac_authorize_permission_callback',
		)
	);
}

/**
 * Callback function to handle file upload and unzip.
 *
 * @param \WP_REST_Request $request Full data about the request.
 * @return \WP_Error|WP_REST_Response
 */
function handle_blockset_callback( \WP_REST_Request $request ) {
	// Check if file is sent.
	$files = $request->get_file_params();

	if ( empty( $files['zipfile'] ) ) {
		return new \WP_Error( 'no_file', __( 'No file was sent', 'faustwp' ), array( 'status' => 400 ) );
	}

	$file = $files['zipfile'];

	// Check for upload errors.
	if ( $file['error'] ) {
		return new \WP_Error( 'upload_error', __( 'File upload error', 'faustwp' ), array( 'status' => 400 ) );
	}

	$result = handle_uploaded_blockset( $file );

	if ( is_wp_error( $result ) ) {
		return $result;
	}

	return new \WP_REST_Response( __( 'Blockset sync complete.', 'faustwp' ), 200 );
}

/**
 * Callback for WordPress register_rest_route() 'callback' parameter.
 *
 * Handle GET /faustwp/v1/telemetry response.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#endpoint-callback
 *
 * @param \WP_REST_Request $request Current \WP_REST_Request object.
 *
 * @return mixed A \WP_REST_Response, array, or \WP_Error.
 */
function handle_rest_telemetry_callback( \WP_REST_Request $request ) {
	$data = array(
		'faustwp'                  => get_anonymous_faustwp_data(),
		'wpgraphql_content_blocks' => get_anonymous_wpgraphql_content_blocks_data(),
		'is_wpe'                   => is_wpe(),
		'multisite'                => is_multisite(),
		'php_version'              => PHP_VERSION,
		'wp_version'               => get_wp_version(),
	);

	return new \WP_REST_Response( $data );
}

/**
 * Callback for WordPress register_rest_route() 'callback' parameter.
 *
 * Handle POST /faustwp/v1/process_telemetry response.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#endpoint-callback
 *
 * @param \WP_REST_Request $request Current \WP_REST_Request object.
 *
 * @return mixed A \WP_REST_Response, array, or \WP_Error.
 */
function handle_rest_process_telemetry_callback( \WP_REST_Request $request ) {
	if ( ! get_telemetry_client_id() ) {
		return new \WP_REST_Response( null, 204 );
	}

	$body = $request->get_json_params();

	$faust_plugin_data          = get_anonymous_faustwp_data();
	$content_blocks_plugin_data = get_anonymous_wpgraphql_content_blocks_data();

	$ga_tracking_endpoint = 'https://www.google-analytics.com/mp/collect';
	$ga_tracking_id       = 'G-KPVSTHK1G4';
	$ga_key               = '-SLuZb8JTbWkWcT5BD032w';

	$telemetry_data = array(
		'node_faustwp_core_version'                    => $body['node_faustwp_core_version'] ?? null,
		'node_faustwp_cli_version'                     => $body['node_faustwp_cli_version'] ?? null,
		'node_faustwp_blocks_version'                  => $body['node_faustwp_blocks_version'] ?? null,
		'node_apollo_client_version'                   => $body['node_apollo_client_version'] ?? null,
		'node_faustwp_block_editor_utils_version'      => $body['node_faustwp_block_editor_utils_version'] ?? null,
		'node_faustwp_experimental_app_router_version' => $body['node_faustwp_experimental_app_router_version'] ?? null,
		'node_version'                                 => $body['node_version'] ?? null,
		'node_next_version'                            => $body['node_next_version'] ?? null,
		'node_is_development'                          => $body['node_is_development'] ?? null,
		'command'                                      => $body['command'] ?? null,

		'setting_has_frontend_uri'                     => $faust_plugin_data['has_frontend_uri'],
		'setting_redirects_enabled'                    => $faust_plugin_data['redirects_enabled'],
		'setting_rewrites_enabled'                     => $faust_plugin_data['rewrites_enabled'],
		'setting_themes_disabled'                      => $faust_plugin_data['themes_disabled'],
		'setting_img_src_replacement_enabled'          => $faust_plugin_data['image_source_replacement_enabled'],
		'faustwp_version'                              => $faust_plugin_data['version'],

		'wpgraphql_content_blocks_version'             => $content_blocks_plugin_data['version'],

		'is_wpe'                                       => is_wpe(),
		'multisite'                                    => is_multisite(),
		'php_version'                                  => PHP_VERSION,
		'wp_version'                                   => get_wp_version(),
	);

	$ga_telemetry_url = add_query_arg(
		array(
			'measurement_id' => $ga_tracking_id,
			'api_secret'     => $ga_key,
		),
		$ga_tracking_endpoint
	);

	$telemetry_body = array(
		'client_id' => get_telemetry_client_id(),
		'events'    => array(
			array(
				'name'   => 'telemetry_event',
				'params' => $telemetry_data,
			),
		),
	);

	/**
	 * This code should be uncommented once we can accept/decline the
	 * telemetry option and an appropriate clientID is generated for the site.
	 *
	 * @TODO
	 */

	// @codingStandardsIgnoreStart
	// wp_remote_post($ga_telemetry_url, [
	// 'body' => $telemetry_body,
	// ]);
  // @codingStandardsIgnoreEnd

	return new \WP_REST_Response( array( $telemetry_body, $ga_telemetry_url ), 201 );
}

/**
 * Callback to check permissions for requests to `faustwp/v1/blockset`.
 *
 * Authorized if the 'secret_key' settings value and http header 'x-faustwp-secret' match.
 *
 * @param \WP_REST_Request $request The current \WP_REST_Request object.
 *
 * @return bool True if current user can, false if else.
 */
function rest_blockset_permission_callback( \WP_REST_Request $request ) {
	return rest_authorize_permission_callback( $request );
}

/**
 * Callback to check permissions for requests to `faustwp/v1/telemetry`.
 *
 * Authorized if the 'secret_key' settings value and http header 'x-faustwp-secret' match.
 *
 * @param \WP_REST_Request $request The current \WP_REST_Request object.
 *
 * @return bool True if current user can, false if else.
 */
function rest_telemetry_permission_callback( \WP_REST_Request $request ) {
	return rest_authorize_permission_callback( $request );
}

/**
 * Callback to check permissions for requests to `faustwp/v1/process_telemetry`.
 *
 * Authorized if the 'secret_key' settings value and http header 'x-faustwp-secret' match.
 *
 * @param \WP_REST_Request $request The current \WP_REST_Request object.
 *
 * @return bool True if current user can, false if else.
 */
function rest_process_telemetry_permission_callback( \WP_REST_Request $request ) {
	return rest_authorize_permission_callback( $request );
}

/**
 * Callback for WordPress register_rest_route() 'callback' parameter.
 *
 * Handle POST /faustwp/v1/authorize response.
 *
 * Use the 'code' (authorization code) parameter to generate a new access token.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#endpoint-callback
 *
 * @param \WP_REST_Request $request Current \WP_REST_Request object.
 *
 * @return mixed A \WP_REST_Response, array, or \WP_Error.
 */
function handle_rest_authorize_callback( \WP_REST_Request $request ) {
	$code          = trim( $request->get_param( 'code' ) );
	$refresh_token = trim( $request->get_param( 'refreshToken' ) );

	if ( ! $code && ! $refresh_token ) {
		return new \WP_Error( 'invalid_request', 'Missing authorization code or refresh token.' );
	}

	if ( $refresh_token ) {
		$user = get_user_from_refresh_token( $refresh_token );
	} else {
		$user = get_user_from_authorization_code( $code );
	}

	if ( ! $user ) {
		return new \WP_Error( 'invalid_request', 'Invalid authorization code or refresh token.' );
	}

	$refresh_token_expiration = WEEK_IN_SECONDS * 2;
	$access_token_expiration  = MINUTE_IN_SECONDS * 5;

	$access_token  = generate_access_token( $user, $access_token_expiration );
	$refresh_token = generate_refresh_token( $user, $refresh_token_expiration );

	return array(
		'accessToken'            => $access_token,
		'accessTokenExpiration'  => ( time() + $access_token_expiration ),
		'refreshToken'           => $refresh_token,
		'refreshTokenExpiration' => ( time() + $refresh_token_expiration ),
	);
}

/**
 * Callback to check permissions for requests to `faustwp/v1/authorize`.
 *
 * Authorized if the 'secret_key' settings value and http header 'x-faustwp-secret' match.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#permissions-callback
 *
 * @param \WP_REST_Request $request The current \WP_REST_Request object.
 *
 * @return bool True if current user can, false if else.
 */
function rest_authorize_permission_callback( \WP_REST_Request $request ) {
	$secret_key = get_secret_key();
	$header_key = $request->get_header( 'x-faustwp-secret' );

	if ( $secret_key && $header_key ) {
		return $secret_key === $header_key;
	}

	return false;
}

/**
 * Callback to check permissions for requests to `wpac/v1/authorize`.
 *
 * Authorized if the 'secret_key' settings value and http header 'x-wpe-headless-secret' match.
 *
 * @deprecated The `wpac/v1/authorize` route is deprecated. Use `faustwp/v1/authorize` instead.
 *
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 * @link https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#permissions-callback
 *
 * @param \WP_REST_Request $request The current \WP_REST_Request object.
 *
 * @return bool True if current user can, false if else.
 */
function wpac_authorize_permission_callback( \WP_REST_Request $request ) {
	$secret_key = get_secret_key();
	$header_key = $request->get_header( 'x-wpe-headless-secret' );

	if ( $secret_key && $header_key ) {
		return $secret_key === $header_key;
	}

	return false;
}
