<?php
/**
 * Class ReplacementFunctionsTestCases
 *
 * @package WPE_Headless
 */

class ReplacementFunctionsTestCases extends WP_UnitTestCase {
	public function test_wpe_headless_domain_replacement_enabled_returns_false() {
		$this->assertFalse( wpe_headless_domain_replacement_enabled() );
	}

	public function test_wpe_headless_domain_replacement_enabled_returns_true_when_filtered_to_be_true() {
		add_filter( 'wpe_headless_domain_replacement_enabled', '__return_true' );
		$this->assertTrue( wpe_headless_domain_replacement_enabled() );
		remove_filter( 'wpe_headless_domain_replacement_enabled', '__return_true' );
	}
}
