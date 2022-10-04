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

	public function test_graphql_request_results_filter() {
		$this->assertSame( 10, has_action( 'graphql_request_results', 'WPE\FaustWP\Replacement\url_replacement' ) );
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
}
