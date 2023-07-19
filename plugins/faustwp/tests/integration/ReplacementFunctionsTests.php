<?php
/**
 * Class ReplacementFunctionsTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Replacement\{
	domain_replacement_enabled,
	normalize_url,
	equivalent_wp_url,
	equivalent_frontend_url,
	normalize_sitemap_entry,
	has_file_extension
};

class ReplacementFunctionsTests extends \WP_UnitTestCase {
	protected $option = 'faustwp_settings';

	protected $init_settings = [
		'frontend_uri' => 'http://localhost:3000',
	];

	protected $empty_settings = [
		'frontend_uri' => '',
	];

	public function setUp(): void {
		parent::setUp();
		update_option( $this->option, $this->init_settings );
	}

	public function test_domain_replacement_enabled_returns_false() {
		$this->assertFalse( domain_replacement_enabled() );
	}

	public function test_domain_replacement_enabled_returns_true_when_filtered_to_be_true() {
		add_filter( 'faustwp_domain_replacement_enabled', '__return_true' );
		$this->assertTrue( domain_replacement_enabled() );
		remove_filter( 'faustwp_domain_replacement_enabled', '__return_true' );
	}

	public function test_normalize_url_defaults_to_replacing_frontend_uri_with_home_url() {
		$frontend_url = $this->init_settings['frontend_uri'] . '/posts/hello-world/';
		$wp_url       = normalize_url( $frontend_url );

		$this->assertStringContainsString( get_home_url(), $wp_url );
	}

	public function test_normalize_url_replaces_wp_url_with_frontend_uri_when_frontend_arg_is_true() {
		$wp_url       = get_home_url() . '/posts/hello-world/';
		$frontend_url = normalize_url( $wp_url, true );

		$this->assertStringContainsString( $this->init_settings['frontend_uri'], $frontend_url );
	}

	public function test_equivalent_wp_url_replaces_frontend_uri_with_home_url() {
		$frontend_url = $this->init_settings['frontend_uri'] . '/posts/hello-world/';
		$wp_url       = equivalent_wp_url( $frontend_url );

		$this->assertStringContainsString( get_home_url(), $wp_url );
	}

	public function test_equivalent_frontend_url_replaces_home_url_with_frontend_uri() {
		$wp_url       = get_home_url() . '/posts/hello-world/';
		$frontend_url = equivalent_frontend_url( $wp_url );

		$this->assertStringContainsString( $this->init_settings['frontend_uri'], $frontend_url );
	}

	public function test_equivalent_frontend_url_does_not_replace_when_frontend_uri_not_set() {
		update_option( $this->option, $this->empty_settings );

		$wp_url       = get_home_url() . '/posts/hello-world/';
		$frontend_url = equivalent_frontend_url( $wp_url );

		$this->assertStringContainsString( $wp_url, $frontend_url );
	}

	public function test_normalize_sitemap_entry_replaces_frontend_uri_with_home_url() {
		$frontend_post_url = $this->init_settings['frontend_uri'] . '/posts/hello-world/';

		// https://github.com/WordPress/wordpress-develop/blob/ce3d66c7c9d94671268d5ce51de47cdd3bd9d6c8/src/wp-includes/sitemaps/providers/class-wp-sitemaps-posts.php#L127-L129
		$sitemap_entry = array(
			'loc' => $frontend_post_url,
		);

		$normalized_sitemap_entry = normalize_sitemap_entry( $sitemap_entry );

		$this->assertStringContainsString( get_home_url(), $normalized_sitemap_entry['loc'] );
	}

	public function test_has_file_extension() {
        $this->assertTrue( has_file_extension( 'file.txt' ) );
        $this->assertTrue( has_file_extension( 'document.pdf' ) );
        $this->assertTrue( has_file_extension( 'image.jpg' ) );
        $this->assertFalse( has_file_extension( 'file' ) );
        $this->assertFalse( has_file_extension( 'no_extension.' ) );
        $this->assertFalse( has_file_extension( 'no_extension' ) );
    }
}
