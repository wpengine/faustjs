<?php
/**
 * Class ReplacementFunctionsTestCases
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Replacement;

use function WPE\FaustWP\Replacement\{
	domain_replacement_enabled,
	normalize_sitemap_url,
	normalize_sitemap_entry
};

class ReplacementFunctionsTestCases extends \WP_UnitTestCase {
	protected $option = 'faustwp_settings';

	protected $init_settings = [
		'frontend_uri' => 'http://localhost:3000',
	];

	public function setUp() {
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

	public function test_normalize_sitemap_url_replaces_frontend_uri_with_home_url() {
		$frontend_post_url      = $this->init_settings['frontend_uri'] . '/posts/hello-world/';
		$normalized_sitemap_url = normalize_sitemap_url( $frontend_post_url );

		$this->assertContains( get_home_url(), $normalized_sitemap_url );
	}

	public function test_normalize_sitemap_entry() {
		$frontend_post_url = $this->init_settings['frontend_uri'] . '/posts/hello-world/';

		// https://github.com/WordPress/wordpress-develop/blob/ce3d66c7c9d94671268d5ce51de47cdd3bd9d6c8/src/wp-includes/sitemaps/providers/class-wp-sitemaps-posts.php#L127-L129
		$sitemap_entry = array(
			'loc' => $frontend_post_url,
		);

		$normalized_sitemap_entry = normalize_sitemap_entry( $sitemap_entry );

		$this->assertContains( get_home_url(), $normalized_sitemap_entry['loc'] );
	}
}
