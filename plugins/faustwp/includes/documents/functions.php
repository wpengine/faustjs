<?php
/**
 * Versioned document store functions for FaustWP.
 *
 * Documents are JSON values grouped into collections, each with an ID that's
 * unique within its collection. Every write names the version it was based
 * on, and a write based on an old version is rejected instead of overwriting
 * a newer one.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Documents;

use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Version of the documents table schema.
 *
 * Bump this when the schema in install_document_table() changes, so dbDelta()
 * updates the table on the next request.
 */
const DB_VERSION = 1;

/**
 * Option holding the installed documents table schema version.
 */
const DB_VERSION_OPTION = 'faustwp_documents_db_version';

/**
 * Pattern for collection names: lowercase letters, numbers and hyphens.
 */
const COLLECTION_PATTERN = '[a-z0-9-]{1,64}';

/**
 * Pattern for document IDs: lowercase letters, numbers and hyphens.
 */
const ID_PATTERN = '[a-z0-9-]{1,190}';

/**
 * Capability needed to read documents.
 */
const READ_CAPABILITY = 'read_faustwp_documents';

/**
 * Capability needed to create and update documents.
 */
const EDIT_CAPABILITY = 'edit_faustwp_documents';

/**
 * Determine if the document store is enabled.
 *
 * The store is off by default. Enable it with:
 * add_filter( 'faustwp_enable_document_store', '__return_true' );
 *
 * @return bool True if the document store is enabled.
 */
function is_document_store_enabled() {
	return (bool) apply_filters( 'faustwp_enable_document_store', false );
}

/**
 * Get the largest document, in bytes of encoded JSON, the store accepts.
 *
 * @return int Maximum size in bytes.
 */
function get_max_document_bytes() {
	return (int) apply_filters( 'faustwp_document_max_bytes', 100 * KB_IN_BYTES );
}

/**
 * Get the name of the documents table for the current site.
 *
 * @return string Table name.
 */
function get_document_table() {
	global $wpdb;

	return $wpdb->prefix . 'faustwp_documents';
}

/**
 * Create or update the documents table if its schema is out of date.
 *
 * Runs on the first request after the store is enabled or the schema changes.
 * The upgrader lock keeps concurrent requests from running dbDelta() at once.
 *
 * @return void
 */
function maybe_install_document_table() {
	global $wpdb;

	if ( (int) get_option( DB_VERSION_OPTION ) === DB_VERSION ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

	if ( ! \WP_Upgrader::create_lock( 'faustwp_documents_db', 60 ) ) {
		return;
	}

	install_document_table();

	// Leave the version unrecorded if dbDelta() failed, so the next request retries.
	if ( '' === $wpdb->last_error ) {
		update_option( DB_VERSION_OPTION, DB_VERSION, true );
	}

	\WP_Upgrader::release_lock( 'faustwp_documents_db' );
}

/**
 * Create or update the documents table.
 *
 * Collections and document IDs are ASCII with a binary collation, so the
 * unique key is case-sensitive and short enough for older MySQL index limits.
 * The table can also hold per-user documents, but the routes only use shared
 * documents (owner_id 0) for now.
 *
 * @return void
 */
function install_document_table() {
	global $wpdb;

	$table           = get_document_table();
	$charset_collate = $wpdb->get_charset_collate();

	dbDelta(
		"CREATE TABLE {$table} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			collection varchar(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
			owner_id bigint(20) unsigned NOT NULL DEFAULT 0,
			document_id varchar(190) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
			version bigint(20) unsigned NOT NULL,
			data longtext NOT NULL,
			created_gmt datetime NOT NULL,
			modified_gmt datetime NOT NULL,
			modified_by bigint(20) unsigned NOT NULL DEFAULT 0,
			PRIMARY KEY  (id),
			UNIQUE KEY collection_owner_document (collection,owner_id,document_id)
		) {$charset_collate};"
	);
}

/**
 * Delete the documents table and its schema version for the current site.
 *
 * Called from uninstall.php.
 *
 * @return void
 */
function uninstall_document_table() {
	global $wpdb;

	$wpdb->query( 'DROP TABLE IF EXISTS ' . get_document_table() ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.NotPrepared
	delete_option( DB_VERSION_OPTION );
}

/**
 * Read a document row.
 *
 * Reads straight from the database, so the version compared during a write is
 * the version that's actually stored.
 *
 * @param string $collection Collection name.
 * @param string $id         Document ID.
 *
 * @return object|null Table row, or null if the document doesn't exist.
 */
function get_document_row( $collection, $id ) {
	global $wpdb;

	$table = get_document_table();

	return $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->prepare(
			"SELECT * FROM {$table} WHERE collection = %s AND owner_id = 0 AND document_id = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
			$collection,
			$id
		)
	);
}

