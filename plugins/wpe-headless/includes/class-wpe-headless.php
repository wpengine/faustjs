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
		WPE_Headless_Api::init();
		WPE_Headless_Redirect::init();
	}
}
