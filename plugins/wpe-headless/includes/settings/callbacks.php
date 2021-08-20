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
		'settings_section',
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
		'settings_section',
		array(
			'class'     => 'align-middle',
			'label_for' => 'frontend_uri',
		)
	);

	add_settings_field(
		'secret_key',
		__( 'Secret Key', 'wpe-headless' ),
		'wpe_headless_display_secret_key_field',
		'wpe-headless-settings',
		'settings_section',
		array(
			'class'     => 'align-middle',
			'label_for' => 'secret_key',
		)
	);

	add_settings_field(
		'menu_locations',
		__( 'Menu Locations', 'wpe-headless' ),
		'wpe_headless_display_menu_locations_field',
		'wpe-headless-settings',
		'settings_section',
		array(
			'class'     => 'align-middle',
			'label_for' => 'menu_locations',
		)
	);

	add_settings_field(
		'enable_disable',
		__( 'Features', 'wpe-headless' ),
		'wpe_headless_display_enable_disable_fields',
		'wpe-headless-settings',
		'settings_section'
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

	if ( ! current_user_can( 'manage_options' ) ) {
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
	require WPE_HEADLESS_DIR . '/includes/settings/views/headless-settings.php';
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
	<input type="text" id="secret_key" value="<?php echo esc_attr( $secret_key ); ?>" class="regular-text code" readonly />
	<input type="hidden" name="wpe_headless[secret_key]" value="<?php echo esc_attr( $secret_key ); ?>" />

	<a
		href="<?php echo esc_url( $regenerate_url ); ?>"
		title="<?php esc_attr_e( 'Regenerate Secret Key', 'wpe-headless' ); ?>"
		onclick="confirm_regenerate_key( event )"
		class="field-action"
	>
		<?php esc_html_e( 'Regenerate', 'wpe-headless' ); ?>
	</a>

	<script type="text/javascript">
		function confirm_regenerate_key( event ) {
			if ( ! confirm( 'Are you sure you want to regenerate your secret key?' ) ) {
				event.preventDefault();
			}
		}
	</script>

	<p class="description">
		<?php
		printf(
			/* translators: %s: Documentation URL. */
			wp_kses_post( __( 'This key is used to enable <a href="%s" target="_blank" rel="noopener noreferrer">headless post previews</a>.', 'wpe-headless' ) ),
			'https://github.com/wpengine/faustjs/blob/main/docs/previews/README.md'
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

/**
 * Callback for WordPress add_settings_field() method parameter.
 *
 * Display the enable/disable features section.
 *
 * @return void
 */
function wpe_headless_display_enable_disable_fields() {
	$disable_theme       = wpe_headless_is_themes_disabled();
	$enable_rewrites     = wpe_headless_is_rewrites_enabled();
	$enable_redirects    = wpe_headless_is_redirects_enabled();
	$enable_image_source = wpe_headless_is_image_source_replacement_enabled();

	?>
	<fieldset>
		<label for="disable_theme">
			<input type="checkbox" id="disable_theme" name="wpe_headless[disable_theme]" value="1" <?php checked( $disable_theme ); ?> />
			<?php esc_html_e( 'Disable WordPress theme admin pages', 'wpe-headless' ); ?>
		</label>
		<br />

		<label for="enable_rewrites">
			<input type="checkbox" id="enable_rewrites" name="wpe_headless[enable_rewrites]" value="1" <?php checked( $enable_rewrites ); ?> />
			<?php esc_html_e( 'Enable Post and Category URL rewrites', 'wpe-headless' ); ?>
		</label>
		<br />

		<label for="enable_redirects">
			<input type="checkbox" id="enable_redirects" name="wpe_headless[enable_redirects]" value="1" <?php checked( $enable_redirects ); ?> />
			<?php esc_html_e( 'Enable public route redirects', 'wpe-headless' ); ?>
		</label>
		<br />

		<label for="enable_image_source">
			<input type="checkbox" id="enable_image_source" name="wpe_headless[enable_image_source]" value="1" <?php checked( $enable_image_source ); ?> />
			<?php esc_html_e( 'Use the WordPress domain for media URLs in post content', 'wpe-headless' ); ?>
		</label>
	</fieldset>
	<?php
}

add_action( 'load-settings_page_wpe-headless-settings', 'wpe_headless_verify_graphql_dependency' );
/**
 * Verifies the WP GraphQL dependency is met.
 *
 * If not, it adds an admin notice and related scripts
 * for installing and activating the plugin.
 *
 * @return void
 */
function wpe_headless_verify_graphql_dependency() {
	add_action( 'admin_enqueue_scripts', 'wpe_headless_add_settings_assets' );
}

/**
 * Enqueues the settings stylesheet and scripts at Settings → Headless.
 *
 * Callback for admin_enqueue_scripts.
 */
function wpe_headless_add_settings_assets() {
	$plugin = get_plugin_data( WPE_HEADLESS_FILE );

	wp_enqueue_style(
		'wpe-headless-settings',
		WPE_HEADLESS_URL . 'includes/settings/assets/style.css',
		array(),
		$plugin['Version']
	);

	if ( ! function_exists( 'graphql' ) ) {
		wp_enqueue_script(
			'wpe-headless-wpgraphql-install',
			WPE_HEADLESS_URL . 'includes/settings/assets/js/wpgraphql-install.js',
			array( 'wp-a11y', 'wp-api-fetch' ),
			$plugin['Version'],
			true
		);

		$wpe_headless = array(
			'wpgraphqlIsInstalled' => array_key_exists( 'wp-graphql/wp-graphql.php', get_plugins() ),
			'strings'              => array(
				'default'    => esc_html__( 'Install and Activate', 'wpe-headless' ),
				'installing' => esc_html__( 'Installing…', 'wpe-headless' ),
				'active'     => esc_html__( 'WPGraphQL is active', 'wpe-headless' ),
				'failed'     => esc_html__( 'Installation failed', 'wpe-headless' ),
			),
		);

		wp_localize_script(
			'wpe-headless-wpgraphql-install',
			'wpeHeadless',
			$wpe_headless
		);
	}
}
