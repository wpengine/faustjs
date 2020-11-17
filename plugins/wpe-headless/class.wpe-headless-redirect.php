<?php
/**
 * Class for redirect endpoints
 *
 */
class WPE_Headless_Redirect {
    public static function init() {
        add_action('parse_request', array( __CLASS__, 'handle_generate' ));
    }

    public static function handle_generate($request) {
        if (preg_match('/^\/generate/', $_SERVER['REQUEST_URI'])) {
            $redirect = $_GET['redirect_uri'];

            if ($redirect === '') {
                echo 'No redirect URL specified.';

                exit;
            }

            $parsed_frontend_uri = parse_url(WPE_Headless_Constants::get_frontend_uri_option());
            $allowed_redirects = $parsed_frontend_uri['scheme']. '://' . $parsed_frontend_uri['host'] . ',http://localhost,https://localhost,http://0.0.0.0,https://0.0.0.0';

            $parsed_redirect = parse_url($redirect);
            $redirect_host = $parsed_redirect['scheme']. '://' . $parsed_redirect['host'];

            if (strpos($allowed_redirects, $redirect_host) === false) {
                echo 'Redirect not allowed';

                exit;
            }

            if (is_user_logged_in()) {
                $code = WPE_Headless_Crypto::encrypt('ac|' . wp_get_current_user()->ID . '|' . time());

                if (strpos($redirect, '?') !== false) {
                    wp_redirect($redirect . '&code=' . $code);
                } else {
                    wp_redirect($redirect . '?code=' . $code);
                }

                exit;
            } else {
                $login_redirect = wp_login_url(self::get_http() . $_SERVER['HTTP_HOST'] . '/generate/?redirect_uri=' . urlencode($redirect));
                wp_redirect($login_redirect);

                exit;
            }
        }
    }

    public static function get_http() {
        $http = "https://";
        if(!(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')) {
            $http = "http://";
        }

        return $http;
    }
}
