<?php
/**
 * Class UsageTrackingFunctionsTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use const WPE\FaustWP\Usage_Tracking\DISMISSED_USAGE_TRACKING_META_KEY;
use function WPE\FaustWP\Settings\faustwp_update_setting;
use function WPE\FaustWP\Usage_Tracking\{
	needs_prompt,
};

class UsageTrackingFunctionsTests extends \WP_UnitTestCase {
	public function setUp(): void {
		parent::setUp();

		$user_id = $this->factory->user->create();
		wp_set_current_user( $user_id );
		delete_user_meta( $user_id, DISMISSED_USAGE_TRACKING_META_KEY );
	}

	public function test_needs_prompt_returns_false_when_already_dismissed() {
		update_user_meta( get_current_user_id(), DISMISSED_USAGE_TRACKING_META_KEY, '1' );
		faustwp_update_setting( 'enable_usage_tracking', '0' );

		$this->assertFalse( needs_prompt() );
	}

	public function test_needs_prompt_returns_false_when_user_tracking_is_enabled() {
		faustwp_update_setting( 'enable_usage_tracking', '1' );

		$this->assertFalse( needs_prompt() );
	}

	public function test_needs_prompt_returns_true_otherwise() {
		$this->assertTrue( needs_prompt() );
	}
}
