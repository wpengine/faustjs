<?php
/**
 * Class FunctionsTest
 *
 * @package WPE_Headless
 */

namespace WPE_Headless\Tests\Settings;

class FunctionsTest extends \WP_UnitTestCase {
	/** @test */
	public function wpe_headless_is_redirects_enabled_will_return_true_if_enabled() {
		delete_option( 'wpe_headless' );

		$this->assertFalse( wpe_headless_is_redirects_enabled() );

		update_option( 'wpe_headless', array( 'enable_redirects' => '1' ) );

		$this->assertTrue( wpe_headless_is_redirects_enabled() );
	}

	/** @test */
	public function wpe_headless_is_rewrites_enabled_will_return_true_if_enabled() {
		delete_option( 'wpe_headless' );

		$this->assertFalse( wpe_headless_is_rewrites_enabled() );

		update_option( 'wpe_headless', array( 'enable_rewrites' => '1' ) );

		$this->assertTrue( wpe_headless_is_rewrites_enabled() );
	}

	/** @test */
	public function wpe_headless_is_themes_disabled_will_return_true_if_disabled() {
		delete_option( 'wpe_headless' );

		$this->assertFalse( wpe_headless_is_themes_disabled() );

		update_option( 'wpe_headless', array( 'disable_theme' => '1' ) );

		$this->assertTrue( wpe_headless_is_themes_disabled() );
	}

	/** @test */
	public function wpe_headless_is_image_source_replacement_enabled_will_return_true_if_disabled() {
		delete_option( 'wpe_headless' );

		$this->assertFalse( wpe_headless_is_image_source_replacement_enabled() );

		update_option( 'wpe_headless', array( 'enable_image_source' => '1' ) );

		$this->assertTrue( wpe_headless_is_image_source_replacement_enabled() );
	}
}
