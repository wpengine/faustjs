<?php

namespace WPE\FaustWP\Tests\Unit;

use Brain\Monkey\Functions;

use function WPE\FaustWP\Settings\{
	add_settings_assets,
	register_settings_menu,
	register_settings,
	register_settings_section,
	register_settings_fields,
	sanitize_faustwp_settings,
	handle_regenerate_secret_key,
	verify_graphql_dependency,
	add_action_link_settings,
	trim_frontend_uri_trailing_slash
};

class SettingsPageTests extends FaustUnitTest {

	public function test_verify_graphql_dependency() {
		verify_graphql_dependency();
		self::assertNotFalse( has_action( 'admin_enqueue_scripts', 'WPE\FaustWP\Settings\add_settings_assets' ) );
	}

	public function test_settings_action_callbacks() {
		self::assertNotFalse( has_action( 'admin_menu', 'WPE\FaustWP\Settings\register_settings_menu' ) );
		self::assertNotFalse( has_action( 'admin_init', 'WPE\FaustWP\Settings\register_settings' ) );
		self::assertNotFalse( has_action( 'admin_init', 'WPE\FaustWP\Settings\register_settings_section' ) );
		self::assertNotFalse( has_action( 'admin_init', 'WPE\FaustWP\Settings\register_settings_fields' ) );
		self::assertNotFalse( has_action( 'load-settings_page_faustwp-settings', 'WPE\FaustWP\Settings\handle_regenerate_secret_key' ) );
	}

	public function test_settings_filter_callbacks() {
		self::assertNotFalse( has_filter( 'sanitize_option_faustwp_settings', 'WPE\FaustWP\Settings\sanitize_faustwp_settings' ) );
		self::assertNotFalse( has_filter( 'plugin_action_links_faustwp/faustwp.php', 'WPE\FaustWP\Settings\add_action_link_settings' ) );
		self::assertNotFalse( has_filter( 'faustwp_get_setting', 'WPE\FaustWP\Settings\trim_frontend_uri_trailing_slash' ) );
	}
}
