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

}
