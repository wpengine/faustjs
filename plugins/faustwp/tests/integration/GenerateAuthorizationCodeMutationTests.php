<?php
/**
 * Integration tests for the generateAuthorizationCode GraphQL mutation in
 * plugins/faustwp/includes/graphql/callbacks.php.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

/**
 * Tests for the generateAuthorizationCode mutation's authentication behavior.
 *
 * The mutation authenticates with wp_authenticate(), so callbacks registered on
 * the `authenticate` filter run for the local-login flow exactly as they do for
 * the standard WordPress login path. These tests assert that a callback on that
 * filter is honored for both the username and email inputs, and that the normal
 * valid/invalid credential cases still behave as expected.
 *
 * @group auth
 * @group graphql
 */
class GenerateAuthorizationCodeMutationTests extends \WP_UnitTestCase {

	/**
	 * Known-good credentials for the test user.
	 */
	private const USERNAME = 'editor';
	private const EMAIL    = 'editor@example.test';
	private const PASSWORD = 'correct-horse-battery-staple';

	/**
	 * The `authenticate` filter callback installed by individual tests. Stored so
	 * tearDown can remove it deterministically.
	 *
	 * @var callable|null
	 */
	private $deny_filter = null;

	/**
	 * Filter callback that supplies a secret key, removed in tearDown.
	 *
	 * @var callable|null
	 */
	private $secret_key_filter = null;

	public function setUp(): void {
		parent::setUp();

		// generate_authorization_code() -> encrypt() needs a secret key, or it
		// returns false and the mutation yields an empty code. Force one via the
		// `faustwp_get_setting` filter (the stored option is normalized by a
		// sanitize callback that only registers on admin_init, which phpunit
		// does not run).
		$this->secret_key_filter = static function ( $value, $name ) {
			return 'secret_key' === $name ? 'test-secret-key-for-encryption' : $value;
		};
		add_filter( 'faustwp_get_setting', $this->secret_key_filter, 10, 2 );

		$this->factory()->user->create(
			array(
				'user_login' => self::USERNAME,
				'user_email' => self::EMAIL,
				'user_pass'  => self::PASSWORD,
				'role'       => 'editor',
			)
		);
	}

	public function tearDown(): void {
		if ( null !== $this->deny_filter ) {
			remove_filter( 'authenticate', $this->deny_filter, 30 );
			$this->deny_filter = null;
		}

		if ( null !== $this->secret_key_filter ) {
			remove_filter( 'faustwp_get_setting', $this->secret_key_filter, 10 );
			$this->secret_key_filter = null;
		}

		parent::tearDown();
	}

	/**
	 * Register an `authenticate` filter callback that returns a WP_Error for the
	 * test user.
	 *
	 * Priority 30 places it after WordPress's default password callbacks
	 * (priority 20), matching how callbacks on this filter typically run so they
	 * can act on an otherwise-valid login.
	 */
	private function add_authenticate_filter(): void {
		$this->deny_filter = static function ( $user, $username ) {
			if ( self::USERNAME === $username || self::EMAIL === $username ) {
				return new \WP_Error( 'blocked_login', 'blocked by login policy' );
			}

			return $user;
		};

		add_filter( 'authenticate', $this->deny_filter, 30, 2 );
	}

	/**
	 * Execute the generateAuthorizationCode mutation and return its payload.
	 *
	 * @param array $input The mutation input fields.
	 * @return array{code: ?string, error: ?string} The mutation payload.
	 */
	private function generate_authorization_code( array $input ): array {
		$result = graphql(
			array(
				'query'     => '
					mutation Generate( $username: String, $email: String, $password: String ) {
						generateAuthorizationCode( input: { username: $username, email: $email, password: $password } ) {
							code
							error
						}
					}
				',
				'variables' => array(
					'username' => $input['username'] ?? null,
					'email'    => $input['email'] ?? null,
					'password' => $input['password'] ?? null,
				),
			)
		);

		$this->assertArrayNotHasKey( 'errors', $result, 'The mutation should not raise GraphQL errors.' );

		return $result['data']['generateAuthorizationCode'];
	}

	/**
	 * A WP_Error from an `authenticate` callback is honored for the username
	 * input, even when the password is correct.
	 */
	public function test_authenticate_filter_is_honored_for_username_login(): void {
		$this->add_authenticate_filter();

		$payload = $this->generate_authorization_code(
			array(
				'username' => self::USERNAME,
				'password' => self::PASSWORD,
			)
		);

		$this->assertNull( $payload['code'], 'No authorization code should be issued when the authenticate filter returns an error.' );
		$this->assertSame( 'blocked by login policy', $payload['error'] );
	}

	/**
	 * The same callback is honored for the email input.
	 */
	public function test_authenticate_filter_is_honored_for_email_login(): void {
		$this->add_authenticate_filter();

		$payload = $this->generate_authorization_code(
			array(
				'email'    => self::EMAIL,
				'password' => self::PASSWORD,
			)
		);

		$this->assertNull( $payload['code'], 'No authorization code should be issued when the authenticate filter returns an error.' );
		$this->assertSame( 'blocked by login policy', $payload['error'] );
	}

	/**
	 * With no extra callback, valid credentials still return an authorization
	 * code -- the normal login flow is unchanged.
	 */
	public function test_valid_credentials_without_policy_return_authorization_code(): void {
		$payload = $this->generate_authorization_code(
			array(
				'username' => self::USERNAME,
				'password' => self::PASSWORD,
			)
		);

		$this->assertNull( $payload['error'] );
		$this->assertNotEmpty( $payload['code'], 'A valid login should return an authorization code.' );
	}

	/**
	 * An incorrect password returns an error and no code, with no callback
	 * installed -- baseline behavior of the default password callbacks.
	 */
	public function test_invalid_password_returns_error_and_no_code(): void {
		$payload = $this->generate_authorization_code(
			array(
				'username' => self::USERNAME,
				'password' => 'wrong-password',
			)
		);

		$this->assertNull( $payload['code'] );
		$this->assertNotEmpty( $payload['error'] );
	}
}
