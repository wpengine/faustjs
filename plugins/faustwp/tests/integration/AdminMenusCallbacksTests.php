<?php
/**
 * Class AdminMenusCallbacksTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

class AdminMenusCallbacksTests extends \WP_UnitTestCase {
	public function setUp(): void {
		parent::setUp();
	}

	public function test_the_callbacks_are_registered() {
		$this->assertSame( 1000, has_action( 'admin_menu', 'WPE\FaustWP\Admin_Menus\remove_admin_menu_pages' ) );
		$this->assertSame( 10, has_action( 'wp_before_admin_bar_render', 'WPE\FaustWP\Admin_Menus\remove_admin_bar_items' ) );
		$this->assertSame( 10, has_action( 'current_screen', 'WPE\FaustWP\Admin_Menus\prevent_admin_page_access' ) );
	}
}
