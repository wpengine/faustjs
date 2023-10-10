<?php
/**
 * BlocksFunctionsTests class
 *
 * This class is responsible for testing functions related to block operations.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

/**
 * Test cases for block-related functions.
 */
class BlocksFunctionsTests extends \WP_UnitTestCase {
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
     * Set up test environment.
     */
    public function setUp(): void {
        parent::setUp();

        // Fetch the default uploads directory.
        $uploads = wp_upload_dir();

        // Construct paths for test directory and test zip file.
        $this->testDir = trailingslashit( $uploads['basedir'] ) . 'test_directory';
        $this->testZip = trailingslashit( $uploads['basedir'] ) . 'test.zip';

        // Create test directory if it doesn't exist.
        if ( ! is_dir( $this->testDir ) ) {
            mkdir( $this->testDir, 0777, true );
        }
    }

    /**
     * Tear down test environment.
     */
    public function tearDown(): void {
        // Remove the test directory if it exists.
        if ( is_dir( $this->testDir ) ) {
            rrmdir( $this->testDir );
        }

        // Remove the test zip file if it exists.
        if ( file_exists( $this->testZip ) ) {
            unlink( $this->testZip );
        }

        parent::tearDown();
    }

    /**
     * Test the unzip_to_directory function for success scenario.
     */
    public function testUnzipToDirectory() {
        // Create a dummy zip file for testing.
        $zip = new \ZipArchive();
        $zip->open( $this->testZip, \ZipArchive::CREATE );
        $zip->addFromString( 'testfile.txt', 'Test content' );
        $zip->close();

        // Check if the function successfully unzips and removes the zip file.
        $this->assertTrue( unzip_to_directory( $this->testZip, $this->testDir ) );
        $this->assertFileExists( $this->testDir . '/testfile.txt' );
        $this->assertFalse( file_exists( $this->testZip ) );
    }

    /**
     * Test the unzip_to_directory function for failure scenario.
     */
    public function testUnzipToDirectoryFail() {
        // Test the function with a non-existent zip file.
        $this->assertFalse( unzip_to_directory( 'nonexistent.zip', $this->testDir ) );
    }

    /**
     * Test the rrmdir function.
     */
    public function testRrmdir() {
        // Create a directory structure to test the rrmdir function.
        mkdir( $this->testDir . '/subdir' );
        touch( $this->testDir . '/file.txt' );
        touch( $this->testDir . '/subdir/file2.txt' );

        // Test if rrmdir successfully removes the directory and its contents.
        rrmdir( $this->testDir );
        $this->assertFalse( is_dir( $this->testDir ) );
    }
}
