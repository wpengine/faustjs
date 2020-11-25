<?php
/**
 * Class for handling Headless WordPress
 */
class WPE_Headless {
	/**
	 * Add various hooks.
	 *
	 * @access public
	 * @static
	 */
	public static function init() {
		add_filter( 'preview_post_link', array( __CLASS__, 'set_post_preview_link' ) );
		add_filter( 'post_link', array( __CLASS__, 'set_post_link' ) );
		WPE_Headless_Api::init();
		WPE_Headless_Redirect::init();
	}

	public static function set_post_preview_link() {
		$base_uri = WPE_Headless_Constants::get_frontend_uri_option();
		$post     = get_post();

		return $base_uri . base64_encode( 'post:' . $post->ID ) . '/?status=' . $post->post_status . '&preview=true';
	}

	public static function set_post_link() {
		$base_uri = WPE_Headless_Constants::get_frontend_uri_option();
		$post     = get_post();

		if ( $post->post_status === 'draft' ) {
			return $base_uri . base64_encode( 'post:' . $post->ID ) . '/?status=' . $post->post_status . '&preview=true';
		}

		return $base_uri . $post->post_name;
	}
}
