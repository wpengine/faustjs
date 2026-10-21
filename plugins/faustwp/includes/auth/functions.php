<?php
/**
 * Redirect related functions.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Auth;

use function WPE\FaustWP\Settings\get_secret_key;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate a refresh token given a user.
 *
 * @uses WPE\FaustWP\Auth\generate_user_code()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false.
 */
function generate_refresh_token( $wp_user, $duration ) {
	return generate_user_code( $wp_user, 'rt', $duration );
}

/**
 * Generate an access token given a user.
 *
 * @uses WPE\FaustWP\Auth\generate_user_code()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false.
 */
function generate_access_token( $wp_user, $duration ) {
	return generate_user_code( $wp_user, 'at', $duration );
}

/**
 * Generate an authorization code given a user.
 *
 * @uses WPE\FaustWP\Auth\generate_user_code()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false.
 */
function generate_authorization_code( $wp_user, $duration ) {
	return generate_user_code( $wp_user, 'ac', $duration );
}

/**
 * Get a WP_User given a refresh token.
 *
 * @uses WPE\FaustWP\Auth\get_user_from_code()
 *
 * @param string $token A base 64 encoded string.
 *
 * @return WP_user|bool A WP_User object or false.
 */
function get_user_from_refresh_token( $token ) {
	return get_user_from_code( $token, 'rt' );
}

/**
 * Get a WP_User given an access token.
 *
 * @uses WPE\FaustWP\Auth\get_user_from_code()
 *
 * @param string $token    A base 64 encoded string.
 *
 * @return WP_User|bool A WP_User object or false.
 */
function get_user_from_access_token( $token ) {
	return get_user_from_code( $token, 'at' );
}

/**
 * Get a WP_User given an authorization code.
 *
 * @uses WPE\FaustWP\Auth\get_user_from_code()
 *
 * @param string $code     A base 64 encoded string.
 *
 * @return WP_User|bool A WP_User object or false.
 */
function get_user_from_authorization_code( $code ) {
	return get_user_from_code( $code, 'ac' );
}

/**
 * Generate a code that logs the given user out of WordPress in their browser.
 *
 * @uses WPE\FaustWP\Auth\generate_user_code()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false.
 */
function generate_logout_code( $wp_user, $duration ) {
	return generate_user_code( $wp_user, 'lo', $duration );
}

/**
 * Get a WP_User given a logout code.
 *
 * @uses WPE\FaustWP\Auth\get_user_from_code()
 *
 * @param string $code A base 64 encoded string.
 *
 * @return WP_User|bool A WP_User object or false.
 */
function get_user_from_logout_code( $code ) {
	return get_user_from_code( $code, 'lo' );
}

/**
 * Generate an encrypted code for the given WP_User and type.
 *
 * @uses WPE\FaustWP\Auth\encrypt()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param string  $type    The type of code. Either 'at', 'rt', or 'at'.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false if failure.
 */
function generate_user_code( $wp_user, $type, $duration ) {
	if ( empty( $wp_user->ID ) ) {
		return false;
	}

	return encrypt( "{$type}|{$wp_user->ID}|" . ( time() + $duration ) );
}

/**
 * Get a WP_User given a base 64 encoded code.
 *
 * @param string $code     The base64 encoded encrypted code.
 * @param string $type     The type of code. Either 'ac' or 'at'.
 *
 * @return WP_User|bool A WP_User object or false.
 */
function get_user_from_code( $code, $type ) {
	$code = decrypt( $code );
	if ( ! $code ) {
		return false;
	}

	$parts = explode( '|', $code );
	if ( count( $parts ) < 3 ) {
		return false;
	}

	if ( $type !== $parts[0] ) {
		return false;
	}

	if ( absint( $parts[2] ) < time() ) {
		return false;
	}

	return get_user_by( 'ID', absint( $parts[1] ) );
}

/**
 * Encrypt a value.
 *
 * @uses openssl_encrypt()
 * @link https://www.php.net/manual/en/function.openssl-encrypt.php
 *
 * @param string $value The value to encrypt.
 *
 * @return string|bool The encrypted value as a base 64 encoded string or false.
 */
function encrypt( $value ) {
	$secret_key = get_secret_key();

	if ( ! $secret_key ) {
		return false;
	}

	$iv          = openssl_random_pseudo_bytes( openssl_cipher_iv_length( 'AES-256-CBC' ) );
	$cipher_text = openssl_encrypt( $value, 'AES-256-CBC', $secret_key, OPENSSL_RAW_DATA, $iv );

	if ( ! $cipher_text ) {
		return false;
	}

	$hash = hash_hmac( 'sha256', $iv . $cipher_text, $secret_key, true );

	return base64_encode( $iv . $hash . $cipher_text ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
}

/**
 * Decrypt a value.
 *
 * @uses openssl_decrypt()
 * @link https://www.php.net/manual/en/function.openssl-decrypt.php
 *
 * @param string $value The base 64 encoded value.
 *
 * @return string|bool The decrypted value or false.
 */
function decrypt( $value ) {
	$secret_key      = get_secret_key();
	$decrypted_value = false;

	if ( ! $secret_key ) {
		return $decrypted_value;
	}

	$value       = base64_decode( $value ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
	$iv_length   = openssl_cipher_iv_length( 'AES-256-CBC' );
	$iv          = substr( $value, 0, $iv_length );
	$hash        = substr( $value, $iv_length, 32 );
	$cipher_text = substr( $value, $iv_length + 32 );
	$hash_comp   = hash_hmac( 'sha256', $iv . $cipher_text, $secret_key, true );

	if ( hash_equals( $hash, $hash_comp ) ) {
		$decrypted_value = openssl_decrypt( $cipher_text, 'AES-256-CBC', $secret_key, OPENSSL_RAW_DATA, $iv );
	}

	return $decrypted_value;
}

/**
 * Get the default key for decryption.
 *
 * @todo Figure this out.
 *
 * @return string The default key.
 */
function get_default_key() {
	if ( defined( 'FAUST_SECRET_KEY' ) && FAUST_SECRET_KEY ) {
		return FAUST_SECRET_KEY;
	}

	if ( defined( 'FAUSTWP_SECRET_KEY' ) && FAUSTWP_SECRET_KEY ) {
		return FAUSTWP_SECRET_KEY;
	}

	if ( defined( 'AUTH_KEY' ) && AUTH_KEY ) {
		return AUTH_KEY;
	}

	return get_secret_key();
}

/**
 * Whether the current request was authenticated with an Application Password.
 *
 * Cookie sessions and Faust access tokens don't count, so a logged-in browser
 * can't pass checks meant for server-to-server credentials.
 *
 * @return bool True if WordPress authenticated the request with an Application Password.
 */
function is_application_password_request() {
	return function_exists( 'rest_get_authenticated_app_password' )
		&& null !== rest_get_authenticated_app_password();
}

/**
 * Whether the current request uses an Application Password whose user has a capability.
 *
 * @param string $capability Capability to check.
 *
 * @return bool True if the request used an Application Password and its user has the capability.
 */
function current_application_password_user_can( $capability ) {
	return is_application_password_request() && current_user_can( $capability );
}
