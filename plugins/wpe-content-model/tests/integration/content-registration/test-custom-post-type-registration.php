<?php
/**
 * Class PostTypeRegistrationTestCases
 *
 * @package WPE_Content_Model
 */

use function \WPE\ContentModel\ContentRegistration\generate_custom_post_type_labels;
use function \WPE\ContentModel\ContentRegistration\register_content_types;
use PHPUnit\Runner\Exception as PHPUnitRunnerException;

/**
 * Post type registration case.
 */
class PostTypeRegistrationTestCases extends WP_UnitTestCase {

	/**
	 * The REST API server instance.
	 *
	 * @var \WP_REST_Server
	 */
	private $server;
	private $namespace = '/wp/v2';
	private $dog_route = '/dog';
	private $dog_post_id;
	private $all_registered_post_types;

	public function setUp() {
		parent::setUp();

		update_option( 'wpe_content_model_post_types', $this->expected_post_types() );

		// @todo why is this not running automatically?
		do_action( 'init' );

		$this->all_registered_post_types = get_post_types( [], 'objects' );

		/**
		 * WP_Rest_Server instance.
		 */
		global $wp_rest_server;

		$wp_rest_server = new \WP_REST_Server();

		$this->server = $wp_rest_server;

		do_action( 'rest_api_init' );

		$this->dog_post_id = $this->factory->post->create( [
			'post_title' => 'Test dog',
			'post_content' => 'Hello dog',
			'status' => 'publish',
			'post_type' => 'dog',
		] );

		update_post_meta( $this->dog_post_id, 'dog-test-field', 'dog-test-field string value' );
		update_post_meta( $this->dog_post_id, 'dog-weight', '100.25' );
	}

	public function tearDown() {
		parent::tearDown();
		wp_set_current_user( null );
		global $wp_rest_server;
		$wp_rest_server = null;
		$this->server = null;
	}

	public function test_dog_post_type_accessible_via_rest_api(): void {
		wp_set_current_user( 1 );
		$request  = new \WP_REST_Request( 'GET', $this->namespace . $this->dog_route . '/' . $this->dog_post_id );
		$response = $this->server->dispatch( $request );
		$response_data = $response->get_data();
		$this->assertSame( $response_data['title']['rendered'], 'Test dog' );
	}

	public function test_post_meta_that_is_configured_to_show_in_rest_is_accessible(): void {
		wp_set_current_user( 1 );
		$request  = new \WP_REST_Request( 'GET', $this->namespace . $this->dog_route . '/' . $this->dog_post_id );
		$response = $this->server->dispatch( $request );
		$response_data = $response->get_data();
		$this->assertArrayHasKey( 'dog-test-field', $response_data['meta'] );
		$this->assertSame( $response_data['meta']['dog-test-field'][0], 'dog-test-field string value' );

		self::assertArrayHasKey( 'dog-weight', $response_data['meta'] );
		self::assertEquals( '100.25', $response_data['meta']['dog-weight'][0] );
	}

	public function test_post_meta_that_is_configured_to_not_show_in_rest_is_not_accessible(): void {
		wp_set_current_user( 1 );
		$request  = new \WP_REST_Request( 'GET', $this->namespace . $this->dog_route . '/' . $this->dog_post_id );
		$response = $this->server->dispatch( $request );
		$response_data = $response->get_data();
		$this->assertFalse( array_key_exists( 'another-dog-test-field', $response_data['meta'] ) );
	}

	/**
	 * @covers ::\WPE\ContentModel\ContentRegistration\register_content_types()
	 */
	public function test_content_registration_init_hook(): void {
		$this->assertSame( 10, has_action( 'init', 'WPE\ContentModel\ContentRegistration\register_content_types' ) );
	}

	public function test_defined_custom_post_types_are_registered(): void {
		$this->assertArrayHasKey( 'cat', $this->all_registered_post_types );
		$this->assertArrayHasKey( 'dog', $this->all_registered_post_types );
	}

	public function test_custom_post_type_labels_match_expected_format(): void {
		$labels = generate_custom_post_type_labels( [
			'singular' => 'Dog',
			'plural'   => 'Dogs',
		] );

		$this->assertSame( $labels, $this->expected_post_types()['dog']['labels'] );
	}

	public function test_defined_custom_post_types_have_show_in_graphql_argument(): void {
		$this->assertTrue( $this->all_registered_post_types['dog']->show_in_graphql );
		$this->assertFalse( $this->all_registered_post_types['cat']->show_in_graphql );
	}

	public function test_graphql_query_result_has_custom_fields_data(): void {
		try {
			$results = graphql( [
				'query' => '
				{
					dogs {
						nodes {
							databaseId
							title
							content
							dogTestField
							dogWeight
						}
					}
				}
				'
			] );

			self::assertArrayHasKey( 'dogTestField', $results['data']['dogs']['nodes'][0] );
			self::assertSame( $results['data']['dogs']['nodes'][0]['dogTestField'], 'dog-test-field string value' );

			self::assertArrayHasKey( 'dogWeight', $results['data']['dogs']['nodes'][0] );
			self::assertSame( $results['data']['dogs']['nodes'][0]['dogWeight'], 100.25 );

		} catch ( Exception $exception ) {
			throw new PHPUnitRunnerException( sprintf( __FUNCTION__ . ' failed with exception: %s', $exception->getMessage() ) );
		}
	}

	private function expected_post_types(): array {
		return include __DIR__ . '/example-data/expected-post-types.php';
	}
}
