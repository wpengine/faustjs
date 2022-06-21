<?php
/**
 * Tests database upgrades.
 */

namespace WPE\FaustWP\Tests\Integration;

use \WP_UnitTestCase;
use function WPE\FaustWP\Updates\upgrade_database;

/**
 * Class UpdatesTestCases
 *
 * @package FaustWP
 */
class UpgradeDatabaseTests extends WP_UnitTestCase {

	protected $versions;

	public function setUp(): void {
		parent::setUp();

		$file_data      = get_file_data( FAUSTWP_FILE, array( 'Version' => 'Version' ) );
		$plugin_version = $file_data['Version'];

		$this->versions = array(
			'old'     => '0.5.0',
			'current' => $plugin_version,
			'new'     => $this->new_version( $plugin_version ),
		);
	}

	public function tearDown(): void {
		parent::tearDown();

		delete_option( 'faustwp_current_version' );
	}

	/**
	 * @covers ::\WPE\FaustWP\Updates\upgrade_database()
	 */
	public function test_upgrade_database_installed_new_version(): void {
		update_option( 'faustwp_current_version', $this->versions['old'] );

		self::assertTrue( upgrade_database() );
		self::assertEquals( get_option( 'faustwp_current_version' ), $this->versions['current'] );
	}

	/**
	 * @covers ::\WPE\FaustWP\Updates\upgrade_database()
	 */
	public function test_upgrade_database_no_saved_version(): void {
		self::assertTrue( upgrade_database() );
		self::assertEquals( get_option( 'faustwp_current_version' ), $this->versions['current'] );
	}

	/**
	 * @covers ::\WPE\FaustWP\Updates\upgrade_database()
	 */
	public function test_upgrade_database_current_version(): void {
		update_option( 'faustwp_current_version', $this->versions['current'] );

		self::assertFalse( upgrade_database() );
		self::assertEquals( get_option( 'faustwp_current_version' ), $this->versions['current'] );
	}



	/**
	 * @covers ::\WPE\FaustWP\Updates\upgrade_database()
	 */
	public function test_upgrade_database_installed_old_version(): void {
		update_option( 'faustwp_current_version', $this->versions['new'] );

		self::assertFalse( upgrade_database() );
		self::assertEquals( get_option( 'faustwp_current_version' ), $this->versions['new'] );
	}

	/**
	 * Increments the patch version supplied for easier testing
	 *
	 * @param string $old_version The version to increment.
	 *
	 * @return string
	 */
	protected function new_version( $old_version ) {
		$version_parts = explode( '.', $old_version );

		$version_parts[2] = strval( intval( $version_parts[2] ) + 1 );

		return implode( '.', $version_parts );
	}
}
