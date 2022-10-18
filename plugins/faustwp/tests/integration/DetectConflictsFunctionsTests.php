<?php
/**
 * Class DetectConflictsFunctionsTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use const WPE\FaustWP\Detect_Conflicts\DISMISSED_CONFLICTS_META_KEY;
use function WPE\FaustWP\Detect_Conflicts\{
	get_plugin_conflict_list,
	get_plugin_conflicts,
	get_conflicts_dismissed,
	delete_conflicts_dismissed,
	is_conflict_dismissed,
	dismiss_active_conflicts
};

class DetectConflictsFunctionsTests extends \WP_UnitTestCase {

	/** These plugins come installed with WP Unit */
	protected $conflict_list = [
		'hello.php',
		'akismet/akismet.php',
	];

	public function setUp(): void {
		parent::setUp();

		$user_id = $this->factory->user->create();
		wp_set_current_user( $user_id );
		delete_user_meta( $user_id, DISMISSED_CONFLICTS_META_KEY );
	}

	public function tearDown(): void {
		deactivate_plugins( $this->conflict_list );
	}

	public function test_get_plugin_conflict_list_returns_array() {
		$this->assertIsArray( get_plugin_conflict_list() );
	}

	public function test_get_plugin_conflicts_excludes_inactive_plugins() {
		deactivate_plugins( $this->conflict_list );
		$conflicts = get_plugin_conflicts( $this->conflict_list );
		$this->assertIsArray( $conflicts );
		$this->assertEmpty( $conflicts );
	}

	public function test_get_plugin_conflicts_includes_active_plugins() {
		$active_plugin = $this->conflict_list[0];
		activate_plugin( $active_plugin );

		$conflicts = get_plugin_conflicts( $this->conflict_list );
		$expected = [ $active_plugin ];
		$this->assertSame( $expected, $conflicts );
	}

	public function test_get_plugin_conflicts_excludes_dismissed() {
		$dismissed = $this->conflict_list[0];
		update_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, [ $dismissed ] );

		activate_plugins( $this->conflict_list );

		$conflicts = get_plugin_conflicts( $this->conflict_list );
		$this->assertNotContains( $dismissed, $conflicts );
	}

	public function test_get_plugin_conflicts_can_include_dismissed() {
		$dismissed = $this->conflict_list[0];
		update_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, [ $dismissed ] );

		activate_plugins( $this->conflict_list );

		$conflicts = get_plugin_conflicts( $this->conflict_list, true );
		$this->assertContains( $dismissed, $conflicts );
	}

	public function test_get_conflicts_dismissed_defauts_to_empty_array() {
		$dismissed = get_conflicts_dismissed();
		$this->assertIsArray( $dismissed );
		$this->assertEmpty( $dismissed );
	}

	public function test_get_conflicts_dismissed_returns_dismissed_plugins() {
		update_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, $this->conflict_list );
		$dismissed = get_conflicts_dismissed();
		$this->assertSame( $this->conflict_list, $dismissed );
	}

	public function test_delete_conflicts_dismissed_returns_false_when_dismissed_is_unset() {
		$dismissed = get_conflicts_dismissed();
		$this->assertIsArray( $dismissed );
		$this->assertEmpty( $dismissed );

		$result = delete_conflicts_dismissed();

		$this->assertFalse( $result );
	}

	public function test_delete_conflicts_dismissed_deletes_dismissed_conflicts() {
		update_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, $this->conflict_list );

		$result = delete_conflicts_dismissed();
		$this->assertTrue( $result );

		$dismissed = get_conflicts_dismissed();
		$this->assertIsArray( $dismissed );
		$this->assertEmpty( $dismissed );
	}

	public function test_is_conflict_dismissed_returns_true_for_dismissed_conflicts() {
		update_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, $this->conflict_list );

		$this->assertTrue( is_conflict_dismissed($this->conflict_list[0]) );
		$this->assertTrue( is_conflict_dismissed($this->conflict_list[1]) );
	}

	public function test_is_conflict_dismissed_returns_false_for_undismissed_conflicts() {
		$dismissed   = $this->conflict_list[0];
		$undismissed = $this->conflict_list[1];
		update_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, [ $dismissed ] );

		$this->assertTrue( is_conflict_dismissed( $dismissed ) );
		$this->assertFalse( is_conflict_dismissed( $undismissed ) );
	}

	public function test_dismiss_active_conflicts_dismisses_conflicts() {
		$dismissed = get_conflicts_dismissed();
		$this->assertEmpty( $dismissed );

		activate_plugins( $this->conflict_list );
		dismiss_active_conflicts( $this->conflict_list );

		$dismissed = get_conflicts_dismissed();
		$this->assertSame( $this->conflict_list, $dismissed );
	}

	public function test_dismiss_active_conflicts_does_not_dismiss_inactive_conflicts() {
		$dismissed = get_conflicts_dismissed();
		$this->assertEmpty( $dismissed );

		deactivate_plugins( $this->conflict_list );
		dismiss_active_conflicts( $this->conflict_list );

		$dismissed = get_conflicts_dismissed();
		$this->assertEmpty( $dismissed );
	}

	public function test_dismiss_active_conflicts_does_not_duplicate_dismissals() {
		activate_plugins( $this->conflict_list );
		dismiss_active_conflicts( $this->conflict_list );

		$dismissed = get_conflicts_dismissed();
		$this->assertSame( $this->conflict_list, $dismissed );

		deactivate_plugins( $this->conflict_list );
		activate_plugin( $this->conflict_list[0] );

		dismiss_active_conflicts( $this->conflict_list );

		$dismissed = get_conflicts_dismissed();
		$this->assertSame( $this->conflict_list, $dismissed );
	}
}
