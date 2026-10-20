<?php
/**
 * Class ApplicationPasswordAuthTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Settings\faustwp_update_setting;
use function WPE\FaustWP\REST\rest_authorize_permission_callback;
use function WPE\FaustWP\REST\rest_blockset_permission_callback;
use function WPE\FaustWP\REST\rest_telemetry_permission_callback;
use function WPE\FaustWP\REST\rest_process_telemetry_permission_callback;
use function WPE\FaustWP\REST\rest_validate_secret_key_permission_callback;

/**
 * Tests that the FaustWP REST routes accept Application Passwords alongside the secret key.
 *
 * @group rest
 * @group auth
 */
class ApplicationPasswordAuthTests extends \WP_UnitTestCase {

	const SECRET = '00000000-0000-4000-8000-000000000002';

	public function setUp(): void {
		parent::setUp();
		faustwp_update_setting( 'secret_key', self::SECRET );
	}

	public function tearDown(): void {
		unset( $GLOBALS['wp_rest_application_password_uuid'] );
		wp_set_current_user( 0 );
		parent::tearDown();
	}

	/**
	 * Logs in a user the way WordPress does after validating an Application Password.
	 */
	private function authenticate_with_application_password( $user_id ) {
		wp_set_current_user( $user_id );
		$GLOBALS['wp_rest_application_password_uuid'] = wp_generate_uuid4();
	}

	private function request( $route ) {
		return new \WP_REST_Request( 'POST', $route );
	}

	private function create_admin() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		if ( is_multisite() ) {
			// Network admins are tested separately; this is a site administrator.
			revoke_super_admin( $user_id );
		}
		return $user_id;
	}

	private function create_user_with_capability( $capability ) {
		$user_id = self::factory()->user->create( array( 'role' => 'subscriber' ) );
		get_user_by( 'id', $user_id )->add_cap( $capability );
		return $user_id;
	}

	public function test_secret_header_still_authorizes_without_a_user() {
		$request = $this->request( '/faustwp/v1/authorize' );
		$request->set_header( 'x-faustwp-secret', self::SECRET );

		$this->assertTrue( rest_authorize_permission_callback( $request ) );
		$this->assertTrue( rest_blockset_permission_callback( $request ) );
	}

	public function test_authorize_accepts_an_administrators_application_password() {
		$this->authenticate_with_application_password( $this->create_admin() );

		$this->assertTrue( rest_authorize_permission_callback( $this->request( '/faustwp/v1/authorize' ) ) );
	}

	public function test_authorize_accepts_a_user_whose_role_grants_exchange_tokens() {
		$this->authenticate_with_application_password( $this->create_user_with_capability( 'faustwp_exchange_tokens' ) );

		$this->assertTrue( rest_authorize_permission_callback( $this->request( '/faustwp/v1/authorize' ) ) );
	}

	public function test_authorize_rejects_an_application_password_without_the_capability() {
		$this->authenticate_with_application_password( self::factory()->user->create( array( 'role' => 'editor' ) ) );

		$this->assertFalse( rest_authorize_permission_callback( $this->request( '/faustwp/v1/authorize' ) ) );
	}

	public function test_authorize_rejects_an_administrator_logged_in_with_a_cookie() {
		wp_set_current_user( $this->create_admin() );

		$this->assertFalse( rest_authorize_permission_callback( $this->request( '/faustwp/v1/authorize' ) ) );
		$this->assertFalse( rest_blockset_permission_callback( $this->request( '/faustwp/v1/blockset' ) ) );
	}

	public function test_server_routes_share_the_authorize_check() {
		$this->authenticate_with_application_password( $this->create_user_with_capability( 'faustwp_exchange_tokens' ) );

		$this->assertTrue( rest_telemetry_permission_callback( $this->request( '/faustwp/v1/telemetry' ) ) );
		$this->assertTrue( rest_process_telemetry_permission_callback( $this->request( '/faustwp/v1/process_telemetry' ) ) );
		$this->assertTrue( rest_validate_secret_key_permission_callback( $this->request( '/faustwp/v1/validate_secret_key' ) ) );
	}

	public function test_blockset_rejects_a_user_who_can_only_exchange_tokens() {
		$this->authenticate_with_application_password( $this->create_user_with_capability( 'faustwp_exchange_tokens' ) );

		$this->assertFalse( rest_blockset_permission_callback( $this->request( '/faustwp/v1/blockset' ) ) );
	}

	public function test_blockset_capability_cannot_be_granted_through_a_role() {
		$this->authenticate_with_application_password( $this->create_user_with_capability( 'faustwp_upload_blocks' ) );

		$this->assertFalse( rest_blockset_permission_callback( $this->request( '/faustwp/v1/blockset' ) ) );
	}

	public function test_blockset_accepts_an_administrators_application_password_on_a_single_site() {
		if ( is_multisite() ) {
			$this->markTestSkipped( 'Single site only.' );
		}

		$this->authenticate_with_application_password( $this->create_admin() );

		$this->assertTrue( rest_blockset_permission_callback( $this->request( '/faustwp/v1/blockset' ) ) );
	}

	public function test_blockset_rejects_a_site_administrator_on_multisite() {
		if ( ! is_multisite() ) {
			$this->markTestSkipped( 'Multisite only.' );
		}

		$this->authenticate_with_application_password( $this->create_admin() );

		$this->assertFalse( rest_blockset_permission_callback( $this->request( '/faustwp/v1/blockset' ) ) );
	}

	public function test_blockset_accepts_a_super_admin_on_multisite() {
		if ( ! is_multisite() ) {
			$this->markTestSkipped( 'Multisite only.' );
		}

		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		grant_super_admin( $user_id );
		$this->authenticate_with_application_password( $user_id );

		$this->assertTrue( rest_blockset_permission_callback( $this->request( '/faustwp/v1/blockset' ) ) );
	}
}
