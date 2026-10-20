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
 * The post type that stores documents.
 */
const POST_TYPE = 'faustwp_document';

/**
 * The post meta key holding a document's version and data.
 *
 * The version and data share one meta row so they always change together, and
 * a write can compare and replace them in a single UPDATE.
 */
const META_KEY = '_faustwp_document';

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
 * Register the post type that stores documents.
 *
 * The post type has no admin UI and isn't exposed through the core REST API,
 * WPGraphQL, search, sitemaps or front-end URLs. Documents are only reachable
 * through the faustwp/v1/documents routes.
 *
 * Its capabilities collapse to READ_CAPABILITY and EDIT_CAPABILITY, so access
 * can be granted to a role or user without granting anything else.
 */
function register_document_post_type() {
	register_post_type(
		POST_TYPE,
		array(
			'label'               => __( 'Faust Documents', 'faustwp' ),
			'public'              => false,
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'show_ui'             => false,
			'show_in_menu'        => false,
			'show_in_nav_menus'   => false,
			'show_in_rest'        => false,
			'show_in_graphql'     => false,
			'rewrite'             => false,
			'query_var'           => false,
			'can_export'          => false,
			'supports'            => array( 'title' ),
			'map_meta_cap'        => true,
			'capabilities'        => array(
				'edit_post'              => 'edit_faustwp_document',
				'read_post'              => 'read_faustwp_document',
				'delete_post'            => 'delete_faustwp_document',
				'read'                   => READ_CAPABILITY,
				'read_private_posts'     => READ_CAPABILITY,
				'create_posts'           => EDIT_CAPABILITY,
				'edit_posts'             => EDIT_CAPABILITY,
				'edit_others_posts'      => EDIT_CAPABILITY,
				'edit_private_posts'     => EDIT_CAPABILITY,
				'edit_published_posts'   => EDIT_CAPABILITY,
				'publish_posts'          => EDIT_CAPABILITY,
				'delete_posts'           => EDIT_CAPABILITY,
				'delete_others_posts'    => EDIT_CAPABILITY,
				'delete_private_posts'   => EDIT_CAPABILITY,
				'delete_published_posts' => EDIT_CAPABILITY,
			),
		)
	);
}

/**
 * Find the post that stores a document.
 *
 * If a race created more than one post for the same slug, the oldest one wins.
 *
 * @param string $slug Document slug.
 *
 * @return int Post ID, or 0 if the document doesn't exist.
 */
function get_document_post_id( $slug ) {
	$posts = get_posts(
		array(
			'post_type'              => POST_TYPE,
			'post_status'            => 'private',
			'name'                   => $slug,
			'orderby'                => 'ID',
			'order'                  => 'ASC',
			'posts_per_page'         => 1,
			'fields'                 => 'ids',
			'no_found_rows'          => true,
			'suppress_filters'       => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		)
	);

	return $posts ? (int) $posts[0] : 0;
}

/**
 * Read the stored version and data for a document post.
 *
 * Reads the meta row straight from the database rather than the object cache,
 * so the value compared during a write is the value that's actually stored.
 *
 * @param int $post_id Post ID.
 *
 * @return array|null Array with meta_id, raw, version and data keys, or null if missing.
 */
function get_stored_document( $post_id ) {
	global $wpdb;

	$row = $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->prepare(
			"SELECT meta_id, meta_value FROM {$wpdb->postmeta} WHERE post_id = %d AND meta_key = %s ORDER BY meta_id ASC LIMIT 1",
			$post_id,
			META_KEY
		)
	);

	if ( ! $row ) {
		return null;
	}

	// Decode JSON objects as objects, so an empty object in the data is
	// returned as {} rather than [].
	$stored = json_decode( $row->meta_value );
	if ( ! is_object( $stored ) || ! isset( $stored->version ) || ! property_exists( $stored, 'data' ) ) {
		return null;
	}

	return array(
		'meta_id' => (int) $row->meta_id,
		'raw'     => $row->meta_value,
		'version' => (int) $stored->version,
		'data'    => $stored->data,
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
	$post_id = get_document_post_id( $slug );
	if ( ! $post_id ) {
		return null;
	}

	$stored = get_stored_document( $post_id );
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
 * Encode a document's version and data for storage.
 *
 * @param int   $version Version number.
 * @param mixed $data    Document data.
 *
 * @return string|false JSON string, or false if the data can't be encoded.
 */
function encode_stored_document( $version, $data ) {
	return wp_json_encode(
		array(
			'version' => $version,
			'data'    => $data,
		)
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
 * Use version 0 to create a document. Updates replace the stored version and
 * data with one UPDATE that only matches the exact value that was read, so if
 * two writers send the same version at once, only one of them succeeds.
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

	$post_id = get_document_post_id( $slug );

	if ( ! $post_id ) {
		if ( 0 !== $expected_version ) {
			return conflict_error( $slug, null );
		}

		return create_document( $slug, $data );
	}

	$stored = get_stored_document( $post_id );
	if ( ! $stored ) {
		return new WP_Error( 'faustwp_document_corrupt', __( 'The stored document could not be read.', 'faustwp' ), array( 'status' => 500 ) );
	}

	if ( $stored['version'] !== $expected_version ) {
		return conflict_error( $slug, get_document( $slug ) );
	}

	$new_version = $stored['version'] + 1;
	$new_raw     = encode_stored_document( $new_version, $data );

	// The stored value starts with its version, and every successful write
	// changes the version, so a value written since the read can't match
	// $stored['raw'], even under a case-insensitive collation.
	global $wpdb;
	$updated = $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->prepare(
			"UPDATE {$wpdb->postmeta} SET meta_value = %s WHERE meta_id = %d AND meta_value = %s",
			$new_raw,
			$stored['meta_id'],
			$stored['raw']
		)
	);

	wp_cache_delete( $post_id, 'post_meta' );

	if ( 1 !== $updated ) {
		// Another write replaced the stored value after it was read.
		return conflict_error( $slug, get_document( $slug ) );
	}

	return array(
		'slug'    => $slug,
		'version' => $new_version,
		'data'    => $data,
		'created' => false,
	);
}

/**
 * Create a new document at version 1.
 *
 * WordPress doesn't enforce unique post slugs in the database, so two
 * concurrent creates can both insert a post. After inserting, the oldest post
 * for the slug is kept and any later one is deleted and reported as a conflict.
 *
 * @param string $slug Document slug.
 * @param mixed  $data Document data.
 *
 * @return array|WP_Error The saved document with a created flag, or an error.
 */
function create_document( $slug, $data ) {
	$post_id = wp_insert_post(
		array(
			'post_type'   => POST_TYPE,
			'post_status' => 'private',
			'post_title'  => $slug,
			'post_name'   => $slug,
			'meta_input'  => array(
				META_KEY => wp_slash( encode_stored_document( 1, $data ) ),
			),
		),
		true
	);

	if ( is_wp_error( $post_id ) ) {
		return $post_id;
	}

	$post = get_post( $post_id );
	if ( ! $post || $post->post_name !== $slug || get_document_post_id( $slug ) !== $post_id ) {
		// Another request created the document first.
		wp_delete_post( $post_id, true );
		return conflict_error( $slug, get_document( $slug ) );
	}

	return array(
		'slug'    => $slug,
		'version' => 1,
		'data'    => $data,
		'created' => true,
	);
}
