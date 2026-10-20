<?php
/**
 * Class DocumentStoreTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Documents\get_document;
use function WPE\FaustWP\Documents\drop_document_table_with_site;
use function WPE\FaustWP\Documents\get_document_table;
use function WPE\FaustWP\Documents\get_document_summary;
use function WPE\FaustWP\Documents\maybe_install_document_table;
use function WPE\FaustWP\Documents\maybe_set_up_document_store;
use function WPE\FaustWP\Documents\save_document;
use function WPE\FaustWP\Documents\uninstall_document_table;
use const WPE\FaustWP\Documents\COLLECTION_PATTERN;
use const WPE\FaustWP\Documents\DB_VERSION;
use const WPE\FaustWP\Documents\DB_VERSION_OPTION;
use const WPE\FaustWP\Documents\EDIT_CAPABILITY;
use const WPE\FaustWP\Documents\ID_PATTERN;
use const WPE\FaustWP\Documents\READ_CAPABILITY;

/**
 * Tests for the versioned document store in includes/documents.
 *
 * @group documents
 */
class DocumentStoreTests extends \WP_UnitTestCase {

	const ROUTE = '/faust/v1/collections/prefs/documents';

	/**
	 * REST server for the test.
	 *
	 * @var \WP_REST_Server
	 */
	private $server;

	public function setUp(): void {
		parent::setUp();

		add_filter( 'faust_enable_document_store', '__return_true' );
		maybe_install_document_table();
		$this->init_rest_server();

		wp_set_current_user( self::factory()->user->create( array( 'role' => 'administrator' ) ) );
	}

	public function tearDown(): void {
		global $wp_rest_server;
		$wp_rest_server = null;

		remove_all_filters( 'faust_enable_document_store' );
		remove_all_filters( 'faust_document_max_bytes' );
		uninstall_document_table();

		parent::tearDown();
	}

	private function init_rest_server() {
		global $wp_rest_server;
		$this->server = $wp_rest_server = new \WP_REST_Server();
		do_action( 'rest_api_init' );
	}

	private function put( $id, $body ) {
		$request = new \WP_REST_Request( 'PUT', self::ROUTE . '/' . $id );
		$request->set_header( 'content-type', 'application/json' );
		$request->set_body( is_string( $body ) ? $body : wp_json_encode( $body ) );
		return $this->server->dispatch( $request );
	}

	private function get( $id ) {
		return $this->server->dispatch( new \WP_REST_Request( 'GET', self::ROUTE . '/' . $id ) );
	}

	private function table_exists() {
		global $wpdb;

		// The test suite creates temporary tables, which SHOW TABLES doesn't list.
		$suppress = $wpdb->suppress_errors( true );
		$exists   = false !== $wpdb->query( 'SELECT 1 FROM ' . get_document_table() . ' LIMIT 1' );
		$wpdb->suppress_errors( $suppress );

		return $exists;
	}

	private function delete( $id, $version = null ) {
		$request = new \WP_REST_Request( 'DELETE', self::ROUTE . '/' . $id );
		if ( null !== $version ) {
			$request->set_query_params( array( 'version' => $version ) );
		}
		return $this->server->dispatch( $request );
	}

	private function post( $body ) {
		$request = new \WP_REST_Request( 'POST', self::ROUTE );
		$request->set_header( 'content-type', 'application/json' );
		$request->set_body( wp_json_encode( $body ) );
		return $this->server->dispatch( $request );
	}

	private function list_documents( $params = array() ) {
		$request = new \WP_REST_Request( 'GET', self::ROUTE );
		$request->set_query_params( $params );
		return $this->server->dispatch( $request );
	}

	/**
	 * Drop the created and modified timestamps so documents can be compared with assertSame.
	 */
	private function without_timestamps( $document ) {
		$document = $this->normalize( $document );
		unset( $document['created'], $document['modified'] );
		return $document;
	}

	/**
	 * Convert decoded JSON objects to arrays so they can be compared with assertSame.
	 */
	private function normalize( $value ) {
		return json_decode( wp_json_encode( $value ), true );
	}

	public function test_store_is_disabled_by_default() {
		uninstall_document_table();
		remove_all_filters( 'faust_enable_document_store' );
		$this->init_rest_server();

		maybe_set_up_document_store();

		$this->assertFalse( $this->table_exists() );
		$this->assertFalse( get_option( DB_VERSION_OPTION ) );
		$this->assertArrayNotHasKey( '/faust/v1/collections/(?P<collection>' . COLLECTION_PATTERN . ')/documents/(?P<id>' . ID_PATTERN . ')', $this->server->get_routes() );
		$this->assertSame( 404, $this->get( 'settings' )->get_status() );
	}

