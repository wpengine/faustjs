<?php
/**
 * Class GraphQLFunctionsTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Unit;

use \WP_UnitTestCase;
use function WPE\FaustWP\Settings\{
	faustwp_update_setting,
};
use function WPE\FaustWP\Telemetry\{
	has_frontend_uri,
};

class TelemetryFunctionsTests extends WP_UnitTestCase {

	/**
	 * Tests has_frontend_uri() returns false if frontend_uri setting is empty.
	 */
	public function test_has_frontend_uri_returns_false_if_frontend_uri_setting_is_empty() {
		faustwp_update_setting( 'frontend_uri', '' );
		$this->assertFalse( has_frontend_uri() );
	}

	/**
	 * Tests has_frontend_uri() returns true if frontend_uri setting has valid URL.
	 */
	public function test_has_frontend_uri_returns_true_if_frontend_uri_setting_has_valid_url() {
		faustwp_update_setting( 'frontend_uri', 'https://example.org' );
		$this->assertTrue( has_frontend_uri() );
	}

}