<?php
/**
 * Class ReplacementFunctionsTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Replacement;

use function WPE\FaustWP\Replacement\domain_replacement_enabled;

class ReplacementFunctionsTestCases extends \WP_UnitTestCase {
	public function test_domain_replacement_enabled_returns_false() {
		$this->assertFalse( domain_replacement_enabled() );
	}

	public function test_domain_replacement_enabled_returns_true_when_filtered_to_be_true() {
		add_filter( 'faustwp_domain_replacement_enabled', '__return_true' );
		$this->assertTrue( domain_replacement_enabled() );
		remove_filter( 'faustwp_domain_replacement_enabled', '__return_true' );
	}
}
