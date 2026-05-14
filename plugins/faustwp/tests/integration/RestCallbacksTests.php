<?php
/**
 * Class RestCallbacksTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Settings\faustwp_update_setting;
use function WPE\FaustWP\REST\rest_authorize_permission_callback;
use function WPE\FaustWP\REST\wpac_authorize_permission_callback;

/**
 * Regression tests for the REST permission callbacks in
 * plugins/faustwp/includes/rest/callbacks.php.
 *
 * Specifically guards the timing-safe secret-key comparison fix for #2310,
 * plus provides behavioural coverage for the wider contract (no coverage
 * existed previously for either callback).
 *
 * @group rest
 * @group auth
 */
class RestCallbacksTests extends \WP_UnitTestCase {

	const VALID_SECRET = '00000000-0000-4000-8000-000000000001';
	const WRONG_SECRET = 'definitely-not-the-right-key';

	public function setUp(): void {
		parent::setUp();
		faustwp_update_setting( 'secret_key', self::VALID_SECRET );
	}

	private function make_request_with_faust_header( $value ): \WP_REST_Request {
		$request = new \WP_REST_Request( 'POST', '/faustwp/v1/authorize' );
		if ( null !== $value ) {
			$request->set_header( 'x-faustwp-secret', $value );
		}
		return $request;
	}

	private function make_request_with_wpe_header( $value ): \WP_REST_Request {
		$request = new \WP_REST_Request( 'POST', '/wpac/v1/authorize' );
		if ( null !== $value ) {
			$request->set_header( 'x-wpe-headless-secret', $value );
		}
		return $request;
	}

	// ----- rest_authorize_permission_callback (the current x-faustwp-secret route) -----

	/**
	 * Happy path: configured secret matches the request header → authorized.
	 */
	public function test_rest_authorize_returns_true_when_header_matches_secret(): void {
		$request = $this->make_request_with_faust_header( self::VALID_SECRET );

		$this->assertTrue( rest_authorize_permission_callback( $request ) );
	}

	/**
	 * Wrong header value must be rejected. With hash_equals() this is a
	 * constant-time false; the previous `===` check would have returned
	 * the same boolean but via a fast short-circuit (the bug fixed by #2310).
	 */
	public function test_rest_authorize_returns_false_when_header_value_differs(): void {
		$request = $this->make_request_with_faust_header( self::WRONG_SECRET );

		$this->assertFalse( rest_authorize_permission_callback( $request ) );
	}

	/**
	 * Missing x-faustwp-secret header → unauthorized. Guards the early return
	 * at `if ( $secret_key && $header_key )`.
	 */
	public function test_rest_authorize_returns_false_when_header_is_missing(): void {
		$request = $this->make_request_with_faust_header( null );

		$this->assertFalse( rest_authorize_permission_callback( $request ) );
	}

	/**
	 * Empty-string header → unauthorized. Guards against a downstream caller
	 * sending `x-faustwp-secret: ` and accidentally being treated as authorized.
	 */
	public function test_rest_authorize_returns_false_when_header_is_empty_string(): void {
		$request = $this->make_request_with_faust_header( '' );

		$this->assertFalse( rest_authorize_permission_callback( $request ) );
	}

	/**
	 * Server-side secret unset → unauthorized regardless of what the client sends.
	 * Guards the early return for unconfigured installs.
	 *
	 * Note: we delete the option directly rather than calling
	 * faustwp_update_setting('secret_key', '') because the
	 * sanitize_option_faustwp_settings filter (at includes/settings/callbacks.php)
	 * silently restores the previous value when the new one isn't a valid UUID,
	 * so a string clear wouldn't actually clear it.
	 */
	public function test_rest_authorize_returns_false_when_secret_is_unset(): void {
		delete_option( 'faustwp_settings' );
		$request = $this->make_request_with_faust_header( self::VALID_SECRET );

		$this->assertFalse( rest_authorize_permission_callback( $request ) );
	}

	// ----- wpac_authorize_permission_callback (the deprecated x-wpe-headless-secret route) -----

	/**
	 * The deprecated route still authorizes on a matching x-wpe-headless-secret.
	 * Kept under test until the route is removed so the deprecation period
	 * doesn't accidentally break older clients.
	 */
	public function test_wpac_authorize_returns_true_when_header_matches_secret(): void {
		$request = $this->make_request_with_wpe_header( self::VALID_SECRET );

		$this->assertTrue( wpac_authorize_permission_callback( $request ) );
	}

	/**
	 * Wrong header value rejected by the deprecated route too.
	 */
	public function test_wpac_authorize_returns_false_when_header_value_differs(): void {
		$request = $this->make_request_with_wpe_header( self::WRONG_SECRET );

		$this->assertFalse( wpac_authorize_permission_callback( $request ) );
	}

	// ----- timing-safe-comparison regression guard (source-level) -----

	/**
	 * Source-level guard for #2310: the three secret-key comparisons in this
	 * codebase must use hash_equals(), not `===`/`!==`. Behavioural tests above
	 * cannot distinguish hash_equals() from `===` (both return the same boolean
	 * for valid/invalid inputs); the distinction is timing-safety, which can't
	 * be reliably asserted in unit tests. So we assert at the source level that
	 * the known-bad shapes are not present and hash_equals() is.
	 *
	 * Narrowly-scoped to the exact patterns that the #2310 fix removed — false
	 * positives are bounded to a future contributor reintroducing those exact
	 * literal expressions, which is exactly the regression we want to catch.
	 */
	public function test_secret_comparisons_use_constant_time_hash_equals(): void {
		$rest_callbacks    = file_get_contents( dirname( __DIR__, 2 ) . '/includes/rest/callbacks.php' );
		$graphql_callbacks = file_get_contents( dirname( __DIR__, 2 ) . '/includes/graphql/callbacks.php' );

		// The three bad patterns this PR replaces:
		$this->assertStringNotContainsString( '=== $header_key', $rest_callbacks,
			'rest_authorize_permission_callback must use hash_equals(), not ===.' );
		$this->assertStringNotContainsString( "!== \$_SERVER['HTTP_X_FAUST_SECRET']", $graphql_callbacks,
			'filter_introspection must use hash_equals(), not !==.' );

		// And the positive: both files must contain hash_equals(). Use >= 1 rather
		// than a hardcoded count so a future contributor adding a legitimate third
		// hash_equals call (e.g. for a new permission callback) doesn't trip a
		// false-positive "security regression". The not-contains assertions above
		// are the real revert guards; these are affirmative checks that the timing-
		// safe primitive is still present somewhere.
		$this->assertGreaterThanOrEqual( 1, substr_count( $rest_callbacks, 'hash_equals' ),
			'rest/callbacks.php must contain at least one hash_equals call.' );
		$this->assertStringContainsString( 'hash_equals', $graphql_callbacks,
			'filter_introspection must use hash_equals.' );
	}
}
