<?php
/**
 * Class for encrypting and decrypting tokens
 *
 */
class WPE_Headless_Crypto {
    const SECRET_KEY = WPE_Headless_Constants::SECRET_KEY;
    const SECRET_HEADER = WPE_Headless_Constants::SECRET_HEADER;
    const ENCRYPTION_METHOD = WPE_Headless_Constants::ENCRYPTION_METHOD;
    const ENCRYPTION_ALGO = WPE_Headless_Constants::ENCRYPTION_ALGO;

    public static function encrypt( $string ) {
        $info = self::get_encryption_info();
        return base64_encode( openssl_encrypt( $string, $info->method, $info->key, 0, $info->iv ) );
    }

    public static function decrypt( $string ) {
        $info = self::get_encryption_info();
        return openssl_decrypt( base64_decode( $string ), $info->method, $info->key, 0, $info->iv );
    }

    public static function get_encryption_info() {
        $secret_key = self::SECRET_KEY;
        $secret_iv = WPE_Headless_Constants::get_secret_key_option() . self::get_default_key();
        $encrypt_method = self::ENCRYPTION_METHOD;
        $key = hash( self::ENCRYPTION_ALGO, $secret_key );
        $iv = substr( hash( self::ENCRYPTION_ALGO, $secret_iv ), 0, 16 );

        return (object)array(
            'method' => $encrypt_method,
            'key' => $key,
            'iv' => $iv
        );
    }

    public static function get_default_key() {
        if ( defined( 'WPE_Headless_SECRET_KEY' ) && '' !== WPE_Headless_SECRET_KEY ) {
			return WPE_Headless_SECRET_KEY;
		}

		if ( defined( 'AUTH_KEY' ) && '' !== AUTH_KEY ) {
			return AUTH_KEY;
		}

		// If this is reached, you're either not on a live site or have a serious security issue.
		return WPE_Headless_Constants::get_secret_key_option();
    }
}