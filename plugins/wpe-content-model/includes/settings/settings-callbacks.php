<?php
/**
 * Settings related callbacks.
 *
 * @package WPE_Content_Model
 */

declare(strict_types=1);

namespace WPE\ContentModel\Settings;

add_action( 'admin_menu', __NAMESPACE__ . '\register_admin_menu_page' );
/**
 * Registers the wp-admin menu page.
 */
function register_admin_menu_page(): void {
	add_menu_page(
		esc_html__( 'Content Model', 'wpe-content-model' ),
		esc_html__( 'Content Model', 'wpe-content-model' ),
		'manage_options',
		'wpe-content-model',
		__NAMESPACE__ . '\render_admin_menu_page',
		'dashicons-database'
	);
}

/**
 * Renders the wp-admin menu page.
 */
function render_admin_menu_page() {
	include_once __DIR__ . '/views/admin-menu-page.php';
}
