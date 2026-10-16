<?php
/**
 * Class DenyPublicAccessFunctionsTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Deny_Public_Access\get_public_redirect_url;

class DenyPublicAccessFunctionsTests extends \WP_UnitTestCase {
	protected $frontend_uri = 'http://localhost:3000';

	public function test_get_public_redirect_url_keeps_path_and_query_for_root_install() {
		update_option( 'home', 'http://example.org' );

		$this->assertSame(
			'http://localhost:3000/sample-page/?foo=bar',
			get_public_redirect_url( '/sample-page/?foo=bar', $this->frontend_uri )
		);
	}

	public function test_get_public_redirect_url_strips_subdirectory_install_path() {
		update_option( 'home', 'http://example.org/wp' );

		$this->assertSame(
			'http://localhost:3000/sample-page/',
			get_public_redirect_url( '/wp/sample-page/', $this->frontend_uri )
		);
	}

	public function test_get_public_redirect_url_maps_subdirectory_root_to_frontend_root() {
		update_option( 'home', 'http://example.org/wp/' );

		$this->assertSame( 'http://localhost:3000/', get_public_redirect_url( '/wp/', $this->frontend_uri ) );
		$this->assertSame( 'http://localhost:3000/', get_public_redirect_url( '/wp', $this->frontend_uri ) );
		$this->assertSame( 'http://localhost:3000/?p=1', get_public_redirect_url( '/wp?p=1', $this->frontend_uri ) );
	}

	public function test_get_public_redirect_url_does_not_strip_a_partial_path_match() {
		update_option( 'home', 'http://example.org/wp' );

		$this->assertSame(
			'http://localhost:3000/wpfoo/page/',
			get_public_redirect_url( '/wpfoo/page/', $this->frontend_uri )
		);
	}

	public function test_get_public_redirect_url_keeps_frontend_path() {
		update_option( 'home', 'http://example.org/wp' );

		$this->assertSame(
			'https://example.com/app/sample-page/',
			get_public_redirect_url( '/wp/sample-page/', 'https://example.com/app' )
		);
	}

	public function test_get_public_redirect_url_keeps_query_for_subdirectory_install() {
		update_option( 'home', 'http://example.org/wp' );

		$this->assertSame(
			'http://localhost:3000/sample-page/?foo=bar&baz=1',
			get_public_redirect_url( '/wp/sample-page/?foo=bar&baz=1', $this->frontend_uri )
		);
	}

	public function test_get_public_redirect_url_accepts_frontend_uri_with_trailing_slash() {
		update_option( 'home', 'http://example.org/wp' );

		$this->assertSame(
			'http://localhost:3000/sample-page/',
			get_public_redirect_url( '/wp/sample-page/', 'http://localhost:3000/' )
		);
	}

	public function test_get_public_redirect_url_strips_nested_subdirectory_install_path() {
		update_option( 'home', 'http://example.org/sites/wp' );

		$this->assertSame(
			'http://localhost:3000/sample-page/',
			get_public_redirect_url( '/sites/wp/sample-page/', $this->frontend_uri )
		);
		$this->assertSame(
			'http://localhost:3000/wp/sample-page/',
			get_public_redirect_url( '/wp/sample-page/', $this->frontend_uri )
		);
	}

	public function test_get_public_redirect_url_maps_root_install_root_to_frontend_root() {
		update_option( 'home', 'http://example.org' );

		$this->assertSame( 'http://localhost:3000/', get_public_redirect_url( '/', $this->frontend_uri ) );
		$this->assertSame( 'http://localhost:3000/?p=1', get_public_redirect_url( '/?p=1', $this->frontend_uri ) );
	}

	public function test_get_public_redirect_url_strips_subsite_path_on_subdirectory_multisite() {
		if ( ! is_multisite() ) {
			$this->markTestSkipped( 'Requires multisite.' );
		}

		$blog_id = self::factory()->blog->create( array( 'path' => '/site2/' ) );

		switch_to_blog( $blog_id );
		$subsite_url = get_public_redirect_url( '/site2/sample-page/?foo=bar', $this->frontend_uri );
		restore_current_blog();

		$this->assertSame( 'http://localhost:3000/sample-page/?foo=bar', $subsite_url );
		$this->assertSame(
			'http://localhost:3000/site2/sample-page/',
			get_public_redirect_url( '/site2/sample-page/', $this->frontend_uri ),
			'The main site keeps the full path.'
		);
	}
}