	public function test_enabling_the_store_creates_the_table() {
		uninstall_document_table();

		maybe_set_up_document_store();

		$this->assertTrue( $this->table_exists() );
		$this->assertSame( DB_VERSION, (int) get_option( DB_VERSION_OPTION ) );
	}

	public function test_uninstall_drops_the_table() {
		save_document( 'prefs', 'settings', 0, array( 'theme' => 'dark' ) );

		uninstall_document_table();

		$this->assertFalse( $this->table_exists() );
		$this->assertFalse( get_option( DB_VERSION_OPTION ) );
	}

	public function test_a_failed_install_is_retried() {
		uninstall_document_table();
		add_filter(
			'query',
			function ( $query ) {
				return 0 === strpos( $query, 'CREATE' ) && false !== strpos( $query, get_document_table() ) ? 'NOT VALID SQL' : $query;
			}
		);

		global $wpdb;
		$suppress = $wpdb->suppress_errors( true );
		maybe_install_document_table();
		$wpdb->suppress_errors( $suppress );

		$this->assertFalse( get_option( DB_VERSION_OPTION ) );
	}

	public function test_deleting_a_site_drops_its_table() {
		$this->assertContains( get_document_table(), drop_document_table_with_site( array() ) );
	}

	public function test_put_with_version_zero_creates_document() {
		$response = $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$this->assertSame( 201, $response->get_status() );
		$this->assertSame(
			array( 'collection' => 'prefs', 'id' => 'settings', 'version' => 1, 'data' => array( 'theme' => 'dark' ) ),
			$this->without_timestamps( $response->get_data() )
		);
	}

