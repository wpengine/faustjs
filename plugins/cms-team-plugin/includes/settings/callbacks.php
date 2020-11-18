<?php
/**
 * Settings related callbacks.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'admin_menu', 'wpe_headless_register_settings_menu' );
/**
 * Callback for WordPress 'admin_menu' action.
 *
 * Register the sub-menu.
 *
 * @uses add_submenu_page()
 * @link https://developer.wordpress.org/reference/functions/add_submenu_page/
 *
 * @return void
 */
function wpe_headless_register_settings_menu() {
	add_submenu_page(
		'options-general.php',
		__( 'Headless', 'wpe-headless' ),
		__( 'Headless', 'wpe-headless' ),
		'manage_options',
		'wpe-headless-settings',
		'wpe_headless_display_settings_page'
	);
}

add_action( 'admin_init', 'wpe_headless_register_settings' );
/**
 * Callback for WordPress 'admin_init' action.
 *
 * Register settings with WordPress.
 *
 * @uses register_setting()
 * @link https://developer.wordpress.org/reference/functions/register_setting/
 *
 * @return void
 */
function wpe_headless_register_settings() {
	register_setting( 'wpe_headless', 'wpe_headless' );
}

add_action( 'admin_init', 'wpe_headless_register_settings_section' );
/**
 * Callback for WordPress 'admin_init' action.
 *
 * Register settings form sections.
 *
 * @uses add_settings_section()
 * @link https://developer.wordpress.org/reference/functions/add_settings_section/
 *
 * @return void
 */
function wpe_headless_register_settings_section() {
	add_settings_section(
		'replacement_setting_section',
		__( 'Domain Replacement', 'wpe-headless' ),
		'wpe_headless_display_replacement_setting_section',
		'wpe-headless-settings'
	);

	add_settings_section(
		'events_setting_section',
		__( 'Events', 'wpe-headless' ),
		'wpe_headless_display_events_setting_section',
		'wpe-headless-settings'
	);

	add_settings_section(
		'menu_locations_section',
		__( 'Menu Locations', 'wpe-headless' ),
		'wpe_headless_display_menu_locations_section',
		'wpe-headless-settings'
	);
}

add_action( 'admin_init', 'wpe_headless_register_settings_fields' );
/**
 * Callback for WordPress 'admin_init' action.
 *
 * Add the settings fields.
 *
 * @uses add_settings_field()
 * @link https://developer.wordpress.org/reference/functions/add_settings_field/
 *
 * @return void
 */
function wpe_headless_register_settings_fields() {
	add_settings_field(
		'replacement_domain',
		__( 'Replacement Domain', 'wpe-headless' ),
		'wpe_headless_display_replacement_domain_field',
		'wpe-headless-settings',
		'replacement_setting_section'
	);

	add_settings_field(
		'events_enabled',
		'',
		'wpe_headless_display_events_enabled_field',
		'wpe-headless-settings',
		'events_setting_section'
	);

	add_settings_field(
		'menu_locations',
		__( 'Locations', 'wpe-headless' ),
		'wpe_headless_display_menu_locations_field',
		'wpe-headless-settings',
		'menu_locations_section'
	);
}

/**
 * Callback for add_submenu_page() function.
 *
 * Display the settings page.
 *
 * @return void
 */
function wpe_headless_display_settings_page() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Headless Settings', 'wpe-headless' ); ?></h1>

		<form action="options.php" method="POST">
			<?php settings_fields( 'wpe_headless' ); ?>

			<?php do_settings_sections( 'wpe-headless-settings' ); ?>

			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

/**
 * Callback for WordPress add_settings_section() function.
 *
 * Display "replacement_setting_section" content.
 *
 * @return void
 */
function wpe_headless_display_replacement_setting_section() {
	?>
	<p class="description">
		<?php esc_html_e( 'Add a query string of `?replace-domain` to API requests to swap the WordPress domain with the replacement domain in response content.', 'wpe-headless' ); ?>
	</p>
	<?php
}

/**
 * Displays the "Menu Locations" field.
 */
function wpe_headless_display_menu_locations_field() {
	$menu_locations = wpe_headless_get_setting( 'menu_locations', 'Primary, Footer' );

	?>
	<input type="text" id="menu_locations" name="wpe_headless[menu_locations]" value="<?php echo esc_attr( $menu_locations ); ?>" class="regular-text" />

	<p class="description">
		<?php esc_html_e( 'A comma-separated list of menu locations. Assign menus to locations at Appearance → Menus.', 'wpe-headless' ); ?>
	</p>
	<?php
}

/**
 * Callback for WordPress add_settings_field() method parameter.
 *
 * Display the "Replacement Domain" text field.
 *
 * @return void
 */
function wpe_headless_display_replacement_domain_field() {
	$replacement_domain = wpe_headless_get_setting( 'replacement_domain', '' );

	?>
	<input type="text" id="replacement_domain" name="wpe_headless[replacement_domain]" value="<?php echo esc_attr( $replacement_domain ); ?>" class="regular-text" />

	<p class="description">
		<?php esc_html_e( 'Leave empty to remove the domain and display only the path.', 'wpe-headless' ); ?>
	</p>
	<?php
}

/**
 * Callback for WordPress add_settings_section() function.
 *
 * Display "events_setting_section" content.
 *
 * @return void
 */
function wpe_headless_display_events_setting_section() {
	?>
	<p class="description">
		<?php esc_html_e( 'Toggle WordPress post/page events to trigger headless api. (Not yet implemented)', 'wpe-headless' ); ?>
	</p>
	<?php
}

/**
 * Displays the "events_setting_section" content.
 */
function wpe_headless_display_menu_locations_section() {
	?>
	<p class="description">
		<?php esc_html_e( 'Add menu locations to group menu items for display.', 'wpe-headless' ); ?>
	</p>
	<?php
}

/**
 * Callback for WordPress add_settings_field() method parameter.
 *
 * Display the "Events" checkbox field.
 *
 * @return void
 */
function wpe_headless_display_events_enabled_field() {
	$enabled = wpe_headless_is_events_enabled();

	?>
	<label for="events_enabled">
		<input type="checkbox" id="events_enabled" name="wpe_headless[events_enabled]" <?php checked( $enabled ); ?> value="1" />
		<?php esc_html_e( 'Events enabled', 'wpe-headless' ); ?>
	</label>
	<?php
}
