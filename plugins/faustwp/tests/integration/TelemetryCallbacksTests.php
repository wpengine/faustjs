<?php
/**
 * Class TelemetryCallbacksTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Unit;

use \WP_UnitTestCase;

class TelemetryCallbacksTests extends WP_UnitTestCase {
    public function test_show_telemetry_prompt_is_hooked_to_admin_notices(): void {
        self::assertSame( 10, has_action( 'admin_notices', 'WPE\FaustWP\Telemetry\show_telemetry_prompt' ) );
    }
}