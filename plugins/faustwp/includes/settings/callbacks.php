<?php
/**
 * Settings related callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'admin_notices', __NAMESPACE__ . '\\frontend_url_notice' );
/**
 * Callback for WordPress 'admin_notices' action.
 *
 * Show frontend_url missing error if it doesn't exist.
 *
 * @return void
 */
function frontend_url_notice() {
	$screen = get_current_screen();

	// Exit if not this plugin's settings page.
	if ( 'settings_page_faustwp-settings' !== $screen->id ) {
		return;
	}

	$frontend_url_setting = faustwp_get_setting( 'frontend_uri' );

	if ( empty( $frontend_url_setting ) ) {
		?>
			<div class="notice notice-error is-dismissible" style="background-color: #FFEAE9;">
				<p><?php esc_html_e( 'Front-end site URL is required to utilize url rewrites and previews.', 'faustwp' ); ?></p>
				<p><?php esc_html_e( 'It is highly recommended that you update it below to avoid unexpected behavior.', 'faustwp' ); ?></p>
				<p>
					<?php
					printf(
						/* translators: Link text */
						esc_html__( 'See the %1$s Getting Started Documentation%2$s for more details.', 'faustwp' ),
						'<a href="https://faustjs.org/docs/getting-started" target="_blank" rel="noopener noreferrer">',
						'</a>'
					);
					?>
				</p>
			</div>
		<?php
	}
}

add_action( 'admin_menu', __NAMESPACE__ . '\\register_settings_menu' );
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
function register_settings_menu() {
	add_submenu_page(
		'options-general.php',
		__( 'Faust', 'faustwp' ),
		__( 'Faust', 'faustwp' ),
		'manage_options',
		'faustwp-settings',
		__NAMESPACE__ . '\\display_settings_page'
	);
}

add_action( 'admin_init', __NAMESPACE__ . '\\register_settings' );
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
function register_settings() {
	register_setting( 'faustwp_settings', 'faustwp_settings' );
}

add_action( 'admin_init', __NAMESPACE__ . '\\register_settings_section' );
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
function register_settings_section() {
	add_settings_section(
		'settings_section',
		null,
		null,
		'faustwp-settings'
	);
}

add_action( 'admin_init', __NAMESPACE__ . '\\register_settings_fields' );
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
function register_settings_fields() {
	add_settings_field(
		'frontend_uri',
		__( 'Front-end site URL', 'faustwp' ),
		__NAMESPACE__ . '\\display_frontend_uri_field',
		'faustwp-settings',
		'settings_section',
		array(
			'class'     => 'align-middle',
			'label_for' => 'frontend_uri',
		)
	);

	add_settings_field(
		'secret_key',
		__( 'Secret Key', 'faustwp' ),
		__NAMESPACE__ . '\\display_secret_key_field',
		'faustwp-settings',
		'settings_section',
		array(
			'class'     => 'align-middle',
			'label_for' => 'secret_key',
		)
	);

	add_settings_field(
		'menu_locations',
		__( 'Menu Locations', 'faustwp' ),
		__NAMESPACE__ . '\\display_menu_locations_field',
		'faustwp-settings',
		'settings_section',
		array(
			'class'     => 'align-middle',
			'label_for' => 'menu_locations',
		)
	);

	add_settings_field(
		'enable_disable',
		__( 'Features', 'faustwp' ),
		__NAMESPACE__ . '\\display_enable_disable_fields',
		'faustwp-settings',
		'settings_section'
	);
}

add_filter( 'sanitize_option_faustwp_settings', __NAMESPACE__ . '\\sanitize_faustwp_settings', 10, 2 );
/**
 * Validates and sanitizes Faust settings.
 *
 * The plugin settings page will display any relevant errors when
 * rejecting invalid settings values. Updates to Faust settings that
 * are not initiated from the plugin settings page will not return or
 * display errors, but will still reject invalid values.
 *
 * Once settings are validated, the sanitized values are returned.
 *
 * @param array  $settings Faust settings array to validate and sanitize.
 * @param string $option   WP option name where settings are saved.
 * @return array Sanitized settings.
 */
