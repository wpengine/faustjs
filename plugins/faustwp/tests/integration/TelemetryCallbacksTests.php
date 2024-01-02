<?php
/**
 * Class TelemetryCallbacksTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use \WP_UnitTestCase;
use function \wp_set_current_user;

use function WPE\FaustWP\Settings\faustwp_update_setting;
use function WPE\FaustWP\Telemetry\{
	show_telemetry_prompt,
	telemetry_notice_text,
	should_show_telemetry_prompt,
};

class TelemetryCallbacksTests extends WP_UnitTestCase {
	public function setUp(): void {
		parent::setUp();
		wp_set_current_user( 1 );
		do_action( 'init');
		global $pagenow;
		$pagenow = 'settings_page_faustwp-settings';
	}

	public function tearDown(): void {
		wp_set_current_user( null );
		faustwp_update_setting( 'telemetry_reminder', '0' );
		global $pagenow;
		unset( $pagenow );
		parent::tearDown();
	}

	public function test_show_telemetry_prompt_is_hooked_to_admin_notices(): void {
		self::assertSame( 10, has_action( 'admin_notices', 'WPE\FaustWP\Telemetry\show_telemetry_prompt' ) );
	}

	public function test_telemetry_script_is_registered(): void {
		set_current_screen( 'admin.php' );
		do_action( 'admin_enqueue_scripts', 'settings_page_faustwp-settings' );
		self::assertTrue( wp_script_is( 'faustwp-telemetry-handler', 'registered' ) );
	}

	public function test_should_show_telemetry_prompt_returns_true_by_default_for_admin_users(): void {
		self::assertTrue( should_show_telemetry_prompt() );
	}

	public function test_should_show_telemetry_prompt_returns_false_when_user_does_not_have_proper_capabilities(): void {
		wp_set_current_user( null );
		self::assertFalse( should_show_telemetry_prompt() );
	}

	public function test_should_show_telemetry_prompt_returns_false_when_user_already_opted_in(): void {
		faustwp_update_setting( 'enable_telemetry', '1' );
		self::assertFalse( should_show_telemetry_prompt() );
	}

	public function test_should_show_telemetry_prompt_returns_false_when_user_already_opted_out(): void {
		faustwp_update_setting( 'enable_telemetry', 'no' );
		self::assertFalse( should_show_telemetry_prompt() );
	}

	public function test_should_show_telemetry_prompt_returns_false_when_user_selected_remind_me_later_and_current_time_is_before_reminder_time(): void {
		$reminder_time = new \DateTime( '+90 days', new \DateTimeZone( 'UTC' ) );
		faustwp_update_setting( 'telemetry_reminder', $reminder_time->getTimestamp() );
		self::assertFalse( should_show_telemetry_prompt() );
	}

	public function test_should_show_telemetry_prompt_returns_true_when_user_selected_remind_me_later_and_current_time_is_after_reminder_time(): void {
		$reminder_time = new \DateTime( '-1 day', new \DateTimeZone( 'UTC' ) );
		faustwp_update_setting( 'telemetry_reminder', $reminder_time->getTimestamp() );
		self::assertTrue( should_show_telemetry_prompt() );
	}

	public function test_show_telemetry_prompt_shows_notice_when_user_selected_remind_me_later_and_current_time_is_after_reminder_time(): void {
		$reminder_time = new \DateTime( '-1 day', new \DateTimeZone( 'UTC' ) );
		faustwp_update_setting( 'telemetry_reminder', $reminder_time->getTimestamp() );
		self::expectOutputString( telemetry_notice_text() );
		show_telemetry_prompt();
	}
}