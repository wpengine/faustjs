<?php
/**
 * Regression tests for the GHSA-q6pm-r77q-qcv3 token-envelope fix.
 *
 * If you are reading this without an auth or cryptography background, start
 * with the class-level docblock below — it walks through the vulnerability,
 * the fix, and what each test proves, in plain English.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Auth\decrypt;
use function WPE\FaustWP\Auth\encrypt;
use function WPE\FaustWP\Auth\get_user_from_access_token;
use function WPE\FaustWP\Settings\faustwp_update_setting;

/**
 * Locks in the fix for GHSA-q6pm-r77q-qcv3.
 *
 * --------------------------------------------------------------------------
 * Quick primer: what is a "token envelope"?
 * --------------------------------------------------------------------------
 * FaustWP issues short strings ("tokens") to authenticate headless requests.
 * The plaintext inside every token is three pipe-separated fields:
 *
 *     <type>|<user_id>|<expiration_unix_timestamp>
 *
 * Where <type> is:
 *
 *     "ac" — authorization code (1-minute lifetime, exchanged at /authorize)
 *     "at" — access token       (5-minute lifetime, sent as a Bearer header)
 *     "rt" — refresh token      (2-week lifetime, used to mint a new "at")
 *
 * So an authorization code for user 2 looks like: "ac|2|9999999999".
 *
 * FaustWP never sends that plaintext over the wire. It wraps it in what the
 * advisory calls an "envelope":
 *
 *     base64( IV || HMAC || ciphertext )
 *
 * Where:
 *
 *     IV         — 16 random bytes ("initialization vector"), required by
 *                  AES-CBC encryption so two identical plaintexts produce
 *                  different ciphertexts.
 *     HMAC       — 32-byte signature proving the envelope wasn't tampered
 *                  with. Computed with the server's secret key. WordPress
 *                  refuses to decrypt anything whose HMAC doesn't match.
 *     ciphertext — AES-256-CBC( plaintext, secret_key, IV ).
 *
 * --------------------------------------------------------------------------
 * The bug
 * --------------------------------------------------------------------------
 * Before the patch, the HMAC was computed over the ciphertext ALONE — the IV
 * was left unsigned. The advisory's key insight is that AES-CBC's first
 * plaintext block is derived by:
 *
 *     plaintext[0..15] = D_k( ciphertext[0..15] ) XOR IV
 *
 * So an attacker who possesses any valid token can XOR bits into the IV and
 * mutate the first 16 bytes of decrypted plaintext to anything they want.
 * The HMAC still verifies because the ciphertext is untouched.
 *
 * The advisory's concrete attack: a logged-in Subscriber asks /generate for
 * their own authorization code, which decrypts to "ac|2|<exp>" (user 2,
 * which they are). They flip two IV bytes and the same envelope now
 * decrypts to "at|1|<exp>" — an *access token* (not an auth code) for user
 * 1 (the Administrator). They send it as `Authorization: Bearer`, the REST
 * API treats them as the admin, they POST to /wp-json/wp/v2/users to create
 * a new admin account, full site takeover.
 *
 * --------------------------------------------------------------------------
 * The fix
 * --------------------------------------------------------------------------
 * Include the IV in the HMAC input on both encrypt and decrypt. Any change
 * to the IV now breaks the HMAC check, so the decryption step is skipped
 * and the attacker gets false instead of a forged token. The bytes on the
 * wire are still arranged the same way — only what the HMAC covers changed.
 *
 * --------------------------------------------------------------------------
 * What these tests prove
 * --------------------------------------------------------------------------
 *  1. The fix did not break ordinary encrypt/decrypt round-tripping.
 *  2. The exact bit-flip attack from the advisory now fails — both at the
 *     low-level decrypt() helper and at the higher-level
 *     get_user_from_access_token() that REST endpoints actually call.
 *
 * @group auth
 */
class AuthFunctionsTests extends \WP_UnitTestCase {

	/**
	 * Deterministic secret used for the lifetime of each test, so envelopes
	 * the tests produce don't depend on whatever the site has configured.
	 * Format is just a UUID — the value itself is not meaningful, the
	 * stability is.
	 */
	const TEST_SECRET = '00000000-0000-4000-8000-0000000000aa';