/**
 * Format a stored date as an ISO 8601 UTC timestamp.
 *
 * @param string $gmt Date in MySQL format, in UTC.
 *
 * @return string Timestamp such as 2026-10-20T15:04:05Z.
 */
function format_document_date( $gmt ) {
	return gmdate( 'Y-m-d\TH:i:s\Z', (int) strtotime( $gmt . ' UTC' ) );
}

/**
 * Format a table row as a document.
 *
 * @param object $row Table row.
 *
 * @return array Array with collection, id, version, data, created and modified keys.
 */
function format_document( $row ) {
	return array(
		'collection' => $row->collection,
		'id'         => $row->document_id,
		'version'    => (int) $row->version,
		// Decode JSON objects as objects, so an empty object in the data is
		// returned as {} rather than [].
		'data'       => json_decode( $row->data ),
		'created'    => format_document_date( $row->created_gmt ),
		'modified'   => format_document_date( $row->modified_gmt ),
	);
}

/**
 * Get a document.
 *
 * @param string $collection Collection name.
 * @param string $id         Document ID.
 *
 * @return array|null Document as returned by format_document(), or null if it
 *                    doesn't exist.
 */
function get_document( $collection, $id ) {
	$row = get_document_row( $collection, $id );

	return $row ? format_document( $row ) : null;
}

/**
 * Get a document's version and when and by whom it was last saved, without its data.
 *
 * @param string $collection Collection name.
 * @param string $id         Document ID.
 *
 * @return array|null Array with collection, id, version, modified (ISO 8601)
 *                    and modified_by (user ID, or 0 if unknown) keys, or null
 *                    if the document doesn't exist.
 */
function get_document_summary( $collection, $id ) {
	$row = get_document_row( $collection, $id );
	if ( ! $row ) {
		return null;
	}

	return array(
		'collection'  => $collection,
		'id'          => $id,
		'version'     => (int) $row->version,
		'modified'    => format_document_date( $row->modified_gmt ),
		'modified_by' => (int) $row->modified_by,
	);
}

/**
 * List the documents in a collection, newest first.
 *
 * @param string $collection Collection name.
 * @param int    $limit      Maximum number of documents to return.
 * @param string $cursor     Cursor from a previous call's next_cursor, or an
 *                           empty string for the first page.
 *
 * @return array Array with documents (as returned by format_document()) and
 *               next_cursor (string, or null on the last page) keys.
 */
function query_documents( $collection, $limit, $cursor = '' ) {
	global $wpdb;

	$table = get_document_table();
	$limit = max( 1, (int) $limit );
	// The cursor is the table ID of the last document on the previous page.
	$before = '' === $cursor ? PHP_INT_MAX : (int) $cursor;

	$rows = $wpdb->get_results( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->prepare(
			"SELECT * FROM {$table} WHERE collection = %s AND owner_id = 0 AND id < %d ORDER BY id DESC LIMIT %d", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
			$collection,
			$before,
			$limit + 1
		)
	);

	$rows      = (array) $rows;
	$has_more  = count( $rows ) > $limit;
	$rows      = array_slice( $rows, 0, $limit );
	$last      = end( $rows );
	$documents = array_map( __NAMESPACE__ . '\\format_document', $rows );

	return array(
		'documents'   => $documents,
		'next_cursor' => $has_more && $last ? (string) $last->id : null,
	);
}

/**
 * List documents in every collection, newest first.
 *
 * @param int $page     Page number, starting at 1.
 * @param int $per_page Documents per page.
 *
 * @return array Array with documents (summaries as returned by
 *               get_document_summary()) and total_pages keys.
 */
function list_documents( $page = 1, $per_page = 20 ) {
	global $wpdb;

	$table    = get_document_table();
	$per_page = max( 1, (int) $per_page );
	$offset   = ( max( 1, (int) $page ) - 1 ) * $per_page;

	// phpcs:disable WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	$rows  = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT collection, document_id, version, modified_gmt, modified_by FROM {$table} WHERE owner_id = 0 ORDER BY id DESC LIMIT %d OFFSET %d",
			$per_page,
			$offset
		)
	);
	$total = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$table} WHERE owner_id = 0" );
	// phpcs:enable

	$documents = array();
	foreach ( (array) $rows as $row ) {
		$documents[] = array(
			'collection'  => $row->collection,
			'id'          => $row->document_id,
			'version'     => (int) $row->version,
			'modified'    => format_document_date( $row->modified_gmt ),
			'modified_by' => (int) $row->modified_by,
		);
	}

	return array(
		'documents'   => $documents,
		'total_pages' => (int) ceil( $total / $per_page ),
	);
}

