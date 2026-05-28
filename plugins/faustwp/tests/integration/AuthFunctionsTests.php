<?php
/**
 * Regression tests for GHSA-q6pm-r77q-qcv3.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Auth\decrypt;
use function WPE\FaustWP\Auth\encrypt;
use function WPE\FaustWP\Auth\get_user_from_access_token;
use function WPE\FaustWP\Settings\faustwp_update_setting;

/**
 * Background
 * ----------
 * FaustWP tokens are strings of the form "<type>|<user_id>|<exp>", carried
 * as base64( IV || HMAC || ciphertext ). <type> is "ac" (authorization
 * code), "at" (access token), or "rt" (refresh token).
 *
 * The IV is a random 16-byte nonce required by AES-CBC. The HMAC is checked
 * before decryption — if it does not match, decrypt() returns false.
 *
 * The bug
 * -------
 * Before the patch, the HMAC covered only the ciphertext, not the IV. Since
 *
 *     plaintext[0..15] = D_k(ciphertext) XOR IV
 *
 * any holder of a valid envelope can XOR bits into the IV to mutate the
 * first plaintext block to any value, while the HMAC still validates. The
 * advisory's example: a Subscriber's "ac|2|<exp>" becomes "at|1|<exp>" — an
 * Administrator access token.
 *
 * The fix
 * -------
 * Sign (IV || ciphertext) on both sides — any IV tampering now breaks the
 * HMAC check.
 *
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
	 * Sanity: the HMAC change did not break encrypt/decrypt round-tripping.
	 */
	public function test_encrypt_decrypt_round_trip(): void {
		$plaintext = 'ac|2|9999999999';

		$this->assertSame( $plaintext, decrypt( encrypt( $plaintext ) ) );
	}

	/**
	 * Reproduces the bit-flip attack from the advisory.
	 *
	 * XOR IV[i] with (current ^ target): plaintext[i] flips to target, every
	 * other byte is unchanged.
	 *
	 *   IV[1] ^= 'c' ^ 't'   →   "ac" → "at"
	 *   IV[3] ^= '2' ^ '1'   →   user 2 → user 1
	 *
	 * Pre-patch the mutated envelope decrypts to "at|1|<exp>" — an
	 * Administrator access token. Post-patch the HMAC check fails first.
	 */
	public function test_iv_flip_cannot_forge_access_token_from_authorization_code(): void {
		$envelope = encrypt( 'ac|2|9999999999' );

		// Envelope bytes: [IV: 0..15] [HMAC: 16..47] [ciphertext: 48+].
		$raw = base64_decode( $envelope );

		$raw[1] = chr( ord( $raw[1] ) ^ ( ord( 'c' ) ^ ord( 't' ) ) );
		$raw[3] = chr( ord( $raw[3] ) ^ ( ord( '2' ) ^ ord( '1' ) ) );

		$forged = base64_encode( $raw );

		$this->assertFalse( decrypt( $forged ) );
		$this->assertFalse( get_user_from_access_token( $forged ) );
	}
}
