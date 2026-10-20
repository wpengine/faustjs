<?php
/**
 * Class DocumentStoreTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Documents\get_document;
use function WPE\FaustWP\Documents\maybe_register_document_post_type;
use function WPE\FaustWP\Documents\register_document_post_type;
use function WPE\FaustWP\Documents\save_document;
use const WPE\FaustWP\Documents\EDIT_CAPABILITY;
use const WPE\FaustWP\Documents\META_KEY;
use const WPE\FaustWP\Documents\POST_TYPE;
use const WPE\FaustWP\Documents\READ_CAPABILITY;

/**
 * Tests for the versioned document store in includes/documents.
 *
 * @group documents
 */
class DocumentStoreTests extends \WP_UnitTestCase {

	const ROUTE = '/faustwp/v1/documents';

	/**
	 * REST server for the test.
	 *
	 * @var \WP_REST_Server
	 */
	private $server;

	public function setUp(): void {
		parent::setUp();

		add_filter( 'faustwp_enable_document_store', '__return_true' );
		register_document_post_type();
		$this->init_rest_server();

		wp_set_current_user( self::factory()->user->create( array( 'role' => 'administrator' ) ) );
	}

	public function tearDown(): void {
		global $wp_rest_server;
		$wp_rest_server = null;

		remove_all_filters( 'faustwp_enable_document_store' );
		remove_all_filters( 'faustwp_document_max_bytes' );
		if ( post_type_exists( POST_TYPE ) ) {
			unregister_post_type( POST_TYPE );
		}

		parent::tearDown();
	}

	private function init_rest_server() {
		global $wp_rest_server;
		$this->server = $wp_rest_server = new \WP_REST_Server();
		do_action( 'rest_api_init' );
	}

	private function put( $slug, $body ) {
		$request = new \WP_REST_Request( 'PUT', self::ROUTE . '/' . $slug );
		$request->set_header( 'content-type', 'application/json' );
		$request->set_body( is_string( $body ) ? $body : wp_json_encode( $body ) );
		return $this->server->dispatch( $request );
	}

	private function get( $slug ) {
		return $this->server->dispatch( new \WP_REST_Request( 'GET', self::ROUTE . '/' . $slug ) );
	}

	/**
	 * Convert decoded JSON objects to arrays so they can be compared with assertSame.
	 */
	private function normalize( $value ) {
		return json_decode( wp_json_encode( $value ), true );
	}

	public function test_store_is_disabled_by_default() {
		remove_all_filters( 'faustwp_enable_document_store' );
		unregister_post_type( POST_TYPE );
		$this->init_rest_server();

		maybe_register_document_post_type();

		$this->assertFalse( post_type_exists( POST_TYPE ) );
		$this->assertArrayNotHasKey( self::ROUTE . '/(?P<slug>[a-z0-9-]{1,190})', $this->server->get_routes() );
		$this->assertSame( 404, $this->get( 'settings' )->get_status() );
	}

	public function test_post_type_is_not_public() {
		$post_type = get_post_type_object( POST_TYPE );

		$this->assertFalse( $post_type->public );
		$this->assertFalse( $post_type->publicly_queryable );
		$this->assertFalse( $post_type->show_ui );
		$this->assertFalse( $post_type->show_in_rest );
		$this->assertFalse( $post_type->show_in_graphql );
	}

	public function test_put_with_version_zero_creates_document() {
		$response = $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$this->assertSame( 201, $response->get_status() );
		$this->assertSame(
			array( 'slug' => 'settings', 'version' => 1, 'data' => array( 'theme' => 'dark' ) ),
			$this->normalize( $response->get_data() )
		);
	}