/**
 * Build the error returned when a write is based on an old version.
 *
 * @param string     $collection Collection name.
 * @param string     $id         Document ID.
 * @param array|null $current    The current document, or null if it doesn't exist.
 *
 * @return WP_Error Conflict error with a 409 status.
 */
function conflict_error( $collection, $id, $current ) {
	return new WP_Error(
		'faustwp_document_conflict',
		__( 'The document has changed since the version this write was based on.', 'faustwp' ),
		array(
			'status'     => 409,
			'collection' => $collection,
			'id'         => $id,
			'version'    => $current ? $current['version'] : 0,
			'document'   => $current,
		)
	);
}

/**
 * Build the error returned when a document doesn't exist.
 *
 * @return WP_Error Error with a 404 status.
 */
function not_found_error() {
	return new WP_Error( 'faustwp_document_not_found', __( 'Document not found.', 'faustwp' ), array( 'status' => 404 ) );
}

/**
 * Build the error returned when the database rejects a query.
 *
 * @return WP_Error Error with a 500 status.
 */
function database_error() {
	return new WP_Error( 'faustwp_document_db_error', __( 'The document could not be saved.', 'faustwp' ), array( 'status' => 500 ) );
}

/**
 * Encode document data as JSON and check its size.
 *
 * @param mixed $data Document data.
 *
 * @return string|WP_Error JSON string, or an error.
 */
function encode_document_data( $data ) {
	$encoded = wp_json_encode( $data );
	if ( false === $encoded ) {
		return new WP_Error( 'faustwp_document_invalid', __( 'The document data could not be encoded as JSON.', 'faustwp' ), array( 'status' => 400 ) );
	}

	if ( strlen( $encoded ) > get_max_document_bytes() ) {
		return new WP_Error( 'faustwp_document_too_large', __( 'The document is larger than the maximum size.', 'faustwp' ), array( 'status' => 413 ) );
	}

	return $encoded;
}

/**
 * Create or update a document if it's still at the expected version.
 *
 * Use version 0 to create a document. An update only matches the row if its
 * version is still the expected one, so if two writers send the same version
 * at once, only one of them succeeds.
 *
 * Fires faustwp_document_saved after a successful write.
 *
 * @param string $collection       Collection name.
 * @param string $id               Document ID.
 * @param int    $expected_version The version the write is based on.
 * @param mixed  $data             New document data.
 *
 * @return array|WP_Error The saved document with a created flag, or an error.
 */
function save_document( $collection, $id, $expected_version, $data ) {
	$encoded_data = encode_document_data( $data );
	if ( is_wp_error( $encoded_data ) ) {
		return $encoded_data;
	}

	$result = 0 === $expected_version
		? create_document( $collection, $id, $encoded_data )
		: update_document( $collection, $id, $expected_version, $encoded_data );

	if ( is_wp_error( $result ) ) {
		return $result;
	}

	$document = array(
		'collection' => $collection,
		'id'         => $id,
		'version'    => $result['version'],
		'data'       => $data,
		'created'    => format_document_date( $result['created_gmt'] ),
		'modified'   => format_document_date( $result['modified_gmt'] ),
	);

	/**
	 * Fires after a document is created or updated.
	 *
	 * @param array $document The saved document.
	 * @param bool  $created  True if the document was created.
	 */
	do_action( 'faustwp_document_saved', $document, 1 === $result['version'] );

	return $document + array( 'is_new' => 1 === $result['version'] );
}

/**
 * Update a document if it's still at the expected version.
 *
 * @param string $collection       Collection name.
 * @param string $id               Document ID.
 * @param int    $expected_version The version the write is based on.
 * @param string $encoded_data     Document data encoded as JSON.
 *
 * @return array|WP_Error Array with version, created_gmt and modified_gmt keys, or an error.
 */
