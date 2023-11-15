<?php
/**
 * Class GraphQLCallbacksTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Replacement\{
	url_replacement,
};
use function WPE\FaustWP\Settings\{
	faustwp_update_setting,
};

use function WPE\FaustWP\GraphQL\{
	filter_introspection,
};

class GraphQLCallbacksTests extends \WP_UnitTestCase {

	private $graphqlResponse;

	private $responseData = [
		'generalSettings' => [
			'url' => 'http://example.org'
		],
		'menuItems' => [
			'nodes' => [
				[
					'label' => 'Hello World',
					'url'   => 'http://example.org/hello-world/'
				],
				[
					'label' => 'External Site',
					'url'   => 'http://external.site/no-replacement'
				]
			]
		],
		'menus' => [
			'nodes' => [
				[
					'menuItems' => [
						'nodes' => [
							[
								'label' => 'Hello World',
								'url'   => 'http://example.org/hello-world/'
							]
						]
					]
				]
			]
		],
		'aThingWithHref' => [
			'nodes' => [
				[
					'label' => "This uses href instead of url fields",
					'href'  => 'http://example.org/href'
				]
			]
		]
	];

	private $expectedData = [
		'generalSettings' => [
			'url' => 'http://example.org'
		],
		'menuItems' => [
			'nodes' => [
				[
					'label' => 'Hello World',
					'url'   => 'http://frontend/hello-world/'
				],
				[
					'label' => 'External Site',
					'url'   => 'http://external.site/no-replacement'
				]
			]
		],
		'menus' => [
			'nodes' => [
				[
					'menuItems' => [
						'nodes' => [
							[
								'label' => 'Hello World',
								'url'   => 'http://frontend/hello-world/'
							]
						]
					]
				]
			]
		],
		'aThingWithHref' => [
			'nodes' => [
				[
					'label' => "This uses href instead of url fields",
					'href'  => 'http://frontend/href'
				]
			]
		]
	];

	public function setUp(): void {
		parent::setUp();

		faustwp_update_setting( 'frontend_uri', 'http://frontend' );

		$this->graphqlResponse = new \stdClass();
		$this->graphqlResponse->data = $this->responseData;
	}

	public function test_graphql_section_field_value() {
		$this->assertSame( 10, has_action( 'graphql_get_setting_section_field_value', 'WPE\FaustWP\GraphQL\filter_introspection' ) );
	}

	/**
	 * Tests url_replacement() returns original data when rewrites are not enabled.
	 */
	public function test_url_replacement_does_not_alter_response_when_rewrites_are_not_enabled() {
		faustwp_update_setting( 'enable_rewrites', '0' );
		$filteredRespone = url_replacement( $this->graphqlResponse );
		$this->assertSame( $this->responseData, $filteredRespone->data );
	}

	/**
	 * Tests url_replacement() does not modify generalSettings even when rewrites are enabled.
	 */
	public function test_url_replacement_does_not_alter_generalSettings_when_rewrites_are_enabled() {
		faustwp_update_setting( 'enable_rewrites', '1' );
		$filteredRespone = url_replacement( $this->graphqlResponse );
		$this->assertSame( $this->responseData['generalSettings'], $filteredRespone->data['generalSettings'] );
	}

	/**
	 * Tests url_replacement() modifies url and href fields when rewrites are enabled.
	 */
	public function test_url_replacement_replaces_url_fields_when_rewrites_are_enabled() {
		faustwp_update_setting( 'enable_rewrites', '1' );
		$filteredRespone = url_replacement( $this->graphqlResponse );
		$this->assertSame( $this->expectedData, $filteredRespone->data );
	}

	/**
	 * Tests filter_introspection() does not modify values unrelated to public introspection.
	 */
	public function test_filter_introspection_returns_same_value_for_unrelated_option_name(): void {
		$input = 'leave me alone';
		self::assertSame(
			$input,
			filter_introspection( $input, false, 'stylesheet', [], 'default' )
		);
	}

	/**
	 * Tests filter_introspection() does not enable public introspection when the Faust secret key is not present.
	 */
	public function test_filter_introspection_returns_same_value_when_faust_secret_key_is_not_present(): void {
		$input = 'leave me alone';
		self::assertSame(
			$input,
			filter_introspection( $input, false, 'public_introspection_enabled', [], 'default' )
		);
	}

	/**
	 * Tests filter_introspection() does not enable public introspection when the Faust secret key is incorrect.
	 */
	public function test_filter_introspection_returns_same_value_when_faust_secret_key_is_present_but_incorrect(): void {
		global $_SERVER;
		$_SERVER['HTTP_X_FAUST_SECRET'] = 'wrong-key';

		$input = 'leave me alone';
		self::assertSame(
			$input,
			filter_introspection( $input, false, 'public_introspection_enabled', [], 'default' )
		);
	}

	/**
	 * Tests filter_introspection() enables public introspection when the Faust secret key is correct.
	 */
	public function test_filter_introspection_returns_on_when_faust_secret_key_is_present_and_correct(): void {
		global $_SERVER;
		$_SERVER['HTTP_X_FAUST_SECRET'] = 'correct-key';

		tests_add_filter( 'faustwp_get_setting', [ $this, 'filter_secret_key' ], 10, 3 );

		$input = 'this should not be returned. "on" should be returned.';

		self::assertSame(
			'on',
			filter_introspection( $input, false, 'public_introspection_enabled', [], 'default' )
		);

		remove_filter( 'faustwp_get_setting', [ $this, 'filter_secret_key' ] );
	}

	/**
	 * Filters the secret key value for testing.
	 *
	 * @param mixed  $value   The setting value.
	 * @param string $name    The setting name.
	 * @param mixed  $default Optional setting value.
	 */
	public function filter_secret_key( $value, $name, $default ) {
		if ( 'secret_key' !== $name ) {
			return $value;
		}
		return 'correct-key';
	}
}
