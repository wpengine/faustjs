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
class UtilitiesFunctionsTests extends \WP_UnitTestCase {
    /**
     * Setup runs before every test.
     */
    protected function setUp(): void {
        parent::setUp();
    }

    /**
     * Cleanup runs after every test.
     */
    protected function tearDown(): void {
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
}
