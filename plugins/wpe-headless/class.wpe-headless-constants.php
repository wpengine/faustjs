<?php
/**
 * Class for constants
 *
 */
class WPE_Headless_Constants {
    const SECRET_KEY = 'wpe_headlesss_secret';
    const FRONTEND_URI = 'wpe_headlesss_base_uri';
    const SECRET_HEADER = 'x-wpe-headless-secret';
    const ENCRYPTION_METHOD = 'AES-256-CBC';
    const ENCRYPTION_ALGO = 'sha256';

    public static function get_secret_key_option() {
        return get_option(self::SECRET_KEY);
    }

    public static function get_frontend_uri_option() {
        $uri = get_option(self::FRONTEND_URI);

        if (!preg_match('/\/$/', $uri)) {
            return $uri . '/';
        }

        return $uri;
    }
}