	public function test_get_returns_document_and_version() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$response = $this->get( 'settings' );

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame(
			array( 'collection' => 'prefs', 'id' => 'settings', 'version' => 1, 'data' => array( 'theme' => 'dark' ) ),
			$this->without_timestamps( $response->get_data() )
		);
	}

	public function test_get_missing_document_returns_404() {
		$response = $this->get( 'missing' );

		$this->assertSame( 404, $response->get_status() );
		$this->assertSame( 'faust_document_not_found', $response->get_data()['code'] );
	}

	public function test_put_with_matching_version_updates_and_bumps_version() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$response = $this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'light' ) ) );

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame( 2, $response->get_data()['version'] );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
	}

	public function test_put_with_stale_version_returns_409_and_keeps_document() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		$this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'light' ) ) );

		$response = $this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'blue' ) ) );
		$error    = $response->get_data();

		$this->assertSame( 409, $response->get_status() );
		$this->assertSame( 'faust_document_conflict', $error['code'] );
		$this->assertSame( 2, $error['data']['version'] );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( $error['data']['document']['data'] ) );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
	}

	public function test_create_with_version_zero_when_document_exists_returns_409() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$response = $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'light' ) ) );

		$this->assertSame( 409, $response->get_status() );
		$this->assertSame( array( 'theme' => 'dark' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
	}

	public function test_update_of_missing_document_returns_409() {
		$response = $this->put( 'settings', array( 'version' => 3, 'data' => array() ) );

		$this->assertSame( 409, $response->get_status() );
		$this->assertSame( 0, $response->get_data()['data']['version'] );
		$this->assertNull( get_document( 'prefs', 'settings' ) );
	}

	/**
	 * Simulates another request saving between this write's read and its
	 * UPDATE. The conditional UPDATE must not match, so only one write wins.
	 */
	public function test_concurrent_write_with_same_version_is_rejected() {
		save_document( 'prefs', 'settings', 0, array( 'theme' => 'dark' ) );

		$raced = false;
		add_filter(
			'query',
			function ( $query ) use ( &$raced ) {
				if ( ! $raced && 0 === strpos( $query, 'UPDATE ' . get_document_table() ) ) {
					$raced = true;
					save_document( 'prefs', 'settings', 1, array( 'theme' => 'light' ) );
				}
				return $query;
			}
		);

		$result = save_document( 'prefs', 'settings', 1, array( 'theme' => 'blue' ) );

		$this->assertTrue( $raced );
		$this->assertWPError( $result );
		$this->assertSame( 'faust_document_conflict', $result->get_error_code() );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
		$this->assertSame( 2, get_document( 'prefs', 'settings' )['version'] );
	}

	/**
	 * Simulates another request creating the document just before this
	 * create's INSERT. The unique key rejects the second row.
	 */
	public function test_concurrent_create_is_rejected() {
		$raced = false;
		add_filter(
			'query',
			function ( $query ) use ( &$raced ) {
				if ( ! $raced && 0 === strpos( $query, 'INSERT INTO `' . get_document_table() . '`' ) ) {
					$raced = true;
					save_document( 'prefs', 'settings', 0, array( 'theme' => 'dark' ) );
				}
				return $query;
			}
		);

		$result = save_document( 'prefs', 'settings', 0, array( 'theme' => 'light' ) );

		global $wpdb;
		$this->assertTrue( $raced );
		$this->assertWPError( $result );
		$this->assertSame( 'faust_document_conflict', $result->get_error_code() );
		$this->assertSame( array( 'theme' => 'dark' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
		$this->assertSame( '1', $wpdb->get_var( 'SELECT COUNT(*) FROM ' . get_document_table() ) );
	}

	public function test_ids_and_collections_outside_the_allowed_characters_do_not_match_the_route() {
		$this->assertSame( 'rest_no_route', $this->put( 'Settings', array( 'version' => 0, 'data' => array() ) )->get_data()['code'] );
		$this->assertSame( 'rest_no_route', $this->put( 'my_settings', array( 'version' => 0, 'data' => array() ) )->get_data()['code'] );
		$this->assertSame( 'rest_no_route', $this->server->dispatch( new \WP_REST_Request( 'GET', '/faust/v1/collections/Prefs/documents/settings' ) )->get_data()['code'] );
		$this->assertNull( get_document( 'prefs', 'Settings' ) );
	}

	public function test_body_and_query_parameters_cannot_replace_the_route_identifiers() {
		$response = $this->put(
			'settings',
			array(
				'version'    => 0,
				'data'       => array(),
				'collection' => 'Other Collection',
				'id'         => 'Not A Slug!',
			)
		);

		$this->assertSame( 201, $response->get_status() );
		$this->assertSame( 'settings', $response->get_data()['id'] );
		$this->assertSame( 'prefs', $response->get_data()['collection'] );
		$this->assertNull( get_document( 'Other Collection', 'Not A Slug!' ) );

		$request = new \WP_REST_Request( 'GET', self::ROUTE . '/settings' );
		$request->set_query_params( array( 'id' => 'missing' ) );

		$this->assertSame( 200, $this->server->dispatch( $request )->get_status() );
	}

	public function test_a_recreated_document_keeps_counting_versions() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		$this->delete( 'settings', 1 );

		$this->assertSame( 404, $this->get( 'settings' )->get_status() );
		$this->assertSame( array(), $this->list_documents()->get_data()['documents'] );

		$recreated = $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'light' ) ) );

		$this->assertSame( 201, $recreated->get_status() );
		$this->assertSame( 3, $recreated->get_data()['version'] );
	}

	public function test_stale_writes_from_before_a_delete_cannot_touch_the_recreated_document() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		$this->delete( 'settings', 1 );
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'light' ) ) );

		$this->assertSame( 409, $this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'stale' ) ) )->get_status() );
		$this->assertSame( 409, $this->delete( 'settings', 1 )->get_status() );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
	}

	public function test_updating_a_deleted_document_is_a_conflict() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array() ) );
		$this->delete( 'settings', 1 );

		$response = $this->put( 'settings', array( 'version' => 1, 'data' => array() ) );

		$this->assertSame( 409, $response->get_status() );
		$this->assertNull( $response->get_data()['data']['document'] );
	}

	public function test_the_same_id_in_two_collections_is_two_documents() {
		save_document( 'prefs', 'settings', 0, array( 'theme' => 'dark' ) );
		save_document( 'drafts', 'settings', 0, array( 'title' => 'Hello' ) );

		$this->assertSame( array( 'theme' => 'dark' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
		$this->assertSame( array( 'title' => 'Hello' ), $this->normalize( get_document( 'drafts', 'settings' )['data'] ) );
	}

	public function test_invalid_json_body_returns_400() {
		$response = $this->put( 'settings', '{"version": 0, "data": ' );

		$this->assertSame( 400, $response->get_status() );
		$this->assertNull( get_document( 'prefs', 'settings' ) );
	}

	public function test_missing_version_returns_400() {
		$response = $this->put( 'settings', array( 'data' => array( 'theme' => 'dark' ) ) );

		$this->assertSame( 400, $response->get_status() );
	}

	public function test_data_must_be_an_object_or_array() {
		$response = $this->put( 'settings', array( 'version' => 0, 'data' => 'dark' ) );

		$this->assertSame( 400, $response->get_status() );
		$this->assertNull( get_document( 'prefs', 'settings' ) );
	}

	public function test_document_larger_than_max_size_returns_413() {
		add_filter(
			'faust_document_max_bytes',
			function () {
				return 10;
			}
		);

		$response = $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'much too long' ) ) );

		$this->assertSame( 413, $response->get_status() );
		$this->assertNull( get_document( 'prefs', 'settings' ) );
	}

	public function test_data_with_html_and_slashes_round_trips() {
		$data = array( 'html' => '<script>alert("x")</script>', 'path' => 'C:\\temp\\"quoted"' );

		$this->put( 'settings', array( 'version' => 0, 'data' => $data ) );

		$this->assertSame( $data, $this->normalize( $this->get( 'settings' )->get_data()['data'] ) );
	}

	public function test_empty_objects_are_returned_as_objects() {
		$this->put( 'settings', '{"version":0,"data":{"filters":{},"tags":[]}}' );

		$this->assertSame( '{"filters":{},"tags":[]}', wp_json_encode( $this->get( 'settings' )->get_data()['data'] ) );
	}

	public function test_unauthenticated_requests_return_401() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		wp_set_current_user( 0 );

		$this->assertSame( 401, $this->get( 'settings' )->get_status() );
		$this->assertSame( 401, $this->put( 'settings', array( 'version' => 1, 'data' => array() ) )->get_status() );
	}

	public function test_users_without_document_capabilities_get_403() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		wp_set_current_user( self::factory()->user->create( array( 'role' => 'editor' ) ) );

		$this->assertSame( 403, $this->get( 'settings' )->get_status() );
		$this->assertSame( 403, $this->put( 'settings', array( 'version' => 1, 'data' => array() ) )->get_status() );
		$this->assertSame( array( 'theme' => 'dark' ), $this->normalize( get_document( 'prefs', 'settings' )['data'] ) );
	}

	public function test_read_capability_allows_reading_but_not_writing() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		$user = self::factory()->user->create_and_get( array( 'role' => 'subscriber' ) );
		$user->add_cap( READ_CAPABILITY );
		wp_set_current_user( $user->ID );

		$this->assertSame( 200, $this->get( 'settings' )->get_status() );
		$this->assertSame( 403, $this->put( 'settings', array( 'version' => 1, 'data' => array() ) )->get_status() );
	}

	public function test_read_and_edit_capabilities_allow_writing() {
		$user = self::factory()->user->create_and_get( array( 'role' => 'subscriber' ) );
		$user->add_cap( READ_CAPABILITY );
		$user->add_cap( EDIT_CAPABILITY );
		wp_set_current_user( $user->ID );

		$this->assertSame( 201, $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) )->get_status() );
	}

	public function test_update_records_modified_and_modified_by() {
		$creator = get_current_user_id();
		save_document( 'prefs', 'settings', 0, array( 'theme' => 'dark' ) );
		$created = get_document_summary( 'prefs', 'settings' );

		$this->assertSame( $creator, $created['modified_by'] );

		$editor = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $editor );
		$before = time();
		save_document( 'prefs', 'settings', 1, array( 'theme' => 'light' ) );
		$updated = get_document_summary( 'prefs', 'settings' );

		$this->assertSame( 2, $updated['version'] );
		$this->assertSame( $editor, $updated['modified_by'] );
		$this->assertGreaterThanOrEqual( $before, strtotime( $updated['modified'] ) );
	}

	public function test_documents_include_created_and_modified_timestamps() {
		$created  = $this->put( 'settings', array( 'version' => 0, 'data' => array() ) )->get_data();
		$document = $this->get( 'settings' )->get_data();

		$this->assertSame( array( 'collection', 'id', 'version', 'data', 'created', 'modified' ), array_keys( $document ) );
		$this->assertMatchesRegularExpression( '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/', $document['created'] );
		$this->assertSame( $created['created'], $document['created'] );
		$this->assertSame( $document['created'], $this->put( 'settings', array( 'version' => 1, 'data' => array() ) )->get_data()['created'] );
	}

	public function test_post_creates_a_document_with_a_generated_id() {
		$response = $this->post( array( 'data' => array( 'email' => 'a@example.com' ) ) );
		$document = $response->get_data();

		$this->assertSame( 201, $response->get_status() );
		$this->assertMatchesRegularExpression( '/^[a-f0-9]{20}$/', $document['id'] );
		$this->assertSame( 1, $document['version'] );
		$this->assertSame( array( 'email' => 'a@example.com' ), $this->normalize( $this->get( $document['id'] )->get_data()['data'] ) );
		$this->assertNotSame( $document['id'], $this->post( array( 'data' => array() ) )->get_data()['id'] );
	}

	public function test_post_requires_data() {
		$this->assertSame( 400, $this->post( array() )->get_status() );
	}

	public function test_list_returns_documents_newest_first_with_a_cursor() {
		foreach ( array( 'a', 'b', 'c' ) as $id ) {
			save_document( 'prefs', $id, 0, array( 'id' => $id ) );
		}
		save_document( 'other', 'x', 0, array() );

		$first = $this->list_documents( array( 'limit' => 2 ) )->get_data();

		$this->assertSame( array( 'c', 'b' ), wp_list_pluck( $first['documents'], 'id' ) );
		$this->assertSame( array( 'id' => 'c' ), $this->normalize( $first['documents'][0]['data'] ) );
		$this->assertNotNull( $first['next_cursor'] );

		$second = $this->list_documents( array( 'limit' => 2, 'cursor' => $first['next_cursor'] ) )->get_data();

		$this->assertSame( array( 'a' ), wp_list_pluck( $second['documents'], 'id' ) );
		$this->assertNull( $second['next_cursor'] );
	}

	public function test_list_of_an_empty_collection_is_empty() {
		$this->assertSame( array( 'documents' => array(), 'next_cursor' => null ), $this->list_documents()->get_data() );
	}

	public function test_list_limit_is_capped() {
		$this->assertSame( 400, $this->list_documents( array( 'limit' => 101 ) )->get_status() );
	}

	public function test_delete_with_current_version_removes_the_document() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$response = $this->delete( 'settings', 1 );

		$this->assertSame( 200, $response->get_status() );
		$this->assertTrue( $response->get_data()['deleted'] );
		$this->assertSame( 'settings', $response->get_data()['previous']['id'] );
		$this->assertNull( get_document( 'prefs', 'settings' ) );
	}

	public function test_delete_with_stale_version_returns_409_and_keeps_the_document() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		$this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'light' ) ) );

		$response = $this->delete( 'settings', 1 );

		$this->assertSame( 409, $response->get_status() );
		$this->assertSame( 2, $response->get_data()['data']['version'] );
		$this->assertNotNull( get_document( 'prefs', 'settings' ) );
	}

	public function test_delete_of_a_missing_document_returns_404() {
		$this->assertSame( 404, $this->delete( 'missing', 1 )->get_status() );
	}

	public function test_delete_requires_a_version() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array() ) );

		$this->assertSame( 400, $this->delete( 'settings' )->get_status() );
		$this->assertNotNull( get_document( 'prefs', 'settings' ) );
	}

	public function test_saving_and_deleting_fire_actions() {
		$saved   = array();
		$deleted = array();
		add_action(
			'faust_document_saved',
			function ( $document, $created ) use ( &$saved ) {
				$saved[] = array( $document['version'], $created );
			},
			10,
			2
		);
		add_action(
			'faust_document_deleted',
			function ( $previous ) use ( &$deleted ) {
				$deleted[] = $previous['version'];
			}
		);

		save_document( 'prefs', 'settings', 0, array() );
		save_document( 'prefs', 'settings', 1, array() );
		save_document( 'prefs', 'settings', 1, array() ); // Stale, so no action.
		$this->delete( 'settings', 2 );

		$this->assertSame( array( array( 1, true ), array( 2, false ) ), $saved );
		$this->assertSame( array( 2 ), $deleted );
	}

	public function test_writers_without_edit_capability_cannot_add_or_delete() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array() ) );
		$user = self::factory()->user->create_and_get( array( 'role' => 'subscriber' ) );
		$user->add_cap( READ_CAPABILITY );
		wp_set_current_user( $user->ID );

		$this->assertSame( 200, $this->list_documents()->get_status() );
		$this->assertSame( 403, $this->post( array( 'data' => array() ) )->get_status() );
		$this->assertSame( 403, $this->delete( 'settings', 1 )->get_status() );
	}
}
