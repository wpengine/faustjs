<?php
/**
 * Class ReplacementCallbacksTestCases
 *
 * @package WPE_Headless
 */

class ReplacementCallbacksTestCases extends WP_UnitTestCase {
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
		$this->assertSame( 10, has_action( 'the_content', 'wpe_headless_content_replacement' ) );
	}

	public function test_preview_post_link_filter() {
		$this->assertSame( 10, has_action( 'preview_post_link', 'wpe_headless_post_preview_link' ) );
	}

	public function test_post_link_filter() {
		$this->assertSame( 10, has_action( 'post_link', 'wpe_headless_post_link' ) );
	}

	public function test_term_link_filter() {
		$this->assertSame( 10, has_action( 'term_link', 'wpe_headless_term_link' ) );
	}

	public function test_graphql_request_results_filter() {
		$this->assertSame( 10, has_action( 'graphql_request_results', 'wpe_headless_url_replacement' ) );
	}

	/**
	 * Tests wpe_headless_content_replacement() returns original value when content replacement is not enabled.
	 */
	public function test_wpe_headless_content_replacement_does_not_filter_content_when_content_replacement_is_not_enabled() {
		$content = '<a href="http://example.org">moo</a>';
		$this->assertSame( $content, wpe_headless_content_replacement( $content ) );
	}

	/**
	 * Tests wpe_headless_content_replacement() replaces the site_url() value when content replacement is enabled.
	 */
	public function test_wpe_headless_content_replacement_filters_content_when_content_replacement_enabled() {
		wpe_headless_update_setting( 'frontend_uri', 'http://moo' );
		add_filter( 'wpe_headless_domain_replacement_enabled', '__return_true' );
		$this->assertSame( '<a href="http://moo">moo</a>', wpe_headless_content_replacement( '<a href="http://example.org">moo</a>' ) );
		wpe_headless_update_setting( 'frontend_uri', null );
		remove_filter( 'wpe_headless_domain_replacement_enabled', '__return_true' );
	}

	/**
	 * Tests get_permalink() returns the original value when content replacement is not enabled.
	 *
	 * @covers ::wpe_headless_post_link() which runs on post_link filter.
	 */
	public function test_wpe_headless_post_link_returns_unfiltered_link_when_content_replacement_is_not_enabled() {
		$this->assertSame( 'http://example.org/?p=' . $this->post_id, get_permalink( $this->post_id ) );
	}

	/**
	 * Tests get_preview_post_link() returns rewritten value when content replacement is enabled.
	 */
	public function test_wpe_headless_post_link_returns_filtered_link_when_content_replacement_enabled() {
		wpe_headless_update_setting( 'frontend_uri', 'http://moo' );
		wpe_headless_update_setting( 'enable_rewrites', true );
		// @todo this feels like a hack
		$this->assertSame( 'http://moo/api/auth/wpe-headless?redirect_uri=' . urlencode( '?p=' . $this->post_id . '/preview/' . $this->post_id ), get_preview_post_link( $this->post_id ) );
	}

	/**
	 * Tests get_term_link() returns original value when term link rewrites are not enabled.
	 *
	 * @covers ::wpe_headless_term_link(), which runs on term_link filter inside get_term_link().
	 */
	public function test_wpe_headless_term_link_returns_unfiltered_link_when_rewrite_term_links_is_not_enabled() {
		$this->assertSame( 'http://example.org/?cat=1', get_term_link( 1 ) );
	}

	/**
	 * Tests get_term_link() returns rewritten value when term link rewrites are enabled.
	 *
	 * @covers ::wpe_headless_term_link(), which runs on term_link filter inside get_term_link().
	 */
	public function test_wpe_headless_term_link_returns_filtered_link_when_rewrite_term_links_enabled() {
		wpe_headless_update_setting( 'frontend_uri', 'http://moo' );
		wpe_headless_update_setting( 'enable_rewrites', '1' );
		$term_id = get_terms( [ 'hide_empty' => false, 'fields' => 'ids' ] )[0];
		$this->assertSame( 'http://moo/?cat=' . $term_id, get_term_link( $term_id ) );
	}
}
