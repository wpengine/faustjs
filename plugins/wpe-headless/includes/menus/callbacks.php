<?php
/**
 * Resets menu locations to those from Settings → Headless → Menu Locations.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Menus;

use function WPE\FaustWP\Settings\faustwp_get_setting;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\\remove_menu_locations', 100 );
/**
 * Callback for WordPress 'after_setup_theme' action.
 *
 * Unregisters menu locations such as those provided by the active PHP theme.
 */
function remove_menu_locations() {
	$menus = array_keys( get_registered_nav_menus() );

	array_walk( $menus, 'unregister_nav_menu' );
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\\register_menu_locations', 101 );
/**
 * Callback for WordPress 'after_setup_theme' action.
 *
 * Registers menus specified at Settings → Headless → Menu Locations.
 */
function register_menu_locations() {
	$location_setting = faustwp_get_setting( 'menu_locations', 'Primary, Footer' );
	$locations        = explode( ',', $location_setting );
	$menus            = array();

	foreach ( $locations as $location ) {
		$location = trim( $location );
		$key      = sanitize_title_with_dashes( $location );

		if ( $key ) {
			$menus[ $key ] = $location;
		}
	}

	if ( $menus ) {
		register_nav_menus( $menus );
	}
}
