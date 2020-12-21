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
		'frontend_site_section',
		null,
		null,
		'wpe-headless-settings'
	);

	add_settings_section(
		'menu_locations_section',
		null,
		null,
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
		'frontend_uri',
		__( 'Front-end site URL', 'wpe-headless' ),
		'wpe_headless_display_frontend_uri_field',
		'wpe-headless-settings',
		'frontend_site_section'
	);

	add_settings_field(
		'secret_key',
		__( 'Secret Key', 'wpe-headless' ),
		'wpe_headless_display_secret_key_field',
		'wpe-headless-settings',
		'frontend_site_section'
	);

	add_settings_field(
		'menu_locations',
		__( 'Menu Locations', 'wpe-headless' ),
		'wpe_headless_display_menu_locations_field',
		'wpe-headless-settings',
		'menu_locations_section'
	);
}

add_action( 'load-settings_page_wpe-headless-settings', 'wpe_headless_handle_regenerate_secret_key', 5 );
/**
 * Callback for WordPress 'load-{$page_hook}' action.
 *
 * Nonce set in wpe_headless_display_secret_key_field().
 *
 * Regenerate the secret key.
 *
 * @return void
 */
function wpe_headless_handle_regenerate_secret_key() {
	$screen = get_current_screen();
	if ( 'settings_page_wpe-headless-settings' !== $screen->id ) {
		return;
	}

	if ( empty( $_GET['regenerate_nonce'] ) ) {
		return;
	}

	check_admin_referer( 'regenerate_secret', 'regenerate_nonce' );

	wpe_headless_update_setting( 'secret_key', wp_generate_uuid4() );

	wp_safe_redirect(
		admin_url( '/options-general.php?page=wpe-headless-settings' )
	);

	exit;
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
 * Display the "Menu Locations" text field.
 *
 * @return void
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
 * Display the "API Key" text field.
 *
 * Added hidden field to preserve value during settings save.
 *
 * @return void
 */
function wpe_headless_display_secret_key_field() {
	$secret_key     = wpe_headless_get_secret_key();
	$regenerate_url = wp_nonce_url(
		admin_url( 'options-general.php?page=wpe-headless-settings' ),
		'regenerate_secret',
		'regenerate_nonce'
	);

	?>
	<input type="text" id="secret_key" value="<?php echo esc_attr( $secret_key ); ?>" class="regular-text code" disabled />
	<input type="hidden" name="wpe_headless[secret_key]" value="<?php echo esc_attr( $secret_key ); ?>" />

	<a href="<?php echo esc_url( $regenerate_url ); ?>" title="<?php esc_attr_e( 'Regenerate Secret Key', 'wpe-headless' ); ?>">
		<?php esc_html_e( 'Regenerate', 'wpe-headless' ); ?>
	</a>

	<p class="description">
		<?php
		printf(
			/* translators: %s: link to documentation */
			wp_kses_post( 'This key is used to enable post previewing with Next.js. Read about post previewing <a href="%s" target="_blank" rel="noopener noreferrer">here</a>.', 'wpe-headless' ),
			'https://github.com/wpengine/headless-framework/blob/main/docs/previews/README.md'
		);
		?>
	</p>
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
	<p class="description">
		<?php esc_html_e( 'The URL to your headless front-end. This is used for authenticated post previews and for rewriting links to point to your front-end site.', 'wpe-headless' ); ?>
	</p>
	<?php
}
