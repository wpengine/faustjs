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
 * @param \WP_User $wp_user A WP_User object.
 *
 * @return string An encrypted code.
 */
function wpe_headless_generate_user_code( $wp_user ) {
	return WPE_Headless_Crypto::encrypt( 'ac|' . $wp_user->ID . '|' . time() );
}
