<?php
/**
 * Regression tests for the GHSA-q6pm-r77q-qcv3 token-envelope fix.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Auth\decrypt;
use function WPE\FaustWP\Auth\encrypt;
use function WPE\FaustWP\Auth\get_user_from_access_token;
use function WPE\FaustWP\Settings\faustwp_update_setting;

/**
 * @group auth
 */
class AuthFunctionsTests extends \WP_UnitTestCase {

	const TEST_SECRET = '00000000-0000-4000-8000-0000000000aa';

	private $original_secret_key = '';

	public function setUp(): void {
		parent::setUp();

		$settings                  = get_option( 'faustwp_settings', array() );
		$this->original_secret_key = isset( $settings['secret_key'] ) ? (string) $settings['secret_key'] : '';

		faustwp_update_setting( 'secret_key', self::TEST_SECRET );
	}

	public function tearDown(): void {
		faustwp_update_setting( 'secret_key', $this->original_secret_key );
		parent::tearDown();
	}

	/**
	 * Sanity: the fix did not break encrypt/decrypt round-tripping.
	 */
	public function test_encrypt_decrypt_round_trip(): void {
		$plaintext = 'ac|2|9999999999';

		$this->assertSame( $plaintext, decrypt( encrypt( $plaintext ) ) );
	}

	/**
	 * The exact attack chain from the advisory: starting from a valid
	 * authorization code "ac|2|<exp>", XOR IV byte 1 with ('c' ^ 't') and
	 * IV byte 3 with ('2' ^ '1') to mutate the first plaintext block into
	 * "at|1|<exp>" — an Administrator access token.
	 *
	 * With the IV included in the HMAC, the mutation must be rejected.
	 */
	public function test_iv_flip_cannot_forge_access_token_from_authorization_code(): void {
		$envelope = encrypt( 'ac|2|9999999999' );
		$raw      = base64_decode( $envelope );

		$raw[1] = chr( ord( $raw[1] ) ^ ( ord( 'c' ) ^ ord( 't' ) ) );
		$raw[3] = chr( ord( $raw[3] ) ^ ( ord( '2' ) ^ ord( '1' ) ) );

		$forged = base64_encode( $raw );

		$this->assertFalse( decrypt( $forged ) );
		$this->assertFalse( get_user_from_access_token( $forged ) );
	}
}