function sanitize_faustwp_settings( $settings, $option ) {
	$errors    = null;
	$protocols = array( 'http', 'https' );
	foreach ( $settings as $name => $value ) {
		switch ( $name ) {
			case 'frontend_uri':
				if ( '' === $value || preg_match( '#http(s?)://(.+)#i', $value ) ) {
					$settings[ $name ] = esc_url_raw( $value, $protocols );
				} else {
					$errors[ $name ]   = __( 'The Front-end site URL you entered did not appear to be a valid URL. Please enter a valid URL.', 'faustwp' );
					$settings[ $name ] = faustwp_get_setting( $name );
				}
				break;

			case 'secret_key':
				if ( ! wp_is_uuid( $value, 4 ) ) {
					$errors[ $name ]   = __( 'The secret key you entered did not appear to be a valid UUID.', 'faustwp' );
					$settings[ $name ] = get_secret_key();
				}
				break;

			case 'menu_locations':
				$settings[ $name ] = sanitize_text_field( $value );
				break;

			case 'enable_redirects':
			case 'enable_rewrites':
			case 'disable_theme':
			case 'enable_image_source':
				if ( $value ) {
					$settings[ $name ] = '1';
				} else {
					unset( $settings[ $name ] );
				}
				break;

			default:
				// Remove any settings we don't expect.
				unset( $settings[ $name ] );
		}
	}

	if ( null !== $errors && is_array( $errors ) ) {
		foreach ( $errors as $name => $error ) {
			add_settings_error( $option, "faustwp_invalid_{$name}", $error );
		}
	}

	return $settings;
}

add_action( 'load-settings_page_faustwp-settings', __NAMESPACE__ . '\\handle_regenerate_secret_key', 5 );
/**
 * Callback for WordPress 'load-{$page_hook}' action.
 *
 * Nonce set in WPE\FaustWP\Settings\display_secret_key_field().
 *
 * Regenerate the secret key.
 *
 * @return void
 */