function update_document( $collection, $id, $expected_version, $encoded_data ) {
	global $wpdb;

	$table = get_document_table();
	$now   = current_time( 'mysql', true );

	// phpcs:disable WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	$updated = $wpdb->query(
		$wpdb->prepare(
			"UPDATE {$table} SET version = version + 1, data = %s, modified_gmt = %s, modified_by = %d WHERE collection = %s AND owner_id = 0 AND document_id = %s AND version = %d",
			$encoded_data,
			$now,
			get_current_user_id(),
			$collection,
			$id,
			$expected_version
		)
	);

	if ( false === $updated ) {
		return database_error();
	}

	if ( 1 !== $updated ) {
		// The document doesn't exist or another write changed it first.
		return conflict_error( $collection, $id, get_document( $collection, $id ) );
	}

	// The creation date never changes, so reading it after the update is safe.
	$created_gmt = $wpdb->get_var(
		$wpdb->prepare(
			"SELECT created_gmt FROM {$table} WHERE collection = %s AND owner_id = 0 AND document_id = %s",
			$collection,
			$id
		)
	);
	// phpcs:enable

	return array(
		'version'      => $expected_version + 1,
		'created_gmt'  => (string) $created_gmt,
		'modified_gmt' => $now,
	);
}

/**
 * Create a new document at version 1.
 *
 * The table's unique key rejects a second row for the same document, so if
 * two requests create it at once, only one insert succeeds.
 *
 * @param string $collection   Collection name.
 * @param string $id           Document ID.
 * @param string $encoded_data Document data encoded as JSON.
 *
 * @return array|WP_Error Array with version, created_gmt and modified_gmt keys, or an error.
 */
function create_document( $collection, $id, $encoded_data ) {
	global $wpdb;

	$now = current_time( 'mysql', true );

	// Hide the duplicate key error; a failed insert is checked below.
	$suppress = $wpdb->suppress_errors( true );
	$inserted = $wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		get_document_table(),
		array(
			'collection'   => $collection,
			'owner_id'     => 0,
			'document_id'  => $id,
			'version'      => 1,
			'data'         => $encoded_data,
			'created_gmt'  => $now,
			'modified_gmt' => $now,
			'modified_by'  => get_current_user_id(),
		),
		array( '%s', '%d', '%s', '%d', '%s', '%s', '%s', '%d' )
	);
	$wpdb->suppress_errors( $suppress );

	if ( ! $inserted ) {
		$current = get_document( $collection, $id );

		// If the document exists, another request created it first.
		return $current ? conflict_error( $collection, $id, $current ) : database_error();
	}

	return array(
		'version'      => 1,
		'created_gmt'  => $now,
		'modified_gmt' => $now,
	);
}

/**
 * Create a document with a generated ID.
 *
 * IDs are 20 random lowercase hexadecimal characters. A clash is retried with
 * a new ID.
 *
 * @param string $collection Collection name.
 * @param mixed  $data       Document data.
 *
 * @return array|WP_Error The saved document, or an error.
 */
function add_document( $collection, $data ) {
	for ( $attempt = 0; $attempt < 3; $attempt++ ) {
		$result = save_document( $collection, bin2hex( random_bytes( 10 ) ), 0, $data );
		if ( ! is_wp_error( $result ) || 'faustwp_document_conflict' !== $result->get_error_code() ) {
			return $result;
		}
	}

	return database_error();
}

/**
 * Delete a document if it's still at the expected version.
 *
 * Fires faustwp_document_deleted after a successful delete.
 *
 * @param string $collection       Collection name.
 * @param string $id               Document ID.
 * @param int    $expected_version The version the delete is based on.
 *
 * @return array|WP_Error The deleted document, or an error.
 */
function delete_document( $collection, $id, $expected_version ) {
	global $wpdb;

	$previous = get_document( $collection, $id );
	if ( ! $previous ) {
		return not_found_error();
	}

	if ( $previous['version'] !== $expected_version ) {
		return conflict_error( $collection, $id, $previous );
	}

	$deleted = $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->prepare(
			'DELETE FROM ' . get_document_table() . ' WHERE collection = %s AND owner_id = 0 AND document_id = %s AND version = %d', // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
			$collection,
			$id,
			$expected_version
		)
	);

	if ( false === $deleted ) {
		return database_error();
	}

	if ( 1 !== $deleted ) {
		// Another write changed or deleted the document first.
		$current = get_document( $collection, $id );

		return $current ? conflict_error( $collection, $id, $current ) : not_found_error();
	}

	/**
	 * Fires after a document is deleted.
	 *
	 * @param array $previous The document as it was before it was deleted.
	 */
	do_action( 'faustwp_document_deleted', $previous );

	return $previous;
}
