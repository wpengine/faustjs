<?php

namespace WPE\FaustWP\Tests;

use Brain\Monkey\Functions;
use WPE\FaustWP\Blocks;
use WPE\FaustWP\Tests\Unit\FaustUnitTest;

/**
 * Test_Blocks class.
 */
class BlocksCallbacksTests extends FaustUnitTest {

	/**
	 * Test that register_custom_blocks() only initializes once.
	 */
	public function test_register_custom_blocks_initializes_once() {
		$this->assertTrue( function_exists( 'WPE\FaustWP\Blocks\register_custom_blocks' ) );

		Blocks\register_custom_blocks(); // First initialization

		// Expect register_block_type() not to be called again during second initialization.
		Functions\expect( 'register_block_type' )->never();

		Blocks\register_custom_blocks(); // Second initialization
	}

	/**
	 * Test register_custom_blocks() when no directory exists.
	 */
	public function test_register_custom_blocks_no_directory() {
		Functions\when( 'is_dir' )->justReturn( false );

		Blocks\register_custom_blocks();

		Functions\expect( 'register_block_type' )->never();
	}

	/**
	 * Test register_custom_blocks() when there are no blocks.
	 */
	public function test_register_custom_blocks_no_blocks() {
		Functions\when( 'is_dir' )->justReturn( true );
		Functions\when( 'glob' )->justReturn( [] );

		Blocks\register_custom_blocks();

		Functions\expect( 'register_block_type' )->never();
	}

	/**
	 * Test register_custom_blocks() when block.json is missing.
	 */
	public function test_register_custom_blocks_missing_block_json() {
		Functions\when( 'is_dir' )->justReturn( true );
		Functions\when( 'glob' )->justReturn( [ '/path/to/block1' ] );
		Functions\when( 'file_exists' )->justReturn( false );

		Blocks\register_custom_blocks();

		Functions\expect( 'register_block_type' )->never();
	}

	/**
	 * Test if correct_asset_src_for_uploads_dir() modifies the source URL correctly.
	 */
	public function test_correct_asset_src_for_uploads_dir() {
		$test_url     = 'http://example.com/wp-content/plugins/Users/luke.skywalker/Local Sites/faust/app/public/wp-content/uploads/faustwp/blocks/block-a/style.css';
		$expected_url = 'http://example.com/wp-content/uploads/faustwp/blocks/test-block/style.css';

		Functions\when( 'wp_upload_dir' )->justReturn( [
			'basedir' => '/path/to/wp-content/uploads',
			'baseurl' => 'http://example.com/wp-content/uploads'
		] );

		$result_url = Blocks\correct_asset_src_for_uploads_dir( $test_url, 'test-handle' );
		$this->assertEquals( $expected_url, $result_url );
	}

	/**
	 * Test correct_asset_src_for_uploads_dir() when URL doesn't contain 'faustwp/blocks'.
	 */
	public function test_correct_asset_src_no_faustwp_blocks() {
		$test_url     = 'http://example.com/wp-content/plugins/plugin-name/other-path/test-block/style.css';
		$expected_url = $test_url; // Should remain unchanged.

		$result_url = Blocks\correct_asset_src_for_uploads_dir( $test_url, 'test-handle' );
		$this->assertEquals( $expected_url, $result_url );
	}

	/**
	 * Test correct_asset_src_for_uploads_dir() when wp_upload_dir() fails.
	 */
	public function test_correct_asset_src_failed_upload_dir() {
		$test_url = 'http://example.com/wp-content/plugins/plugin-name/faustwp/blocks/test-block/style.css';

		Functions\when( 'wp_upload_dir' )->justReturn( false );

		$result_url = Blocks\correct_asset_src_for_uploads_dir( $test_url, 'test-handle' );
		$this->assertEquals( $test_url, $result_url ); // Should remain unchanged.
	}
}
