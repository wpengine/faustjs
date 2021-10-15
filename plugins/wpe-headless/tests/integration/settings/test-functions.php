<?php
/**
 * Class FunctionsTest
 *
 * @package FaustWP
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

	/**
	 * Tests wpe_headless_get_settings() returns empty array when no settings exist.
	 */
	public function test_wpe_headless_get_settings_returns_empty_array() {
		$this->assertSame( [], wpe_headless_get_settings() );
	}

	/**
	 * Test wpe_headless_get_setting() returns false when fetching non-existent setting.
	 */
	public function test_wpe_headless_get_setting_returns_false() {
		$this->assertFalse( wpe_headless_get_setting( 'moo' ) );
	}

	/**
	 * Test wpe_headless_get_setting() returns supplied default value when requested setting doesn't exist.
	 */
	public function test_wpe_headless_get_setting_default_value_returns_expected_value() {
		$this->assertSame( 'cow', wpe_headless_get_setting( 'moo', 'cow' ) );
	}

	/**
	 * Test wpe_headless_get_setting() returns filtered value.
	 */
	public function test_wpe_headless_get_setting_returns_expected_value_when_filtered() {
		add_filter( 'wpe_headless_get_setting', [ $this, 'wpe_headless_get_setting_test_filtered_value' ] );
		$this->assertSame( 'filtered value', wpe_headless_get_setting( 'moo', 'this default value should not be returned because of the filter' ) );
		remove_filter( 'wpe_headless_get_setting', [ $this, 'wpe_headless_get_setting_test_filtered_value' ] );
	}

	/**
	 * Test wpe_headless_get_secret_key() returns empty string when no secret key exists.
	 */
	public function test_wpe_headless_get_secret_key_is_empty_string() {
		$this->assertSame( '', wpe_headless_get_secret_key() );
	}

	/**
	 * Test wpe_headless_get_secret_key() returns expected value from database.
	 */
	public function test_wpe_headless_get_secret_key_returns_expected_value() {
		wpe_headless_update_setting( 'secret_key', 'abc123' );
		$this->assertSame( 'abc123', wpe_headless_get_secret_key() );
	}

	/**
	 * Used to filter return value of wpe_headless_get_setting() via wpe_headless_get_setting filter.
	 * @return string
	 */
	public function wpe_headless_get_setting_test_filtered_value() {
		return 'filtered value';
	}
}
