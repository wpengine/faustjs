<?php
/**
 * Tests for the utility functions in the FaustWP plugin.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use WPE\FaustWP\Utilities;

/**
 * Class UtilitiesTest
 */
class UtilitiesTest extends \WP_UnitTestCase {
    /**
     * Path to the test directory.
     *
     * @var string
     */
    private $testDir;

    /**
     * Path to the test zip file.
     *
     * @var string
     */
    private $testZip;

    /**
     * Setup runs before every test.
     */
    protected function setUp(): void {
        parent::setUp();

        $this->testDir = sys_get_temp_dir() . '/faustwp_test_directory';
        $this->testZip = sys_get_temp_dir() . '/test.zip';
    }

    /**
     * Cleanup runs after every test.
     */
    protected function tearDown(): void {
        if ( is_dir( $this->testDir ) ) {
            Utilities\rrmdir( $this->testDir );
        }

        if ( file_exists( $this->testZip ) ) {
            unlink( $this->testZip );
        }

        parent::tearDown();
    }

    /**
     * Test the camelcase function.
     */
    public function testCamelcase() {
        $this->assertSame( 'helloWorld', Utilities\camelcase( 'Hello world' ) );
        $this->assertSame( 'helloWorldTest', Utilities\camelcase( 'Hello-world-test' ) );
        $this->assertSame( 'hello1World2Test', Utilities\camelcase( 'Hello 1-world-2 test' ) );
        $this->assertSame( 'helloWorld$Test', Utilities\camelcase( 'Hello world $ test', array( '$' ) ) );
        $this->assertSame( 'helloWorld', Utilities\camelcase( '  Hello  world  ' ) ); // Test with extra spaces
    }

    /**
     * Test the plugin_version function.
     */
    public function testPluginVersion() {
        // This test assumes FAUSTWP_FILE is defined correctly.
        $this->assertIsString( Utilities\plugin_version() );
    }

    /**
     * Test the unzip_to_directory function.
     */
    public function testUnzipToDirectory() {
        // Create a dummy zip file for testing.
        $zip = new \ZipArchive();
        $zip->open( $this->testZip, \ZipArchive::CREATE );
        $zip->addFromString( 'testfile.txt', 'Test content' );
        $zip->close();

        $this->assertTrue( Utilities\unzip_to_directory( $this->testZip, $this->testDir ) );
        $this->assertFileExists( $this->testDir . '/testfile.txt' );
        $this->assertFalse( file_exists( $this->testZip ) );

        // Test non-existent file.
        $this->assertFalse( Utilities\unzip_to_directory( 'nonexistent.zip', $this->testDir ) );
    }

    /**
     * Test the rrmdir function.
     */
    public function testRrmdir() {
        mkdir( $this->testDir . '/subdir', 0777, true );
        touch( $this->testDir . '/file.txt' );
        touch( $this->testDir . '/subdir/file2.txt' );

        Utilities\rrmdir( $this->testDir );
        $this->assertFalse( is_dir( $this->testDir ) );

        // Test rrmdir on non-existent directory.
        Utilities\rrmdir( $this->testDir );
        $this->assertFalse( is_dir( $this->testDir ) );
    }
}
