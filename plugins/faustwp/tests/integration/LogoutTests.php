<?php
/**
 * Class LogoutTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Auth\generate_logout_code;
use function WPE\FaustWP\Auth\generate_refresh_token;
use function WPE\FaustWP\Auth\get_user_from_logout_code;
use function WPE\FaustWP\Auth\get_user_from_refresh_token;
use function WPE\FaustWP\Auth\handle_logout_request;
use function WPE\FaustWP\Settings\faustwp_update_setting;

/**
 * Tests for ending the WordPress session when a user logs out of the frontend.
 *
 * @group auth
 */
class LogoutTests extends \WP_UnitTestCase {

	const SECRET = '00000000-0000-4000-8000-000000000001';

	/**
	 * Where handle_logout_request() last redirected.
	 *
	 * @var string|null
	 */
	private $redirected_to;

	public function setUp(): void {
		parent::setUp();

		faustwp_update_setting( 'secret_key', self::SECRET );
		faustwp_update_setting( 'frontend_uri', 'http://frontend.local' );

		global $wp_rest_server;
		$wp_rest_server = new \WP_REST_Server();
		do_action( 'rest_api_init' );

		// Stop before the redirect's exit, and don't send cookie headers.
		add_filter(
			'wp_redirect',
			function ( $location ) {
				$this->redirected_to = $location;
				throw new \Exception( 'redirected' );
			}
		);
		add_filter( 'send_auth_cookies', '__return_false' );
	}

	public function tearDown(): void {
		global $wp_rest_server;
		$wp_rest_server = null;
		unset( $_GET['faust_logout'], $_GET['redirect_uri'] );

		parent::tearDown();
	}

	private function request_logout_url( $refresh_token, $secret = self::SECRET ) {
		$request = new \WP_REST_Request( 'POST', '/faustwp/v1/logout' );
		$request->set_header( 'content-type', 'application/json' );
		$request->set_header( 'x-faustwp-secret', $secret );
		$request->set_body(
			wp_json_encode(
				array(
					'refreshToken' => $refresh_token,
					'redirectUri'  => 'http://frontend.local/bye',
				)
			)
		);

		return rest_get_server()->dispatch( $request );
	}

	private function visit_logout_url( $url ) {
		wp_parse_str( wp_parse_url( $url, PHP_URL_QUERY ), $query );
		$_GET = array_merge( $_GET, $query );

		try {
			handle_logout_request();
		} catch ( \Exception $e ) {
			$this->assertSame( 'redirected', $e->getMessage() );
		}
	}

	public function test_logout_endpoint_returns_a_url_for_the_refresh_tokens_user() {
		$user = self::factory()->user->create_and_get();

		$response = $this->request_logout_url( generate_refresh_token( $user, HOUR_IN_SECONDS ) );
		$url      = $response->get_data()['logoutUrl'];

		wp_parse_str( wp_parse_url( $url, PHP_URL_QUERY ), $query );

		$this->assertSame( 200, $response->get_status() );
		$this->assertStringStartsWith( home_url( '/' ), $url );
		$this->assertSame( 'http://frontend.local/bye', $query['redirect_uri'] );
		$this->assertSame( $user->ID, get_user_from_logout_code( $query['faust_logout'] )->ID );
	}

	public function test_logout_endpoint_rejects_an_invalid_refresh_token() {
		$this->assertSame( 400, $this->request_logout_url( 'not-a-token' )->get_status() );
	}

	public function test_logout_endpoint_requires_the_secret_key() {
		$user = self::factory()->user->create_and_get();

		$response = $this->request_logout_url( generate_refresh_token( $user, HOUR_IN_SECONDS ), 'wrong' );

		$this->assertSame( 401, $response->get_status() );
	}

	public function test_logout_codes_and_refresh_tokens_are_not_interchangeable() {
		$user = self::factory()->user->create_and_get();

		$this->assertFalse( get_user_from_refresh_token( generate_logout_code( $user, HOUR_IN_SECONDS ) ) );
		$this->assertFalse( get_user_from_logout_code( generate_refresh_token( $user, HOUR_IN_SECONDS ) ) );
	}

	public function test_visiting_the_logout_url_logs_out_its_user_and_redirects() {
		$user = self::factory()->user->create_and_get();
		wp_set_current_user( $user->ID );

		$this->visit_logout_url( $this->request_logout_url( generate_refresh_token( $user, HOUR_IN_SECONDS ) )->get_data()['logoutUrl'] );

		$this->assertSame( 0, get_current_user_id() );
		$this->assertSame( 'http://frontend.local/bye', $this->redirected_to );
	}

	public function test_a_logout_url_for_another_user_does_not_log_out() {
		$owner   = self::factory()->user->create_and_get();
		$visitor = self::factory()->user->create();
		wp_set_current_user( $visitor );

		$this->visit_logout_url( $this->request_logout_url( generate_refresh_token( $owner, HOUR_IN_SECONDS ) )->get_data()['logoutUrl'] );

		$this->assertSame( $visitor, get_current_user_id() );
	}

	public function test_an_expired_logout_code_does_not_log_out() {
		$user = self::factory()->user->create_and_get();
		wp_set_current_user( $user->ID );

		$this->visit_logout_url( add_query_arg( 'faust_logout', rawurlencode( generate_logout_code( $user, -1 ) ), home_url( '/' ) ) );

		$this->assertSame( $user->ID, get_current_user_id() );
	}

	public function test_redirects_to_other_hosts_fall_back_to_the_frontend() {
		$user = self::factory()->user->create_and_get();
		$_GET['redirect_uri'] = 'https://evil.example/';

		$this->visit_logout_url( add_query_arg( 'faust_logout', rawurlencode( generate_logout_code( $user, HOUR_IN_SECONDS ) ), home_url( '/' ) ) );

		$this->assertSame( 'http://frontend.local', $this->redirected_to );
	}
}
