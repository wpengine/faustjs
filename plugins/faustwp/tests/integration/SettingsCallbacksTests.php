<?php
/**
 * Class SettingsCallbacksTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Settings\sanitize_faustwp_settings;

class SettingsCallbacksTests extends \WP_UnitTestCase {

	protected $option = 'faustwp_settings';

	protected $init_settings = [
		'frontend_uri' => 'http://localhost:3000',
		'secret_key' => '2b9b7ec9-73f8-407d-b5b3-6f3e56bb555d',
		'menu_locations' => 'Primary, Footer',
		'enable_redirects' => '1',
		'enable_rewrites' => '1',
		'disable_theme' => '1',
	];

	public function setUp(): void {
		parent::setUp();
		update_option( $this->option, $this->init_settings );
		// We have to clear this manually since all tests execute in a single "request"
		$GLOBALS['wp_settings_errors'] = [];
	}

	public function test_the_sanitize_option_filter_is_registered() {
		$this->assertSame( 10, has_action( 'sanitize_option_faustwp_settings', 'WPE\FaustWP\Settings\sanitize_faustwp_settings' ) );
	}

	public function test_faustwp_get_setting_filter_is_registered() {
		$this->assertSame( 10, has_action( 'faustwp_get_setting', 'WPE\FaustWP\Settings\trim_frontend_uri_trailing_slash' ) );
	}

	public function test_sanitize_faustwp_settings_does_not_change_existing_settings() {
		$this->assertSame( $this->init_settings, sanitize_faustwp_settings( $this->init_settings, $this->option ) );
	}

	public function test_sanitize_faustwp_settings_allows_valid_frontend_uris() {
		$valid_uris = [
			// Clean URLs
			'' => '',
			'http://localhost:3000' => 'http://localhost:3000',
			'https://headless.com/my%20page' => 'https://headless.com/my%20page',
			'http://localhost:3000/page/?query=headless&page=1' => 'http://localhost:3000/page/?query=headless&page=1',
			// Dirty URLs
			'  https://localhost:3000/  ' => 'https://localhost:3000/%20%20',
			'http://localhost:3000/"^<>{}`' => 'http://localhost:3000/',
			'https://headless.com?foo[bar]=baz' => 'https://headless.com?foo%5Bbar%5D=baz',
		];

		foreach ( $valid_uris as $in => $out ) {
			$updates['frontend_uri'] = $in;
			$sanitized = sanitize_faustwp_settings( $updates, $this->option );

			$this->assertSame( $out, $sanitized['frontend_uri'] );

			$errors = get_settings_errors( $this->option );
			$this->assertCount( 0, $errors );
		}
	}

	public function test_sanitize_faustwp_settings_rejects_invalid_frontend_uris() {
		$invalid_uris = [
			'localhost:3000',
			'my.example.com',
			'//example.com',
			'ftp://files.com',
			'/headless',
			'http://',
		];

		foreach ( $invalid_uris as $url ) {
			$updates['frontend_uri'] = $url;
			$sanitized = sanitize_faustwp_settings( $updates, $this->option );

			// Keeps existing value.
			$this->assertSame( $this->init_settings['frontend_uri'], $sanitized['frontend_uri'] );

			$errors = get_settings_errors( $this->option );
			$this->assertCount( 1, $errors );
			$this->assertEquals( $errors[0]['code'], 'faustwp_invalid_frontend_uri' );
			// Clear errors between test cases.
			$GLOBALS['wp_settings_errors'] = [];
		}
	}

	public function test_sanitize_faustwp_settings_allows_valid_secret_key() {
		$updates['secret_key'] = '83ef3cfa-401b-4973-9371-af316a78275d';
		$sanitized = sanitize_faustwp_settings( $updates, $this->option );

		$this->assertSame( $updates['secret_key'], $sanitized['secret_key'] );

		$errors = get_settings_errors( $this->option );
		$this->assertCount( 0, $errors );
	}

	public function test_sanitize_faustwp_settings_rejects_invalid_secret_key() {
		$invalid_keys = [
			'',                                     // Can't be empty
			'83ef3cfa-401b-4973-9371-nonhexvalues', // Non hex values
			'83EF3CfA-401B-4973-9371-AF316A78275D', // Case sensitive
			'83ef-3cfa401b-4973-9371-af316a78275d', // Misplaced hyphen
			'83ef3cfa-401b-3973-9371-af316a78275d', // Not UUID V4
			'83ef3cfa-401b-4973-c371-af316a78275d', // Not UUID variant 1
		];

		foreach ( $invalid_keys as $key ) {
			$updates['secret_key'] = $key;
			$sanitized = sanitize_faustwp_settings( $updates, $this->option );

			// Keeps existing value.
			$this->assertSame( $this->init_settings['secret_key'], $sanitized['secret_key'] );

			$errors = get_settings_errors( $this->option );
			$this->assertCount( 1, $errors );
			$this->assertEquals( $errors[0]['code'], 'faustwp_invalid_secret_key' );
			// Clear errors between test cases.
			$GLOBALS['wp_settings_errors'] = [];
		}
	}

	public function test_sanitize_faustwp_settings_sanitizes_menu_locations() {
		$values = [
			'' => '',
			'Primary, Sidebar, Footer' => 'Primary, Sidebar, Footer',
			'Sidebar</div><script>alert("DANGER!");</script><div>' => 'Sidebar'
		];

		foreach ( $values as $in => $out ) {
			$updates['menu_locations'] = $in;
			$sanitized = sanitize_faustwp_settings( $updates, $this->option );

			$this->assertSame( $out, $sanitized['menu_locations'] );
		}
	}

	public function test_sanitize_faustwp_settings_sanitizes_checkboxes() {
		$checkbox_settings = [
			'enable_redirects',
			'enable_rewrites',
			'disable_theme',
			'enable_image_source',
		];

		$truthy = [ 1, '1', true, 'true', 'off', 42 ];
		$falsey = [ '', null, false, 0, "0" ];

		foreach ( $checkbox_settings as $setting ) {
			foreach ( $truthy as $value ) {
				$updates[ $setting ] = $value;
				$sanitized = sanitize_faustwp_settings( $updates, $this->option );
				$this->assertSame( '1', $sanitized[ $setting ] );
			}

			foreach ( $falsey as $value ) {
				$updates[ $setting ] = $value;
				$sanitized = sanitize_faustwp_settings( $updates, $this->option );
				$this->assertArrayNotHasKey( $setting, $sanitized );
			}
		}
	}

	public function test_sanitize_faustwp_settings_rejects_unknown_settings() {
		$updates = $this->init_settings;
		$updates['enable_magic'] = '1';
		$sanitized = sanitize_faustwp_settings( $updates, $this->option );

		// Settings should remain unchanged.
		$this->assertArrayNotHasKey( 'enable_magic', $sanitized );
		$this->assertSame( $this->init_settings, $sanitized );
	}
}
