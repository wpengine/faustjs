<?php
/**
 * Versioned document store functions for FaustWP.
 *
 * Documents are JSON values stored under a slug. Every write names the version
 * it was based on, and a write based on an old version is rejected instead of
 * overwriting a newer one.
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
 * Bump this when the schema in install_document_table() changes, and dbDelta()
 * updates the table on the next request.
 */
const DB_VERSION = 1;

/**
 * Option holding the installed documents table schema version.
 */
const DB_VERSION_OPTION = 'faustwp_documents_db_version';

/**
 * Collection used by the faustwp/v1/documents routes.
 *
 * The table can hold separate collections and per-user documents, but the
 * routes only use this shared collection for now.
 */
const DEFAULT_COLLECTION = 'default';

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
	if ( (int) get_option( DB_VERSION_OPTION ) === DB_VERSION ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

	if ( ! \WP_Upgrader::create_lock( 'faustwp_documents_db', 60 ) ) {
		return;
	}

	global $wpdb;

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
 * Slugs and collections are ASCII with a binary collation, so the unique key
 * is case-sensitive and short enough for older MySQL index limits.
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
			slug varchar(190) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
			version bigint(20) unsigned NOT NULL,
			data longtext NOT NULL,
			created_gmt datetime NOT NULL,
			modified_gmt datetime NOT NULL,
			modified_by bigint(20) unsigned NOT NULL DEFAULT 0,
			PRIMARY KEY  (id),
			UNIQUE KEY collection_owner_slug (collection,owner_id,slug)
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
 * @param string $slug Document slug.
 *
 * @return array|null Array with id, version, data, modified (Unix timestamp)
 *                    and modified_by (user ID, or 0 if unknown) keys, or null
 *                    if the document doesn't exist.
 */
function get_stored_document( $slug ) {
	global $wpdb;

	$table = get_document_table();
	$row   = $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->prepare(
			"SELECT id, version, data, modified_gmt, modified_by FROM {$table} WHERE collection = %s AND owner_id = 0 AND slug = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
			DEFAULT_COLLECTION,
			$slug
		)
	);

	if ( ! $row ) {
		return null;
	}

	return array(
		'id'          => (int) $row->id,
		'version'     => (int) $row->version,
		// Decode JSON objects as objects, so an empty object in the data is
		// returned as {} rather than [].
		'data'        => json_decode( $row->data ),
		'modified'    => (int) strtotime( $row->modified_gmt . ' UTC' ),
		'modified_by' => (int) $row->modified_by,
	);
}

/**
 * Get a document.
 *
 * @param string $slug Document slug.
 *
 * @return array|null Array with slug, version and data keys, or null if the document doesn't exist.
 */
function get_document( $slug ) {
	$stored = get_stored_document( $slug );
	if ( ! $stored ) {
		return null;
	}

	return array(
		'slug'    => $slug,
		'version' => $stored['version'],
		'data'    => $stored['data'],
	);
}

/**
 * Get a document's version and when and by whom it was last saved, without its data.
 *
 * @param string $slug Document slug.
 *
 * @return array|null Array with slug, version, modified (Unix timestamp) and
 *                    modified_by (user ID, or 0 if unknown) keys, or null if
 *                    the document doesn't exist.
 */
function get_document_summary( $slug ) {
	$stored = get_stored_document( $slug );
	if ( ! $stored ) {
		return null;
	}

	return array(
		'slug'        => $slug,
		'version'     => $stored['version'],
		'modified'    => $stored['modified'],
		'modified_by' => $stored['modified_by'],
	);
}

/**
 * List documents, newest first.
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
			"SELECT slug, version, modified_gmt, modified_by FROM {$table} WHERE collection = %s AND owner_id = 0 ORDER BY id DESC LIMIT %d OFFSET %d",
			DEFAULT_COLLECTION,
			$per_page,
			$offset
		)
	);
	$total = (int) $wpdb->get_var(
		$wpdb->prepare(
			"SELECT COUNT(*) FROM {$table} WHERE collection = %s AND owner_id = 0",
			DEFAULT_COLLECTION
		)
	);
	// phpcs:enable

	$documents = array();
	foreach ( (array) $rows as $row ) {
		$documents[] = array(
			'slug'        => $row->slug,
			'version'     => (int) $row->version,
			'modified'    => (int) strtotime( $row->modified_gmt . ' UTC' ),
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
 * @param string     $slug    Document slug.
 * @param array|null $current The current document, or null if it doesn't exist.
 *
 * @return WP_Error Conflict error with a 409 status.
 */
