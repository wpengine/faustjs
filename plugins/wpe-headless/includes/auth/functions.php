<?php
/**
 * Redirect related functions.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate a refresh token given a user.
 *
 * @uses wpe_headless_generate_user_code()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false.
 */
function wpe_headless_generate_refresh_token( $wp_user, $duration ) {
	return wpe_headless_generate_user_code( $wp_user, 'rt', $duration );
}

/**
 * Generate an access token given a user.
 *
 * @uses wpe_headless_generate_user_code()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false.
 */
function wpe_headless_generate_access_token( $wp_user, $duration ) {
	return wpe_headless_generate_user_code( $wp_user, 'at', $duration );
}

/**
 * Generate an authorization code given a user.
 *
 * @uses wpe_headless_generate_user_code()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false.
 */
function wpe_headless_generate_authorization_code( $wp_user, $duration ) {
	return wpe_headless_generate_user_code( $wp_user, 'ac', $duration );
}

/**
 * Get a WP_User given a refresh token.
 *
 * @uses wpe_headless_get_user_from_code()
 *
 * @param string $token A base 64 encoded string.
 *
 * @return WP_user|bool A WP_User object or false.
 */
function wpe_headless_get_user_from_refresh_token( $token ) {
	return wpe_headless_get_user_from_code( $token, 'rt' );
}

/**
 * Get a WP_User given an access token.
 *
 * @uses wpe_headless_get_user_from_code()
 *
 * @param string $token    A base 64 encoded string.
 *
 * @return WP_User|bool A WP_User object or false.
 */
function wpe_headless_get_user_from_access_token( $token ) {
	return wpe_headless_get_user_from_code( $token, 'at' );
}

/**
 * Get a WP_User given an authorization code.
 *
 * @uses wpe_headless_get_user_from_code()
 *
 * @param string $code     A base 64 encoded string.
 *
 * @return WP_User|bool A WP_User object or false.
 */
function wpe_headless_get_user_from_authorization_code( $code ) {
	return wpe_headless_get_user_from_code( $code, 'ac' );
}

/**
 * Generate an encrypted code for the given WP_User and type.
 *
 * @uses wpe_headless_encrypt()
 *
 * @param WP_User $wp_user A WP_User object.
 * @param string  $type    The type of code. Either 'at', 'rt', or 'at'.
 * @param int     $duration The duration in seconds to remain valid.
 *
 * @return string|bool An encrypted string or false if failure.
 */
function wpe_headless_generate_user_code( $wp_user, $type, $duration ) {
	if ( empty( $wp_user->ID ) ) {
		return false;
	}

	return wpe_headless_encrypt( "{$type}|{$wp_user->ID}|" . ( time() + $duration ) );
}

/**
 * Get a WP_User given a base 64 encoded code.
 *
 * @param string $code     The base64 encoded encrypted code.
 * @param string $type     The type of code. Either 'ac' or 'at'.
 *
 * @return WP_User|bool A WP_User object or false.
 */
function wpe_headless_get_user_from_code( $code, $type ) {
	$code = wpe_headless_decrypt( $code );
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
function wpe_headless_encrypt( $value ) {
	$secret_key = wpe_headless_get_secret_key();

	if ( ! $secret_key ) {
		return false;
	}

	$iv          = openssl_random_pseudo_bytes( openssl_cipher_iv_length( 'AES-256-CBC' ) );
	$cipher_text = openssl_encrypt( $value, 'AES-256-CBC', $secret_key, OPENSSL_RAW_DATA, $iv );

	if ( ! $cipher_text ) {
		return false;
	}

	$hash = hash_hmac( 'sha256', $cipher_text, $secret_key, true );

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
function wpe_headless_decrypt( $value ) {
	$secret_key      = wpe_headless_get_secret_key();
	$decrypted_value = false;

	if ( ! $secret_key ) {
		return $decrypted_value;
	}

	$value       = base64_decode( $value ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
	$iv_length   = openssl_cipher_iv_length( 'AES-256-CBC' );
	$iv          = substr( $value, 0, $iv_length );
	$hash        = substr( $value, $iv_length, 32 );
	$cipher_text = substr( $value, $iv_length + 32 );
	$hash_comp   = hash_hmac( 'sha256', $cipher_text, $secret_key, true );

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
function wpe_headless_get_default_key() {
	if ( defined( 'WP_HEADLESS_SECRET_KEY' ) && WP_HEADLESS_SECRET_KEY ) {
		return WP_HEADLESS_SECRET_KEY;
	}

	if ( defined( 'AUTH_KEY' ) && AUTH_KEY ) {
		return AUTH_KEY;
	}

	return wpe_headless_get_secret_key();
}
