<?php
/**
 * Disables wp-admin menu items that aren't supported in a headless environment.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'admin_menu', 'wpe_headless_remove_admin_menu_pages', 1000 );
/**
 * Remove wp-admin menu items not needed in a headless environment.
 *
 * @global $submenu
 *
 * @return void
 */
function wpe_headless_remove_admin_menu_pages() {
	/**
	 * Global submenu data
	 *
	 * @var array
	 */
	global $submenu;

	if ( ! wpe_headless_is_themes_disabled() ) {
		return;
	}

	// Remove Appearance > Themes.
	remove_submenu_page( 'themes.php', 'themes.php' );

	// Remove Appearance > Theme Editor.
	remove_submenu_page( 'themes.php', 'theme-editor.php' );

	// Remove Appearance > Widgets.
	remove_submenu_page( 'themes.php', 'widgets.php' );

	/**
	 * Remove features that require the Customizer.
	 * Loop through the themes.php submenu to remove features in Customizer
	 * since there's no direct way to remove them via the submenu_slug.
	 * Targeting 'hide-if-no-customize' removes all the features that
	 * rely on the Customizer. Otherwise you must target each one
	 * specifically by name (which might be a good idea?).
	 */
	if ( isset( $submenu['themes.php'] ) ) {
		foreach ( $submenu['themes.php'] as $key => $item ) {
			if ( in_array( 'hide-if-no-customize', $item, true ) ) {
				unset( $submenu['themes.php'][ $key ] );
			}
		}
	}
}

add_action( 'wp_before_admin_bar_render', 'wpe_headless_remove_admin_bar_items' );
/**
 * Removes admin bar items not needed in a headless environment.
 *
 * @return void
 */
function wpe_headless_remove_admin_bar_items() {
	/**
	 * WP Admin Bar global
	 *
	 * @var WP_Admin_Bar $wp_admin_bar
	 */
	global $wp_admin_bar;

	if ( ! wpe_headless_is_themes_disabled() ) {
		return;
	}

	$wp_admin_bar->remove_menu( 'customize' );
	$wp_admin_bar->remove_node( 'themes' );
	$wp_admin_bar->remove_node( 'widgets' );
}

add_action( 'current_screen', 'wpe_headless_prevent_admin_page_access' );
/**
 * Prevents access to named pages by redirecting to the admin root.
 *
 * @return void
 */
function wpe_headless_prevent_admin_page_access() {
	if ( ! wpe_headless_is_themes_disabled() ) {
		return;
	}

	$screen = get_current_screen();

	if ( is_object( $screen ) && 'themes' === $screen->id ) {
		wp_safe_redirect( admin_url() );
		exit;
	}
}