function conflict_error( $slug, $current ) {
	return new WP_Error(
		'faustwp_document_conflict',
		__( 'The document has changed since the version this write was based on.', 'faustwp' ),
		array(
			'status'   => 409,
			'slug'     => $slug,
			'version'  => $current ? $current['version'] : 0,
			'document' => $current,
		)
	);
}

/**
 * Create or update a document if it's still at the expected version.
 *
 * Use version 0 to create a document. An update only matches the row if its
 * version is still the expected one, so if two writers send the same version
 * at once, only one of them succeeds.
 *
 * @param string $slug             Document slug.
 * @param int    $expected_version The version the write is based on.
 * @param mixed  $data             New document data.
 *
 * @return array|WP_Error The saved document with a created flag, or an error.
 */
function save_document( $slug, $expected_version, $data ) {
	$encoded_data = wp_json_encode( $data );
	if ( false === $encoded_data ) {
		return new WP_Error( 'faustwp_document_invalid', __( 'The document data could not be encoded as JSON.', 'faustwp' ), array( 'status' => 400 ) );
	}

	if ( strlen( $encoded_data ) > get_max_document_bytes() ) {
		return new WP_Error( 'faustwp_document_too_large', __( 'The document is larger than the maximum size.', 'faustwp' ), array( 'status' => 413 ) );
	}

	if ( 0 === $expected_version ) {
		return create_document( $slug, $data, $encoded_data );
	}

	global $wpdb;

	$updated = $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->prepare(
			'UPDATE ' . get_document_table() . ' SET version = version + 1, data = %s, modified_gmt = %s, modified_by = %d WHERE collection = %s AND owner_id = 0 AND slug = %s AND version = %d', // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
			$encoded_data,
			current_time( 'mysql', true ),
			get_current_user_id(),
			DEFAULT_COLLECTION,
			$slug,
			$expected_version
		)
	);

	if ( false === $updated ) {
		return database_error();
	}

	if ( 1 !== $updated ) {
		// The document doesn't exist or another write changed it first.
		return conflict_error( $slug, get_document( $slug ) );
	}

	return array(
		'slug'    => $slug,
		'version' => $expected_version + 1,
		'data'    => $data,
		'created' => false,
	);
}

/**
 * Create a new document at version 1.
 *
 * The table's unique key rejects a second row for the same slug, so if two
 * requests create the same document at once, only one insert succeeds.
 *
 * @param string $slug         Document slug.
 * @param mixed  $data         Document data.
 * @param string $encoded_data Document data encoded as JSON.
 *
 * @return array|WP_Error The saved document with a created flag, or an error.
 */
function create_document( $slug, $data, $encoded_data ) {
	global $wpdb;

	$now = current_time( 'mysql', true );

	// Hide the duplicate key error; a failed insert is checked below.
	$suppress = $wpdb->suppress_errors( true );
	$inserted = $wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		get_document_table(),
		array(
			'collection'   => DEFAULT_COLLECTION,
			'owner_id'     => 0,
			'slug'         => $slug,
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
		$current = get_document( $slug );

		// If the document exists, another request created it first.
		return $current ? conflict_error( $slug, $current ) : database_error();
	}

	return array(
		'slug'    => $slug,
		'version' => 1,
		'data'    => $data,
		'created' => true,
	);
}

/**
 * Build the error returned when the database rejects a query.
 *
 * @return WP_Error Error with a 500 status.
 */
function database_error() {
	return new WP_Error( 'faustwp_document_db_error', __( 'The document could not be saved.', 'faustwp' ), array( 'status' => 500 ) );
}
