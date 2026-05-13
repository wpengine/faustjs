<?php
/**
 * Integration tests for plugins/faustwp/includes/auth/callbacks.php.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use WPE\FaustWP\Auth;

/**
 * Regression tests for handle_generate_endpoint().
 *
 * Guards the home_url() vs site_url() behavior so the fix for #1872 -- Bedrock-style
 * installs where WordPress core lives under /wp/ -- cannot be silently reverted by a
 * future change.
 *
 * @group auth
 */
class AuthCallbacksTests extends \WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();
		$GLOBALS['__test_captured_redirect'] = null;

		// handle_generate_endpoint() calls wp_safe_redirect() and then a bare exit;.
		// Redefine wp_safe_redirect via Patchwork to throw, which bypasses the exit
		// and lets us assert which redirect target was reached.
		\Patchwork\redefine(
			'wp_safe_redirect',
			function ( $location ) {
				$GLOBALS['__test_captured_redirect'] = $location;
				throw new \RuntimeException( 'test:wp_safe_redirect' );
			}
		);
	}

	public function tearDown(): void {
		\Patchwork\restoreAll();
		unset(
			$_SERVER['REQUEST_URI'],
			$_GET['redirect_uri'],
			$GLOBALS['__test_captured_redirect']
		);
		remove_all_filters( 'site_url' );
		remove_all_filters( 'home_url' );
		parent::tearDown();
	}

	/**
	 * Simulate a Bedrock-style URL layout: site_url() returns /wp/<path>, home_url()
	 * stays at /<path>. Mirrors the divergence reported in #1872.
	 *
	 * Real Bedrock installs return /wp/<path> from site_url($path, 'relative') because
	 * the siteurl option is configured as <host>/wp. We replicate that here by handling
	 * both relative (just /<path>) and absolute (<scheme>://<host>/<path>) URL shapes.
	 */
	private function set_bedrock_layout(): void {
		add_filter(
			'site_url',
			static function ( $url ) {
				// Relative URL (scheme='relative'): /<path> -> /wp/<path>
				if ( '' !== $url && '/' === $url[0] && ( ! isset( $url[1] ) || '/' !== $url[1] ) ) {
					return '/wp' . $url;
				}
				// Absolute URL: <scheme>://<host>/<path> -> <scheme>://<host>/wp/<path>
				return preg_replace( '#(https?://[^/]+)(/.*)?#', '$1/wp$2', $url );
			},
			10,
			1
		);
		// home_url left at the default ('/<path>').
	}

	/**
	 * Invoke handle_generate_endpoint() and return the captured wp_safe_redirect
	 * target, or null if the function returned before reaching the redirect.
	 *
	 * @return string|null
	 */
	private function invoke_handler() {
		try {
			Auth\handle_generate_endpoint();
		} catch ( \RuntimeException $e ) {
			if ( 'test:wp_safe_redirect' === $e->getMessage() ) {
				return $GLOBALS['__test_captured_redirect'];
			}
			throw $e;
		}
		return null; // function returned before reaching wp_safe_redirect.
	}

	/**
	 * Standard install: REQUEST_URI matches the default search pattern; the function
	 * proceeds to wp_safe_redirect (login redirect when not authenticated).
	 */
	public function test_standard_install_matches_and_redirects(): void {
		$_SERVER['REQUEST_URI'] = '/generate?redirect_uri=https://frontend.example/';
		$_GET['redirect_uri']   = 'https://frontend.example/';

		$redirect = $this->invoke_handler();

		$this->assertNotNull(
			$redirect,
			'Standard install must reach wp_safe_redirect.'
		);
		$this->assertStringContainsString( 'wp-login.php', $redirect );
	}

	/**
	 * Bedrock layout: home_url() returns /generate while site_url() returns /wp/generate.
	 * With the home_url() fix in place, REQUEST_URI=/generate still matches.
	 *
	 * This is the regression guard for #1872: if a future change reverts callbacks.php
	 * to site_url(), this test goes red because the regex would no longer match.
	 */
	public function test_bedrock_divergence_matches_with_home_url(): void {
		$this->set_bedrock_layout();
		$_SERVER['REQUEST_URI'] = '/generate?redirect_uri=https://frontend.example/';
		$_GET['redirect_uri']   = 'https://frontend.example/';

		$redirect = $this->invoke_handler();

		$this->assertNotNull(
			$redirect,
			'Bedrock layout (site_url=/wp/x, home_url=/x) must still match REQUEST_URI=/x once home_url() is used.'
		);
	}

	/**
	 * Unrelated REQUEST_URI must early-return without touching wp_safe_redirect.
	 */
	public function test_unrelated_request_uri_is_a_noop(): void {
		$_SERVER['REQUEST_URI'] = '/some-other-path';
		$_GET                   = array();

		$this->assertNull( $this->invoke_handler() );
	}

	/**
	 * /generate without a redirect_uri query arg must early-return.
	 */
	public function test_generate_without_redirect_uri_is_a_noop(): void {
		$_SERVER['REQUEST_URI'] = '/generate';
		$_GET                   = array();

		$this->assertNull( $this->invoke_handler() );
	}
}
