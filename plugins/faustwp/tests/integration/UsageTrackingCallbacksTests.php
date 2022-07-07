<?php
/**
 * Class UsageTrackingCallbacksTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

class UsageTrackingCallbacksTests extends \WP_UnitTestCase {
	public function setUp(): void {
		parent::setUp();
	}

	public function test_the_callbacks_are_registered() {
		$this->assertSame( 10, has_action( 'admin_notices', 'WPE\FaustWP\Usage_Tracking\show_prompt' ) );
		$this->assertSame( 10, has_action( 'admin_footer', 'WPE\FaustWP\Usage_Tracking\print_scripts' ) );
		$this->assertSame( 10, has_action( 'wp_ajax_faustwp_plugin_usage_tracking', 'WPE\FaustWP\Usage_Tracking\ajax_maybe_dismiss_prompt' ) );
	}
}