	/** @var string The secret_key option value before this test ran. */
	private $original_secret_key = '';

	/**
	 * Override the FaustWP secret key with a known value. encrypt() reads
	 * from the same option as production, so without this the tests would
	 * pick up whatever (random) key the test environment happens to have.
	 */
	public function setUp(): void {
		parent::setUp();

		$settings                  = get_option( 'faustwp_settings', array() );
		$this->original_secret_key = isset( $settings['secret_key'] ) ? (string) $settings['secret_key'] : '';

		faustwp_update_setting( 'secret_key', self::TEST_SECRET );
	}

	/**
	 * Put the original secret key back so we don't leak test state into
	 * sibling test classes that share the same WordPress test database.
	 */
	public function tearDown(): void {
		faustwp_update_setting( 'secret_key', $this->original_secret_key );
		parent::tearDown();
	}

	/**
	 * Smoke test: encrypting and then decrypting still returns the original
	 * plaintext. This is the first thing that would fail if the HMAC change
	 * accidentally broke the encrypt/decrypt primitives themselves.
	 */
	public function test_encrypt_decrypt_round_trip(): void {
		// Shape: "<type>|<user_id>|<expiration>". 9999999999 is the year
		// 2286 — far enough out that the expiration check (handled
		// elsewhere) won't reject it during the test run.
		$plaintext = 'ac|2|9999999999';

		$this->assertSame( $plaintext, decrypt( encrypt( $plaintext ) ) );
	}

	/**
	 * Reproduces the exact attack chain from GHSA-q6pm-r77q-qcv3 and
	 * confirms the patched code rejects it.
	 *
	 * Why this test is shaped the way it is:
	 *
	 *   AES-CBC decryption gives you:
	 *
	 *     plaintext[i] = D_k(ciphertext)[i] XOR IV[i]   (for i in 0..15)
	 *
	 *   That means if we XOR `IV[i]` with `(original_byte XOR target_byte)`,
	 *   the decrypted byte at position `i` becomes `target_byte` while every
	 *   other byte of plaintext is unchanged. The HMAC used to ignore the
	 *   IV, so this surgical edit produced a forgery that still validated.
	 *
	 *   The advisory's example mutates "ac|2|..." into "at|1|...":
	 *
	 *     Position 1:  'c'  ->  't'    (turns "ac" into "at")
	 *     Position 3:  '2'  ->  '1'    (turns user id "2" into user id "1")
	 *
	 *   Result before the patch: a valid-looking access token for user 1.
	 *   Result after the patch:  decrypt() returns false because the HMAC
	 *                            now covers the IV too.
	 */
	public function test_iv_flip_cannot_forge_access_token_from_authorization_code(): void {
		// 1. Start from a legitimate envelope. In the real attack the
		//    Subscriber would obtain this from GET /generate; here we just
		//    call encrypt() with the same plaintext shape that endpoint
		//    would produce.
		$envelope = encrypt( 'ac|2|9999999999' );

		// 2. Decode the base64 wrapper so we can edit the IV in place.
		//    Byte layout of $raw: [IV: 0..15] [HMAC: 16..47] [ciphertext: 48+].
		$raw = base64_decode( $envelope );

		// 3a. Flip the second plaintext byte: 'c' -> 't'.
		//     We touch ONLY IV[1]; ciphertext and HMAC remain untouched.
		$raw[1] = chr( ord( $raw[1] ) ^ ( ord( 'c' ) ^ ord( 't' ) ) );

		// 3b. Flip the fourth plaintext byte: '2' -> '1'.
		$raw[3] = chr( ord( $raw[3] ) ^ ( ord( '2' ) ^ ord( '1' ) ) );

		// 4. Repackage. After the patch this envelope's HMAC no longer
		//    matches, because the HMAC now signs (IV || ciphertext) and we
		//    just changed two IV bytes.
		$forged = base64_encode( $raw );

		// The low-level primitive rejects the tampered envelope outright.
		$this->assertFalse( decrypt( $forged ) );

		// And so does the higher-level helper that REST callbacks use to
		// resolve Authorization: Bearer headers — confirming no caller
		// upstream could accidentally accept the forgery.
		$this->assertFalse( get_user_from_access_token( $forged ) );
	}
}
