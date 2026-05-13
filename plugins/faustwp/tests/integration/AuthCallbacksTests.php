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
 * Guards the home_url() vs site_url() behavior in handle_generate_endpoint() so
 * the fix for #1872 -- Bedrock-style installs where WordPress core lives under
 * /wp/ -- cannot be silently reverted.
 *
 * The Bedrock case is reproduced by overriding the `siteurl` option directly
 * (matching what Bedrock configures via WP_SITEURL in wp-config.php) rather
 * than filtering `site_url`. That way every consumer of `get_option('siteurl')`
 * and `site_url()` sees the divergent value, which is faithful to real Bedrock.
 *
 * @group auth
 */
class AuthCallbacksTests extends \WP_UnitTestCase {

	/**
	 * Redirect URL captured by the Patchwork-redefined wp_safe_redirect.
	 *
	 * Static so the redefine closure can write to it without binding $this.
	 *
	 * @var string|null
	 */
	public static $captured_redirect = null;

	/**
	 * Original siteurl option value, restored in tearDown so tests stay isolated
	 * even if WP_UnitTestCase's transaction rollback misses something.
	 *
	 * @var string
	 */
	private $original_siteurl = '';

	public function setUp(): void {
		parent::setUp();

		self::$captured_redirect = null;
		$this->original_siteurl  = get_option( 'siteurl' );

		// handle_generate_endpoint() calls wp_safe_redirect() and then a bare exit;.
		// Redefine wp_safe_redirect via Patchwork to throw a dedicated exception,
		// which bypasses the exit and lets us assert which redirect target was
		// reached. A dedicated exception class avoids the string-matching trap of
		// a generic RuntimeException (which could collide with unrelated errors).
		\Patchwork\redefine(
			'wp_safe_redirect',
			static function ( $location ) {
				AuthCallbacksTests::$captured_redirect = $location;
				throw new RedirectAttempted( (string) $location );
			}
		);
	}

	public function tearDown(): void {
		\Patchwork\restoreAll();
		update_option( 'siteurl', $this->original_siteurl );
		unset( $_SERVER['REQUEST_URI'], $_GET['redirect_uri'] );
		self::$captured_redirect = null;
		parent::tearDown();
	}

	/**
	 * Reconfigure the WordPress siteurl option to mirror a Bedrock-style install
	 * (WP core under /wp/, public site at root). Matches what
	 * `composer create-project roots/bedrock` configures via WP_SITEURL in
	 * wp-config.php.
	 */
	private function set_bedrock_siteurl(): void {
		$home = (string) get_option( 'home' );
		update_option( 'siteurl', rtrim( $home, '/' ) . '/wp' );
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
		} catch ( RedirectAttempted $e ) {
			return self::$captured_redirect;
		}
		return null;
	}

	/**
	 * Standard install: REQUEST_URI matches the default search pattern; the
	 * function proceeds to wp_safe_redirect (login-redirect branch).
	 */
	public function test_standard_install_matches_and_redirects(): void {
		$_SERVER['REQUEST_URI'] = '/generate?redirect_uri=https://frontend.example/';
		$_GET['redirect_uri']   = 'https://frontend.example/';

		$redirect = $this->invoke_handler();

		$this->assertNotNull( $redirect, 'Standard install must reach wp_safe_redirect.' );
		$this->assertStringContainsString( 'wp-login.php', $redirect );
	}

	/**
	 * Bedrock-shaped install: the siteurl option includes /wp while home does not.
	 * With home_url() in callbacks.php, REQUEST_URI=/generate still matches.
	 *
	 * Regression guard for #1872: this test fails if callbacks.php is reverted
	 * to site_url() because the regex becomes /wp/generate and stops matching
	 * the public REQUEST_URI.
	 */
	public function test_bedrock_divergence_matches_with_home_url(): void {
		$this->set_bedrock_siteurl();

		// Sanity-check the divergence we just configured: site_url carries /wp,
		// home_url does not. If these fail, the test environment itself is broken
		// before we even exercise the handler.
		$this->assertStringEndsWith( '/wp/generate', site_url( '/generate', 'relative' ) );
		$this->assertStringEndsWith( '/generate', home_url( '/generate', 'relative' ) );

		$_SERVER['REQUEST_URI'] = '/generate?redirect_uri=https://frontend.example/';
		$_GET['redirect_uri']   = 'https://frontend.example/';

		$redirect = $this->invoke_handler();

		$this->assertNotNull(
			$redirect,
			'Bedrock layout (siteurl includes /wp, home does not) must still match REQUEST_URI=/generate when home_url() is used.'
		);
		$this->assertStringContainsString( 'wp-login.php', $redirect );
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

/**
 * Thrown by the Patchwork redefine of wp_safe_redirect inside AuthCallbacksTests
 * to bypass the bare `exit;` that immediately follows wp_safe_redirect() in
 * handle_generate_endpoint(). Keeping this as a dedicated subclass (rather than
 * a generic RuntimeException with a magic string) means the catch in
 * invoke_handler() can't accidentally swallow unrelated runtime errors.
 */
class RedirectAttempted extends \Exception {}
