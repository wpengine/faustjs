<?php
/**
 * Class AdminMenuPageTest
 */
class AdminMenuPageTest extends WP_UnitTestCase {
	public function test_admin_menu_hook_has_action_added(): void {
		self::assertSame( 10, has_action( 'admin_menu', 'WPE\ContentModel\Settings\register_admin_menu_page' ) );
	}
}
