<?php
/**
 * Class DetectConflictsCallbacksTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

class DetectConflictsCallbacksTests extends \WP_UnitTestCase {
	public function setUp(): void {
		parent::setUp();
	}

	public function test_the_callbacks_are_registered() {
		$this->assertSame( 10, has_action( 'admin_notices', 'WPE\FaustWP\Detect_Conflicts\show_warning' ) );
		$this->assertSame( 10, has_action( 'admin_footer', 'WPE\FaustWP\Detect_Conflicts\print_scripts' ) );
		$this->assertSame( 10, has_action( 'wp_ajax_faustwp_plugin_conflicts', 'WPE\FaustWP\Detect_Conflicts\ajax_maybe_dismiss_conflicts' ) );
	}
}
