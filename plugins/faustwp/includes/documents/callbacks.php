<?php
/**
 * Callbacks for the versioned document store.
 *
 * Nothing here runs unless the store is enabled with the
 * faustwp_enable_document_store filter.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Documents;

use WP_REST_Request;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', __NAMESPACE__ . '\\maybe_set_up_document_store' );
/**
 * Callback for WordPress 'init' action.
 *
 * Create or update the documents table when the store is enabled.
 */
function maybe_set_up_document_store() {
	if ( ! is_document_store_enabled() ) {
		return;
	}

	maybe_install_document_table();
}

add_filter( 'wpmu_drop_tables', __NAMESPACE__ . '\\drop_document_table_with_site' );
/**
 * Callback for WordPress 'wpmu_drop_tables' filter.
 *
 * Delete a site's documents table when the site is deleted.
 *
 * @param string[] $tables Tables to drop for the site being deleted.
 *
 * @return string[] Tables to drop.
 */
function drop_document_table_with_site( $tables ) {
	$tables[] = get_document_table();

	return $tables;
}

add_filter( 'user_has_cap', __NAMESPACE__ . '\\grant_document_capabilities_to_admins', 10, 1 );
/**
 * Callback for WordPress 'user_has_cap' filter.
 *
 * Users who can manage options can read and edit documents. Other users need
 * READ_CAPABILITY or EDIT_CAPABILITY added to their role or account.
 *
 * @param bool[] $allcaps The user's capabilities.
 *
 * @return bool[] The user's capabilities.
 */
function grant_document_capabilities_to_admins( $allcaps ) {
	if ( ! empty( $allcaps['manage_options'] ) && is_document_store_enabled() ) {
		$allcaps[ READ_CAPABILITY ] = true;
		$allcaps[ EDIT_CAPABILITY ] = true;
	}

	return $allcaps;
}

add_action( 'rest_api_init', __NAMESPACE__ . '\\register_document_routes' );
/**
 * Callback for WordPress 'rest_api_init' action.
 *
 * Register the document routes when the store is enabled.
 */
function register_document_routes() {
	if ( ! is_document_store_enabled() ) {
		return;
	}

	register_rest_route(
		'faustwp/v1',
		'/collections/(?P<collection>' . COLLECTION_PATTERN . ')/documents/(?P<id>' . ID_PATTERN . ')',
		array(
			array(
				'methods'             => 'GET',
				'callback'            => __NAMESPACE__ . '\\handle_get_document',
				'permission_callback' => __NAMESPACE__ . '\\can_read_documents',
			),
			array(
				'methods'             => 'PUT',
				'callback'            => __NAMESPACE__ . '\\handle_put_document',
				'permission_callback' => __NAMESPACE__ . '\\can_edit_documents',
				'args'                => array(
					'version' => array(
						'required'          => true,
						'type'              => 'integer',
						'minimum'           => 0,
						'validate_callback' => 'rest_validate_request_arg',
					),
					'data'    => array(
						'required'          => true,
						'validate_callback' => __NAMESPACE__ . '\\validate_document_data',
					),
				),
			),
		)
	);
}

/**
 * Permission callback for reading documents.
 *
 * @return bool True if the current user can read documents.
 */
function can_read_documents() {
	return current_user_can( READ_CAPABILITY );
}

/**
 * Permission callback for writing documents.
 *
 * Writers also need read access, because a rejected write returns the current
 * document.
 *
 * @return bool True if the current user can read and edit documents.
 */
function can_edit_documents() {
	return current_user_can( READ_CAPABILITY ) && current_user_can( EDIT_CAPABILITY );
}

/**
 * Validate callback for the document data argument.
 *
 * @param mixed $value Document data from the request body.
 *
 * @return bool True if the data is a JSON object or array.
 */
function validate_document_data( $value ) {
	return is_array( $value );
}

/**
 * Get the document data from a request.
 *
 * WordPress decodes JSON request bodies into associative arrays, which turns
 * an empty object into an empty array. The body is decoded again here with
 * objects kept as objects, so the stored data matches what was sent.
 *
 * @param WP_REST_Request $request Current request.
 *
 * @return mixed Document data.
 */
function get_request_document_data( WP_REST_Request $request ) {
	$body = json_decode( $request->get_body() );

	if ( is_object( $body ) && property_exists( $body, 'data' ) ) {
		return $body->data;
	}

	return $request->get_param( 'data' );
}

/**
 * Callback for GET faustwp/v1/collections/<collection>/documents/<id>.
 *
 * @param WP_REST_Request $request Current request.
 *
 * @return WP_REST_Response|\WP_Error The document, or a 404 error.
 */
function handle_get_document( WP_REST_Request $request ) {
	$document = get_document( $request->get_param( 'collection' ), $request->get_param( 'id' ) );

	if ( ! $document ) {
		return new \WP_Error( 'faustwp_document_not_found', __( 'Document not found.', 'faustwp' ), array( 'status' => 404 ) );
	}

	return new WP_REST_Response( $document, 200 );
}

/**
 * Callback for PUT faustwp/v1/collections/<collection>/documents/<id>.
 *
 * The body is JSON with the version the write is based on (0 to create) and
 * the new data. A write based on an old version returns a 409 error with the
 * current document.
 *
 * @param WP_REST_Request $request Current request.
 *
 * @return WP_REST_Response|\WP_Error The saved document, or an error.
 */
function handle_put_document( WP_REST_Request $request ) {
	$result = save_document(
		$request->get_param( 'collection' ),
		$request->get_param( 'id' ),
		(int) $request->get_param( 'version' ),
		get_request_document_data( $request )
	);

	if ( is_wp_error( $result ) ) {
		return $result;
	}

	$status = $result['created'] ? 201 : 200;
	unset( $result['created'] );

	return new WP_REST_Response( $result, $status );
}
