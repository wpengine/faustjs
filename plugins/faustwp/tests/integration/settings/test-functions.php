<?php
/**
 * Class FunctionsTest
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Settings;

use function WPE\FaustWP\Settings\{
	is_redirects_enabled,
	is_rewrites_enabled,
	is_themes_disabled,
	is_image_source_replacement_enabled,
	faustwp_get_settings,
	faustwp_get_setting,
	faustwp_update_setting,
	get_secret_key
};

class FunctionsTest extends \WP_UnitTestCase {
	/** @test */
	public function is_redirects_enabled_will_return_true_if_enabled() {
		delete_option( 'faustwp_settings' );

		$this->assertFalse( is_redirects_enabled() );

		update_option( 'faustwp_settings', array( 'enable_redirects' => '1' ) );

		$this->assertTrue( is_redirects_enabled() );
	}

	/** @test */
	public function is_rewrites_enabled_will_return_true_if_enabled() {
		delete_option( 'faustwp_settings' );

		$this->assertFalse( is_rewrites_enabled() );

		update_option( 'faustwp_settings', array( 'enable_rewrites' => '1' ) );

		$this->assertTrue( is_rewrites_enabled() );
	}

	/** @test */
	public function is_themes_disabled_will_return_true_if_disabled() {
		delete_option( 'faustwp_settings' );

		$this->assertFalse( is_themes_disabled() );

		update_option( 'faustwp_settings', array( 'disable_theme' => '1' ) );

		$this->assertTrue( is_themes_disabled() );
	}

	/** @test */
	public function is_image_source_replacement_enabled_will_return_true_if_disabled() {
		delete_option( 'faustwp_settings' );

		$this->assertFalse( is_image_source_replacement_enabled() );

		update_option( 'faustwp_settings', array( 'enable_image_source' => '1' ) );

		$this->assertTrue( is_image_source_replacement_enabled() );
	}

	/**
	 * Tests faustwp_get_settings() returns empty array when no settings exist.
	 */
	public function test_faustwp_get_settings_returns_empty_array() {
		$this->assertSame( [], faustwp_get_settings() );
	}

	/**
	 * Test faustwp_get_setting() returns false when fetching non-existent setting.
	 */
	public function test_faustwp_get_setting_returns_false() {
		$this->assertFalse( faustwp_get_setting( 'moo' ) );
	}

	/**
	 * Test faustwp_get_setting() returns supplied default value when requested setting doesn't exist.
	 */
	public function test_faustwp_get_setting_default_value_returns_expected_value() {
		$this->assertSame( 'cow', faustwp_get_setting( 'moo', 'cow' ) );
	}

	/**
	 * Test faustwp_get_setting() returns filtered value.
	 */
	public function test_faustwp_get_setting_returns_expected_value_when_filtered() {
		add_filter( 'faustwp_get_setting', [ $this, 'faustwp_get_setting_test_filtered_value' ] );
		$this->assertSame( 'filtered value', faustwp_get_setting( 'moo', 'this default value should not be returned because of the filter' ) );
		remove_filter( 'faustwp_get_setting', [ $this, 'faustwp_get_setting_test_filtered_value' ] );
	}

	/**
	 * Test get_secret_key() returns empty string when no secret key exists.
	 */
	public function test_get_secret_key_is_empty_string() {
		$this->assertSame( '', get_secret_key() );
	}

	/**
	 * Test get_secret_key() returns expected value from database.
	 */
	public function test_get_secret_key_returns_expected_value() {
		faustwp_update_setting( 'secret_key', 'abc123' );
		$this->assertSame( 'abc123', get_secret_key() );
	}

	/**
	 * Used to filter return value of faustwp_get_setting() via faustwp_get_setting filter.
	 * @return string
	 */
	public function faustwp_get_setting_test_filtered_value() {
		return 'filtered value';
	}

	/**
	 * Tests that plugin_action_links_faustwp/faustwp.php has callback attached.
	 */
	public function test_plugin_action_links_has_settings_callback_attached() {
		$this->assertSame( 10, has_action( 'plugin_action_links_faustwp/faustwp.php', 'WPE\FaustWP\Settings\add_action_link_settings' ) );
	}
}
