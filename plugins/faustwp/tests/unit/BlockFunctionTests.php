<?php

namespace WPE\FaustWP\Tests\Unit;

use Mockery;
use WPE\FaustWP\Blocks;
use WP_Error;
use Brain\Monkey;
use function Brain\Monkey\Functions\stubs;

class BlockFunctionTests extends FaustUnitTest {

    public function setUp(): void {
        parent::setUp();
    }

    public function tearDown(): void {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test handle_uploaded_blockset with a valid file.
     */
    public function test_handle_uploaded_blockset_with_valid_file() {
        $file = [
            'name'     => 'test.zip',
            'type'     => 'application/zip',
            'tmp_name' => '/tmp/test.zip'
        ];
        $dirs = [
            'target' => '/path/to/target',
            'temp'   => '/path/to/temp'
        ];

        stubs([
            'WPE\FaustWP\Blocks\validate_uploaded_file'     => true,
            'WPE\FaustWP\Blocks\define_directories'         => $dirs,
            'WPE\FaustWP\Blocks\ensure_directories_exist'   => true,
            'WPE\FaustWP\Blocks\process_and_replace_blocks' => true,
        ]);

        $this->assertTrue( Blocks\handle_uploaded_blockset( $file ) );
    }

    /**
     * Test handle_uploaded_blockset with an invalid file type.
     */
    public function test_handle_uploaded_blockset_with_invalid_file_type() {
        $file = [
            'name'     => 'test.txt',
            'type'     => 'text/plain',
            'tmp_name' => '/tmp/test.txt'
        ];
    
        stubs([
            'WPE\FaustWP\Blocks\validate_uploaded_file' => function() {
                return new WP_Error( 'wrong_type', 'Not a zip file' );
            }
        ]);
    
        $result = Blocks\handle_uploaded_blockset( $file );
        $this->assertInstanceOf( WP_Error::class, $result );
        $this->assertEquals( 'wrong_type', $result->get_error_code() );
    }

    /**
     * Test validate_uploaded_file with a valid zip file.
     */
    public function test_validate_uploaded_file_with_valid_zip() {
        $file = [
            'type'     => 'application/zip',
            'tmp_name' => '/tmp/test.zip'
        ];

        $filesystem = Mockery::mock( WP_Filesystem_Base::class );
        $filesystem->shouldReceive( 'is_readable' )->with( $file['tmp_name'] )->andReturn( true );

        $this->assertTrue( Blocks\validate_uploaded_file( $filesystem, $file ) );
    }

    /**
     * Test validate_uploaded_file with an invalid file type.
     */
    public function test_validate_uploaded_file_with_invalid_type() {
        $file = [
            'type'     => 'text/plain',
            'tmp_name' => '/tmp/test.txt'
        ];

        $filesystem = Mockery::mock( WP_Filesystem_Base::class );

        $result = Blocks\validate_uploaded_file( $filesystem, $file );
        $this->assertInstanceOf( WP_Error::class, $result );
        $this->assertEquals( 'wrong_type', $result->get_error_code() );
    }

    /**
     * Test validate_uploaded_file with a non-readable file.
     */
    public function test_validate_uploaded_file_with_non_readable_file() {
        $file = [
            'type'     => 'application/zip',
            'tmp_name' => '/tmp/test.zip'
        ];

        $filesystem = Mockery::mock( WP_Filesystem_Base::class );
        $filesystem->shouldReceive( 'is_readable' )->with( $file['tmp_name'] )->andReturn( false );

        $result = Blocks\validate_uploaded_file( $filesystem, $file );
        $this->assertInstanceOf( WP_Error::class, $result );
        $this->assertEquals( 'file_read_error', $result->get_error_code() );
    }

    /**
     * Test define_directories to ensure it returns correct paths.
     */
    public function test_define_directories() {
        $dirs = Blocks\define_directories();

        $this->assertIsArray( $dirs );
        $this->assertArrayHasKey( 'target', $dirs );
        $this->assertArrayHasKey( 'temp', $dirs );
    }

    /**
     * Test ensure_directories_exist for existing directories.
     */
    public function test_ensure_directories_exist() {
        $dirs = Blocks\define_directories();

        $filesystem = Mockery::mock( 'WP_Filesystem_Base' );
        $filesystem->shouldReceive( 'is_dir' )->andReturn( true );
        $filesystem->shouldReceive( 'mkdir' )->andReturn( true );

        $this->assertTrue( Blocks\ensure_directories_exist( $dirs ) );
    }

    /**
     * Regression guard for #2311: when unzip_uploaded_file() returns a WP_Error,
     * process_and_replace_blocks() must call $wp_filesystem->delete( $target_file )
     * before returning, so the orphaned zip doesn't accumulate at the predictable
     * path under wp-content/uploads/faustwp/blocks/.
     *
     * Verified red-on-revert: removing the delete line from
     * includes/blocks/functions.php fails this test's Mockery once() expectation.
     */
    public function test_process_and_replace_blocks_cleans_up_on_unzip_failure() {
        $file = [
            'name'     => 'mock.zip',
            'type'     => 'application/zip',
            'tmp_name' => '/tmp/mock.zip',
        ];
        $dirs = [
            'target' => '/uploads/blocks',
            'temp'   => '/uploads/blocks/tmp',
        ];
        $target_file = '/uploads/blocks/mock.zip';
        $error       = new WP_Error( 'unzip_error', 'mock unzip failure' );

        stubs([
            // Internal helpers: success on move, error on unzip. cleanup must NOT
            // run on the error path; if it does, fail loudly so we catch a future
            // regression where the early return is removed.
            'WPE\FaustWP\Blocks\move_uploaded_file'     => true,
            'WPE\FaustWP\Blocks\unzip_uploaded_file'    => $error,
            'WPE\FaustWP\Blocks\cleanup_temp_directory' => function () {
                throw new \LogicException( 'cleanup_temp_directory must not run on the unzip-failure path' );
            },
            // WP global helpers: keep the target-file path deterministic so the
            // Mockery ->with() expectation matches without depending on Brain
            // Monkey's default passthroughs.
            'trailingslashit'    => function ( $s ) { return rtrim( $s, '/' ) . '/'; },
            'sanitize_file_name' => function ( $s ) { return $s; },
        ]);

        $filesystem = Mockery::mock( 'WP_Filesystem_Base' );
        $filesystem->shouldReceive( 'delete' )
            ->with( $target_file )
            ->once();

        $result = Blocks\process_and_replace_blocks( $filesystem, $file, $dirs );

        $this->assertInstanceOf( WP_Error::class, $result );
        $this->assertSame( $error, $result );
    }

    /**
     * Success path: when both move and unzip succeed, process_and_replace_blocks()
     * must NOT call $wp_filesystem->delete( $target_file ) (the extracted blocks
     * remain in place) and must invoke cleanup_temp_directory() for the staging dir.
     *
     * Inverse of the regression-guard test above: catches a future change that
     * over-aggressively deletes the target on the happy path.
     */
    public function test_process_and_replace_blocks_success_path_does_not_delete_target() {
        $file = [
            'name'     => 'mock.zip',
            'type'     => 'application/zip',
            'tmp_name' => '/tmp/mock.zip',
        ];
        $dirs = [
            'target' => '/uploads/blocks',
            'temp'   => '/uploads/blocks/tmp',
        ];

        $cleanup_called = false;
        stubs([
            'WPE\FaustWP\Blocks\move_uploaded_file'     => true,
            'WPE\FaustWP\Blocks\unzip_uploaded_file'    => true,
            'WPE\FaustWP\Blocks\cleanup_temp_directory' => function () use ( &$cleanup_called ) {
                $cleanup_called = true;
            },
            'trailingslashit'    => function ( $s ) { return rtrim( $s, '/' ) . '/'; },
            'sanitize_file_name' => function ( $s ) { return $s; },
        ]);

        $filesystem = Mockery::mock( 'WP_Filesystem_Base' );
        $filesystem->shouldNotReceive( 'delete' );

        $result = Blocks\process_and_replace_blocks( $filesystem, $file, $dirs );

        $this->assertTrue( $result );
        $this->assertTrue( $cleanup_called, 'cleanup_temp_directory must run on the success path.' );
    }

}
