<?php
/**
 * Class ReplacementCallbacksTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Replacement\{
	content_replacement,
	post_preview_link,
	image_source_replacement,
	image_source_srcset_replacement
};
use function WPE\FaustWP\Settings\faustwp_update_setting;

class ReplacementCallbacksTests extends \WP_UnitTestCase {
	protected $post_id;

	public function setUp(): void {
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

	public function test_page_link_filter() {
		$this->assertSame( 1000, has_action( 'page_link', 'WPE\FaustWP\Replacement\post_link' ) );
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

	public function test_wp_sitemaps_posts_entry_filter() {
		$this->assertSame( 10, has_action( 'wp_sitemaps_posts_entry', 'WPE\FaustWP\Replacement\sitemaps_posts_entry' ) );
	}

	public function test_wp_sitemaps_taxonomies_entry_filter() {
		$this->assertSame( 10, has_action( 'wp_sitemaps_taxonomies_entry', 'WPE\FaustWP\Replacement\sitemaps_taxonomies_entry' ) );
	}

	public function test_wpseo_xml_sitemap_post_url_filter() {
		$this->assertSame( 10, has_action( 'wpseo_xml_sitemap_post_url', 'WPE\FaustWP\Replacement\yoast_sitemap_post_url' ) );
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
	 */
	public function test_post_link_returns_unfiltered_link_when_content_replacement_is_not_enabled() {
		$this->assertSame( 'http://example.org/?p=' . $this->post_id, get_permalink( $this->post_id ) );
	}

	/**
	 * Tests get_permalink() returns rewritten value when content replacement is enabled.
	 */
	public function test_post_link_returns_filtered_link_when_content_replacement_is_enabled() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		faustwp_update_setting( 'enable_rewrites', true );

		$this->assertSame( 'http://moo/?p=' . $this->post_id, get_permalink( $this->post_id ) );
	}

	/**
	 * Tests get_preview_post_link() returns rewritten value.
	 */
	public function test_post_preview_link_returns_filtered_link() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );

		$this->assertSame( 'http://moo/?p=' . $this->post_id . '&preview=true&previewPathname=' . rawurlencode( wp_make_link_relative( get_permalink( $this->post_id ) ) ) . '&typeName=Post', get_preview_post_link( $this->post_id ) );
	}

	/**
	 * Tests post_preview_link() adds preview=true when it doesn't already exist.
	 */
	public function test_post_preview_link_adds_preview_true_query_param() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );

		$link = post_preview_link( 'http://moo/', get_post( $this->post_id ) );

		$this->assertSame( 'http://moo/?previewPathname=' . rawurlencode( wp_make_link_relative( get_permalink( $this->post_id ) ) ) . '&p=' . $this->post_id . '&preview=true&typeName=Post', $link );
	}

	/**
	 * Tests post_preview_link() uses frontend_uri scheme if different than home_url scheme.
	 */
	public function test_post_preview_link_uses_frontend_uri_scheme() {

		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		add_filter( 'home_url', [$this, 'get_home_url'] );
		$link = post_preview_link( 'http://moo/', get_post( $this->post_id ) );

		$this->assertStringStartsWith( 'http://', $link );
		remove_filter( 'home_url', [$this, 'get_home_url'] );
	}

	/**
	 * Tests get_preview_post_link() returns rewritten value when content replacement is enabled for Custom Post Types
	 */
	public function test_custom_post_type_post_preview_link_returns_filtered_link_when_content_replacement_is_enabled()
	{
		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		faustwp_update_setting( 'enable_rewrites', true );
		$post_id = $this->getCustomPostType();
		$this->assertSame( 'http://moo/?document=' . $post_id . '&preview=true&previewPathname=' . rawurlencode( wp_make_link_relative( get_permalink( $post_id ) ) ) . '&p=' . $post_id . '&typeName=Document', get_preview_post_link( $post_id ) );
		faustwp_update_setting( 'frontend_uri', null );
		faustwp_update_setting( 'enable_rewrites', false );
	}

	/**
	 * Tests get_permalink() does not modify original value when content replacement is enabled for Custom Post Types
	 */
	public function test_custom_post_type_post_link_returns_unfiltered_link_when_content_replacement_is_enabled()
	{
		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		faustwp_update_setting( 'enable_rewrites', true );
		$post_id = $this->getCustomPostType();
		$this->assertSame( 'http://example.org/?document=' . $post_id, get_permalink($post_id) );
		faustwp_update_setting( 'frontend_uri', null );
		faustwp_update_setting( 'enable_redirects', false );
	}

	/**
	 * Tests get_preview_post_link() filters link for post types that are not registered with WP GraphQL.
	 */
	public function test_post_preview_link_filters_link_for_posts_not_registered_with_wpgraphql() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );

		register_post_type('notgraphql', ['public' => true]);

		$post_id = wp_insert_post( [
			'title'        => 'Hello world',
			'post_content' => 'Hi',
			'post_status'  => 'publish',
			'post_type'    => 'notgraphql'
		] );

		$this->assertSame( 'http://moo/?notgraphql=' . $post_id . '&preview=true&previewPathname=' . rawurlencode( wp_make_link_relative( get_permalink( $post_id ) ) ) . '&p=' . $post_id, get_preview_post_link( $post_id ) );
	}

	/**
	 * Tests get_term_link() returns original value when term link rewrites are not enabled.
	 */
	public function test_term_link_returns_unfiltered_link_when_rewrite_term_links_is_not_enabled() {
		$this->assertSame( 'http://example.org/?cat=1', get_term_link( 1 ) );
	}

	/**
	 * Tests get_term_link() returns rewritten value when term link rewrites are enabled.
	 */
	public function test_term_link_returns_filtered_link_when_rewrite_term_links_enabled() {
		faustwp_update_setting( 'frontend_uri', 'http://moo' );
		faustwp_update_setting( 'enable_rewrites', '1' );
		$term_id = get_terms( [ 'hide_empty' => false, 'fields' => 'ids' ] )[0];
		$this->assertSame( 'http://moo/?cat=' . $term_id, get_term_link( $term_id ) );
	}

	private function getCustomPostType() {
		register_post_type('document', [
			'public' => true,
			'show_in_graphql' => true,
			'graphql_single_name' => 'document',
			'graphql_plural_name' => 'documents',
		]);

		$post_id = wp_insert_post( [
			'title'        => 'Hello world',
			'post_content' => 'Hi',
			'post_status'  => 'publish',
			'post_type'    => 'document',
		] );

		return $post_id;
	}

	public function get_home_url( $url ) {
		return "https://example.com/";
	}

}
