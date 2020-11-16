<?php
/**
 * Class for constants
 *
 */
class WP_Headless_Constants {
    const SECRET_KEY = 'wp_headlesss_secret';
    const FRONTEND_URI = 'wp_headlesss_base_uri';
    const SECRET_HEADER = 'x-wp-api-secret';
    const ENCRYPTION_METHOD = 'AES-256-CBC';
    const ENCRYPTION_ALGO = 'sha256';

    public static function get_secret_key_option() {
        return get_option(self::SECRET_KEY);
    }

    public static function get_frontend_uri_option() {
        return get_option(self::FRONTEND_URI);
    }
}
