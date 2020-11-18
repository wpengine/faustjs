<?php
/**
 * Class for rest API endpoints
 *
 */
class WPE_Headless_Api {
    public static function init() {
        add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );
        add_filter( 'determine_current_user', array( __CLASS__, 'auth_handler' ), 20 );
    }

    public static function register_routes() {
		register_rest_route( 'wpac/v1', '/authorize', array(
			'methods' => 'POST',
			'callback' => __CLASS__ . '::authorize',
			'permission_callback' => __CLASS__ . '::authorize_permission',
		) );
    }

    public static function authorize(WP_REST_Request $request) {
        $code = $request->get_param('code');
        $user_id = self::get_user_id_with_token($code, 'ac', 60);
        $access_token = WPE_Headless_Crypto::encrypt('at|' . $user_id . '|' . time());

        return (object)array(
            'access_token' => $access_token
        );
    }

    public static function authorize_permission( WP_REST_Request $request ) {
        // $user = wp_get_current_user();
        // current_user_can( 'edit_user', $data['user_id'] );
        $secret = WPE_Headless_Constants::get_secret_key_option();
        $header_secret = $request->get_header(WPE_Headless_Constants::SECRET_HEADER);

        if ($secret !== $header_secret) {
            return false;
        }

        $code = $request->get_param('code');
        $user_id = self::get_user_id_with_token($code, 'ac', 60);

        if (!$user_id) {
            return false;
        }

        $user = get_user_by( 'id', $user_id );

        if (!$user) {
            return false;
        }

        return true;
	}

    public static function get_user_id_with_token($code, $type, $duration) {
        if (!isset($code)) {
            return false;
        }

        $decrypted_code = WPE_Headless_Crypto::decrypt($code);

        if (!isset($decrypted_code)) {
            return false;
        }

        $split = explode('|', $decrypted_code);
        $code_type = $split[0];
        $user_id = $split[1];
        $expiration = $split[2];

        if (!(isset($code_type) && isset($user_id) && isset($expiration))) {
            return false;
        }

        if ($code_type !== $type) {
            return false;
        }

        $current_time = time();
        $diff = $current_time - (int)$expiration;

        if ($diff > $duration) {
            return false;
        }

        return $user_id;
    }

	/**
	 * Loosely Based on https://github.com/WP-API/Basic-Auth/blob/master/basic-auth.php
	 */
	public static function auth_handler( $input_user ){
		// Don't authenticate twice.
		if ( ! empty( $input_user ) ) {
			return $input_user;
		}

		// Check that we're trying to authenticate
		if ( ! isset( $_SERVER['HTTP_AUTHORIZATION'] ) ) {
			return $input_user;
		}

        $split = explode(' ', trim($_SERVER['HTTP_AUTHORIZATION']));
        $token = $split[1];

        if (!isset($token)) {
            return $input_user;
        }

		$user = self::authenticate( $input_user, $token );

		if ( $user instanceof WP_User ) {
			return $user->ID;
		}

		// If it wasn't a user what got returned, just pass on what we had received originally.
		return $input_user;
	}

	/**
	 * Check if the current request is an API request
	 * for which we should check the HTTP Auth headers.
	 *
	 * @return boolean
	 */
	public static function is_api_request() {
		// Process the authentication only after the APIs have been initialized.
		$WPGRAPHQL_REQUEST = function_exists('is_graphql_http_request') ? is_graphql_http_request() : false;
		return ( ( defined( 'XMLRPC_REQUEST' ) && XMLRPC_REQUEST ) || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || $WPGRAPHQL_REQUEST );
	}

	/**
	 * Filter the user to authenticate.
	 */
	public static function authenticate( $input_user, $token ) {
		if ( ! apply_filters( 'WPE_Headless_is_api_request', self::is_api_request() ) ) {
			return $input_user;
		}

        $user_id = self::get_user_id_with_token(trim($token), 'at', 9999999);

        if (!$user_id) {
            return $input_user;
        }

        $user = get_user_by( 'id', $user_id );

		// If the user is invalid, short circuit.
		if ( $user ) {
			return $user;
        }

		return $input_user;
	}
}