	public function test_get_returns_document_and_version() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$response = $this->get( 'settings' );

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame(
			array( 'slug' => 'settings', 'version' => 1, 'data' => array( 'theme' => 'dark' ) ),
			$this->normalize( $response->get_data() )
		);
	}

	public function test_get_missing_document_returns_404() {
		$response = $this->get( 'missing' );

		$this->assertSame( 404, $response->get_status() );
		$this->assertSame( 'faustwp_document_not_found', $response->get_data()['code'] );
	}

	public function test_put_with_matching_version_updates_and_bumps_version() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$response = $this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'light' ) ) );

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame( 2, $response->get_data()['version'] );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( get_document( 'settings' )['data'] ) );
	}

	public function test_put_with_stale_version_returns_409_and_keeps_document() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );
		$this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'light' ) ) );

		$response = $this->put( 'settings', array( 'version' => 1, 'data' => array( 'theme' => 'blue' ) ) );
		$error    = $response->get_data();

		$this->assertSame( 409, $response->get_status() );
		$this->assertSame( 'faustwp_document_conflict', $error['code'] );
		$this->assertSame( 2, $error['data']['version'] );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( $error['data']['document']['data'] ) );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( get_document( 'settings' )['data'] ) );
	}

	public function test_create_with_version_zero_when_document_exists_returns_409() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$response = $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'light' ) ) );

		$this->assertSame( 409, $response->get_status() );
		$this->assertSame( array( 'theme' => 'dark' ), $this->normalize( get_document( 'settings' )['data'] ) );
	}

	public function test_update_of_missing_document_returns_409() {
		$response = $this->put( 'settings', array( 'version' => 3, 'data' => array() ) );

		$this->assertSame( 409, $response->get_status() );
		$this->assertSame( 0, $response->get_data()['data']['version'] );
		$this->assertNull( get_document( 'settings' ) );
	}

	/**
	 * Simulates another request saving between this write's read and its
	 * UPDATE. The conditional UPDATE must not match, so only one write wins.
	 */
	public function test_concurrent_write_with_same_version_is_rejected() {
		save_document( 'settings', 0, array( 'theme' => 'dark' ) );

		$raced = false;
		add_filter(
			'query',
			function ( $query ) use ( &$raced ) {
				global $wpdb;
				if ( ! $raced && 0 === strpos( $query, "UPDATE {$wpdb->postmeta} SET meta_value" ) ) {
					$raced = true;
					save_document( 'settings', 1, array( 'theme' => 'light' ) );
				}
				return $query;
			}
		);

		$result = save_document( 'settings', 1, array( 'theme' => 'blue' ) );

		$this->assertTrue( $raced );
		$this->assertWPError( $result );
		$this->assertSame( 'faustwp_document_conflict', $result->get_error_code() );
		$this->assertSame( array( 'theme' => 'light' ), $this->normalize( get_document( 'settings' )['data'] ) );
		$this->assertSame( 2, get_document( 'settings' )['version'] );
	}

	public function test_slugs_outside_the_allowed_characters_do_not_match_the_route() {
		$this->assertSame( 404, $this->get( 'Settings' )->get_status() );
		$this->assertSame( 404, $this->put( 'my_settings', array( 'version' => 0, 'data' => array() ) )->get_status() );
	}

	public function test_invalid_json_body_returns_400() {
		$response = $this->put( 'settings', '{"version": 0, "data": ' );

		$this->assertSame( 400, $response->get_status() );
		$this->assertNull( get_document( 'settings' ) );
	}

	public function test_missing_version_returns_400() {
		$response = $this->put( 'settings', array( 'data' => array( 'theme' => 'dark' ) ) );

		$this->assertSame( 400, $response->get_status() );
	}

	public function test_data_must_be_an_object_or_array() {
		$response = $this->put( 'settings', array( 'version' => 0, 'data' => 'dark' ) );

		$this->assertSame( 400, $response->get_status() );
		$this->assertNull( get_document( 'settings' ) );
	}

	public function test_document_larger_than_max_size_returns_413() {
		add_filter(
			'faustwp_document_max_bytes',
			function () {
				return 10;
			}
		);

		$response = $this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'much too long' ) ) );

		$this->assertSame( 413, $response->get_status() );
		$this->assertNull( get_document( 'settings' ) );
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
		$this->assertSame( array( 'theme' => 'dark' ), $this->normalize( get_document( 'settings' )['data'] ) );
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

	public function test_document_data_is_stored_in_protected_meta() {
		$this->put( 'settings', array( 'version' => 0, 'data' => array( 'theme' => 'dark' ) ) );

		$this->assertTrue( is_protected_meta( META_KEY, 'post' ) );
	}
}
