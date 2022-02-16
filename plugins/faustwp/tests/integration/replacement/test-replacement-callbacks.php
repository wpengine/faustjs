<?php
/**
 * Class ReplacementCallbacksTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Replacement;

use function WPE\FaustWP\Replacement\{
	content_replacement,
	image_source_replacement,
	image_source_srcset_replacement
};
use function WPE\FaustWP\Settings\faustwp_update_setting;

class ReplacementCallbacksTestCases extends \WP_UnitTestCase {
	protected $post_id;

	public function setUp() {
		parent::setUp();

		$this->post_id = wp_insert_post( [
			'title'        => 'Hello world',
			'post_content' => 'Hi',
			'post_status'  => 'publish',
		] );
	}

	public function test_the_content_filter() {
		$this->assertSame( 10, has_action( 'the_content', 'WPE\FaustWP\Replacement\content_replacement' ) );
	}

	public function test_preview_post_link_filter() {
		$this->assertSame( 1000, has_action( 'preview_post_link', 'WPE\FaustWP\Replacement\post_preview_link' ) );
	}

	public function test_post_link_filter() {
		$this->assertSame( 1000, has_action( 'post_link', 'WPE\FaustWP\Replacement\post_link' ) );
	}

	public function test_term_link_filter() {
		$this->assertSame( 1000, has_action( 'term_link', 'WPE\FaustWP\Replacement\term_link' ) );
	}

	public function test_graphql_request_results_filter() {
		$this->assertSame( 10, has_action( 'graphql_request_results', 'WPE\FaustWP\Replacement\url_replacement' ) );
	}

	public function test_enqueue_preview_scripts_action() {
		$this->assertSame( 10, has_action( 'enqueue_block_editor_assets', 'WPE\FaustWP\Replacement\enqueue_preview_scripts' ) );
	}

	/**
	 * Tests content_replacement() returns original value when content replacement is not enabled.
	 */
	public function test_content_replacement_does_not_filter_content_when_content_replacement_is_not_enabled() {
		$content = '<a href="http://example.org">moo</a>';
		$this->assertSame( $content, content_replacement( $content ) );
	}

	/**
	 * Tests content_replacement() replaces the site_url() value when content replacement is enabled.
	 */
	public function test_content_replacement_filters_content_when_content_replacement_enabled() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		add_filter( 'faustwp_domain_replacement_enabled', '__return_true' );
		$this->assertSame( '<a href="http://moo">moo</a>', content_replacement( '<a href="http://example.org">moo</a>' ) );
		faustwp_update_setting( 'frontend_uri', null );
		remove_filter( 'faustwp_domain_replacement_enabled', '__return_true' );
	}

	/**
	 * Tests image_source_replacement() replaces the frontend_uri value when image replacement is enabled.
	 */
	public function test_image_source_replacement_filters_content_when_image_replacement_enabled() {
		faustwp_update_setting( 'frontend_uri', 'http://foo.co' );
		faustwp_update_setting( 'enable_image_source', '1' );
		# Do not replace partial domain match.
		$this->assertSame( '<img src="http://foo.com/image.png">', image_source_replacement( '<img src="http://foo.com/image.png">' ) );
		# Do replace exact domain match
		$this->assertSame( '<img src="http://example.org/image.png">', image_source_replacement( '<img src="http://foo.co/image.png">' ) );
		$this->assertSame( '<img src="http://example.org/image.png">', image_source_replacement( '<img src="/image.png">' ) );
		faustwp_update_setting( 'frontend_uri', null );
		faustwp_update_setting( 'enable_image_source', '0' );
	}

	/**
	 * Tests image_source_srcset_replacement() replaces the frontend_uri value when image replacement is enabled.
	 */
	public function test_image_source_srcset_replacement_filters_content_when_image_replacement_enabled() {
		faustwp_update_setting( 'frontend_uri', 'http://foo.co' );
		faustwp_update_setting( 'enable_image_source', '1' );
		# Do not replace partial domain match.
		# Do replace exact domain match
		$sources = array (
			100 => array('url' => 'http://foo.com/image100.png'),
			300 => array('url' => '/wp-content/uploads/image300.jpg'),
			400 => array('url' => 'http://foo.co/image400.png'),
		);
		$expected = array (
			100 => array('url' => 'http://foo.com/image100.png'),
			300 => array('url' => 'http://example.org/wp-content/uploads/image300.jpg'),
			400 => array('url' => 'http://example.org/image400.png'),
		);
		$this->assertSame( $expected, image_source_srcset_replacement( $sources ) );
		faustwp_update_setting( 'frontend_uri', null );
		faustwp_update_setting( 'enable_image_source', '0' );
	}

	/**
	 * Tests image_source_replacement() doesn't replace when image replacement is not enabled.
	 */
	public function test_image_source_replacement_filters_content_when_image_replacement_not_enabled() {
		faustwp_update_setting( 'enable_image_source', '0' );
		$this->assertSame( '<img src="/image.png">', image_source_replacement( '<img src="/image.png">' ) );
	}

	/**
	 * Tests image_source_srcset_replacement() doesn't replace when image replacement is not enabled.
	 */
	public function test_image_source_srcset_replacement_filters_content_when_image_replacement_not_enabled() {
		faustwp_update_setting( 'enable_image_source', '0' );
		$sources = array (
			100 => array('url' => '/wp-content/uploads/image.jpg'),
		);
		$this->assertSame( $sources, image_source_srcset_replacement( $sources ) );
	}

	/**
	 * Tests get_permalink() returns the original value when content replacement is not enabled.
	 *
	 * @covers ::post_link() which runs on post_link filter.
	 */
	public function test_post_link_returns_unfiltered_link_when_content_replacement_is_not_enabled() {
		$this->assertSame( 'http://example.org/?p=' . $this->post_id, get_permalink( $this->post_id ) );
	}

	/**
	 * Tests get_preview_post_link() returns rewritten value when content replacement is enabled.
	 */
	public function test_post_link_returns_filtered_link_when_content_replacement_enabled() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		faustwp_update_setting( 'enable_rewrites', true );
		// @todo this feels like a hack
		$this->assertSame( 'http://moo/?p=' . $this->post_id . '&preview=true&typeName=Post', get_preview_post_link( $this->post_id ) );
	}

	/**
	 * Tests get_term_link() returns original value when term link rewrites are not enabled.
	 *
	 * @covers ::term_link(), which runs on term_link filter inside get_term_link().
	 */
	public function test_term_link_returns_unfiltered_link_when_rewrite_term_links_is_not_enabled() {
		$this->assertSame( 'http://example.org/?cat=1', get_term_link( 1 ) );
	}

	/**
	 * Tests get_term_link() returns rewritten value when term link rewrites are enabled.
	 *
	 * @covers ::term_link(), which runs on term_link filter inside get_term_link().
	 */
	public function test_term_link_returns_filtered_link_when_rewrite_term_links_enabled() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		faustwp_update_setting( 'enable_rewrites', '1' );
		$term_id = get_terms( [ 'hide_empty' => false, 'fields' => 'ids' ] )[0];
		$this->assertSame( 'http://moo/?cat=' . $term_id, get_term_link( $term_id ) );
	}
}
