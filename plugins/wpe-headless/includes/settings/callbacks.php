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
		'authentication_settings_section',
		__( 'Authentication Codes', 'wpe-headless' ),
		'',
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
		'secret_key',
		__( 'Secret Key', 'wpe-headless' ),
		'wpe_headless_display_secret_key_field',
		'wpe-headless-settings',
		'authentication_settings_section'
	);

	add_settings_field(
		'frontend_uri',
		__( 'Preview Base Address (URL)', 'wpe-headless' ),
		'wpe_headless_display_frontend_uri_field',
		'wpe-headless-settings',
		'authentication_settings_section'
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
 * Callback for WordPress add_settings_field() method parameter.
 *
 * Display the "API Key" text field.
 *
 * Added hidden field to preserve value during settings save.
 *
 * @return void
 */
function wpe_headless_display_secret_key_field() {
	$secret_key = wpe_headless_get_secret_key();

	?>
	<input type="text" id="secret_key" value="<?php echo esc_attr( $secret_key ); ?>" class="regular-text code" disabled />
	<input type="hidden" name="wpe_headless[secret_key]" value="<?php echo esc_attr( $secret_key ); ?>" />
	<?php
}

/**
 * Callback for WordPress add_settings_field() method parameter.
 *
 * Display the Preview Base Address (URL) field.
 *
 * @return void
 */
function wpe_headless_display_frontend_uri_field() {
	$frontend_uri = wpe_headless_get_setting( 'frontend_uri', '' );

	?>
	<input type="text" id="frontend_uri" name="wpe_headless[frontend_uri]" value="<?php echo esc_attr( $frontend_uri ); ?>" class="regular-text" />
	<?php
}
