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
 * Generate an encrypted code for the given WP_User.
 *
 * @uses wpe_headless_encrypt()
 *
 * @param \WP_User $wp_user A WP_User object.
 *
 * @return string|bool An encrypted string or false.
 */
function wpe_headless_generate_user_auth_code( $wp_user ) {
	if ( empty( $wp_user->ID ) ) {
		return false;
	}

	return wpe_headless_encrypt( "ac|{$wp_user->ID}|" . time() );
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
	$secret_key = wpe_headless_get_setting( 'secret_key' );

	if ( ! $secret_key ) {
		return false;
	}

	$iv          = openssl_random_pseudo_bytes( openssl_cipher_iv_length( 'AES-256-CBC' ) );
	$cipher_text = openssl_encrypt( $value, 'AES-256-CBC', $secret_key, OPENSSL_RAW_DATA, $iv );

	if ( ! $cipher_text ) {
		return false;
	}

	$hash = hash_hmac( 'sha256', $cipher_text, $secret_key, true );

	return base64_encode( $iv . $hash . $cipher_text );
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
	$secret_key      = wpe_headless_get_setting( 'secret_key' );
	$decrypted_value = false;

	if ( ! $secret_key ) {
		return $decrypted_value;
	}

	$value       = base64_decode( $value );
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
	if ( defined( 'WPE_HEADLESS_SECRET_KEY' ) && WPE_HEADLESS_SECRET_KEY ) {
		return WPE_HEADLESS_SECRET_KEY;
	}

	if ( defined( 'AUTH_KEY' ) && AUTH_KEY ) {
		return AUTH_KEY;
	}

	return wpe_headless_get_setting( 'secret_key' );
}