function handle_regenerate_secret_key() {
	$screen = get_current_screen();
	if ( 'settings_page_faustwp-settings' !== $screen->id ) {
		return;
	}

	if ( empty( $_GET['regenerate_nonce'] ) ) {
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	check_admin_referer( 'regenerate_secret', 'regenerate_nonce' );

	faustwp_update_setting( 'secret_key', wp_generate_uuid4() );

	wp_safe_redirect(
		admin_url( '/options-general.php?page=faustwp-settings' )
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
function display_settings_page() {
	require FAUSTWP_DIR . '/includes/settings/views/headless-settings.php';
}

/**
 * Callback for WordPress add_settings_field() method parameter.
 *
 * Display the "Menu Locations" text field.
 *
 * @return void
 */
function display_menu_locations_field() {
	$menu_locations = faustwp_get_setting( 'menu_locations', 'Primary, Footer' );

	?>
	<input type="text" id="menu_locations" name="faustwp_settings[menu_locations]" value="<?php echo esc_attr( $menu_locations ); ?>" class="regular-text" />

	<p class="description">
		<?php esc_html_e( 'A comma-separated list of menu locations. Assign menus to locations at Appearance → Menus.', 'faustwp' ); ?>
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
function display_secret_key_field() {
	$secret_key     = get_secret_key();
	$regenerate_url = wp_nonce_url(
		admin_url( 'options-general.php?page=faustwp-settings' ),
		'regenerate_secret',
		'regenerate_nonce'
	);

	?>
	<input type="text" id="secret_key" value="<?php echo esc_attr( $secret_key ); ?>" class="regular-text code" readonly />
	<input type="hidden" name="faustwp_settings[secret_key]" value="<?php echo esc_attr( $secret_key ); ?>" />

	<a
		href="<?php echo esc_url( $regenerate_url ); ?>"
		title="<?php esc_attr_e( 'Regenerate Secret Key', 'faustwp' ); ?>"
		onclick="confirm_regenerate_key( event )"
		class="field-action"
	>
		<?php esc_html_e( 'Regenerate', 'faustwp' ); ?>
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
			wp_kses_post( __( 'This key is used to enable <a href="%s" target="_blank" rel="noopener noreferrer">headless post previews</a>.', 'faustwp' ) ),
			'https://faustjs.org/docs/next/guides/post-page-previews'
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
function display_frontend_uri_field() {
	$frontend_uri = faustwp_get_setting( 'frontend_uri', '' );

	?>
	<input type="text" id="frontend_uri" name="faustwp_settings[frontend_uri]" value="<?php echo esc_attr( $frontend_uri ); ?>" class="regular-text" />
	<p class="description">
		<?php esc_html_e( 'The full URL to your headless front-end, including https:// or http://. This is used for authenticated post previews and for rewriting links to point to your front-end site.', 'faustwp' ); ?>
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
function display_enable_disable_fields() {
	$disable_theme       = is_themes_disabled();
	$enable_rewrites     = is_rewrites_enabled();
	$enable_redirects    = is_redirects_enabled();
	$enable_image_source = is_image_source_replacement_enabled();

	?>
	<fieldset>
		<legend style="margin-bottom:5px;padding:0;">
			<p class="description">
				<?php
				printf(
				/* translators: %s: Documentation URL. */
					wp_kses_post( __( 'Learn more about <a href="%s" target="_blank" rel="noopener noreferrer">features</a>.', 'faustwp' ) ),
					'https://faustjs.org/docs/faustwp/settings'
				);
				?>
			</p>
		</legend>
		<label for="disable_theme">
			<input type="checkbox" id="disable_theme" name="faustwp_settings[disable_theme]" value="1" <?php checked( $disable_theme ); ?> />
			<?php esc_html_e( 'Disable WordPress theme admin pages', 'faustwp' ); ?>
		</label>
		<br />

		<label for="enable_rewrites">
			<input type="checkbox" id="enable_rewrites" name="faustwp_settings[enable_rewrites]" value="1" <?php checked( $enable_rewrites ); ?> />
			<?php esc_html_e( 'Enable Post and Category URL rewrites', 'faustwp' ); ?>
		</label>
		<br />

		<label for="enable_redirects">
			<input type="checkbox" id="enable_redirects" name="faustwp_settings[enable_redirects]" value="1" <?php checked( $enable_redirects ); ?> />
			<?php esc_html_e( 'Enable public route redirects', 'faustwp' ); ?>
		</label>
		<br />

		<label for="enable_image_source">
			<input type="checkbox" id="enable_image_source" name="faustwp_settings[enable_image_source]" value="1" <?php checked( $enable_image_source ); ?> />
			<?php esc_html_e( 'Use the WordPress domain for media URLs in post content', 'faustwp' ); ?>
		</label>
	</fieldset>
	<?php
}

add_action( 'load-settings_page_faustwp-settings', __NAMESPACE__ . '\\verify_graphql_dependency' );
/**
 * Verifies the WP GraphQL dependency is met.
 *
 * If not, it adds an admin notice and related scripts
 * for installing and activating the plugin.
 *
 * @return void
 */
function verify_graphql_dependency() {
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\add_settings_assets' );
}

/**
 * Enqueues the settings stylesheet and scripts at Settings → Headless.
 *
 * Callback for admin_enqueue_scripts.
 */
function add_settings_assets() {
	$plugin = get_plugin_data( FAUSTWP_FILE );

	wp_enqueue_style(
		'faustwp-settings',
		FAUSTWP_URL . 'includes/settings/assets/style.css',
		array(),
		$plugin['Version']
	);

	if ( ! function_exists( 'graphql' ) ) {
		wp_enqueue_script(
			'faustwp-wpgraphql-install',
			FAUSTWP_URL . 'includes/settings/assets/js/wpgraphql-install.js',
			array( 'wp-a11y', 'wp-api-fetch' ),
			$plugin['Version'],
			true
		);

		$faustwp = array(
			'wpgraphqlIsInstalled' => array_key_exists( 'wp-graphql/wp-graphql.php', get_plugins() ),
			'icons'                => array(
				'checkSmall' => get_icon( 'check-small' ),
			),
			'strings'              => array(
				'default'    => esc_html__( 'Install and Activate', 'faustwp' ),
				'installing' => esc_html__( 'Installing…', 'faustwp' ),
				'active'     => esc_html__( 'WPGraphQL is active', 'faustwp' ),
				'failed'     => esc_html__( 'Installation failed', 'faustwp' ),
			),
		);

		wp_localize_script(
			'faustwp-wpgraphql-install',
			'faustwp',
			$faustwp
		);
	}
}

add_filter( 'plugin_action_links_faustwp/faustwp.php', __NAMESPACE__ . '\\add_action_link_settings' );
/**
 * Adds a link to the Settings page on the Installed Plugins page.
 *
 * @param array $links The array of plugin action links.
 */
function add_action_link_settings( $links ) {
	$url = add_query_arg( 'page', 'faustwp-settings', admin_url( 'options-general.php' ) );
	return array_merge(
		array(
			'<a href="' . esc_url( $url ) . '">' . esc_html__( 'Settings', 'faustwp' ) . '</a>',
		),
		$links
	);
}

add_filter( 'faustwp_get_setting', __NAMESPACE__ . '\\trim_frontend_uri_trailing_slash', 10, 2 );
/**
 * Ensure that this plugin's frontend_uri setting does not have a trailing slash.
 *
 * @param mixed  $value   The setting value.
 * @param string $name    The setting name.
 *
 * @return string
 */
function trim_frontend_uri_trailing_slash( $value, $name ) {
	if ( 'frontend_uri' !== $name ) {
		return $value;
	}

	return untrailingslashit( $value );
}
