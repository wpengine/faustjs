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
	$secret_key = wpe_headless_get_secret_key();

	?>
	<input type="text" id="secret_key" value="<?php echo esc_attr( $secret_key ); ?>" class="regular-text code" disabled />
	<input type="hidden" name="wpe_headless[secret_key]" value="<?php echo esc_attr( $secret_key ); ?>" />
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
	if ( function_exists( 'graphql' ) ) {
		return;
	}
	add_action( 'admin_notices', 'wpe_headless_display_graphql_notice' );
	add_action( 'admin_enqueue_scripts', 'wpe_headless_add_graphql_scripts' );
}

/**
 * Displays the WP GraphQL dependency notice.
 */
function wpe_headless_display_graphql_notice() {
	?>
	<div id="wpe-headless-notice-graphql" class="notice notice-info wpe-headless-notice wpe-headless-notice-graphql">
		<p>
			<?php
			printf(
			/* translators: %s: Link to plugin install page. */
				wp_kses_post( __( 'WP Engine Headless requires the WP GraphQL plugin. <a id="wpe-headless-link-install-graphql" href="%s">Install and activate it now</a>.', 'wpe-headless' ) ),
				esc_url( admin_url( 'plugin-install.php?s=wp+graphql&tab=search&type=term' ) )
			);
			?>
		</p>
	</div>
	<?php
}

/**
 * Adds the scripts required to install the
 * WP GraphQL plugin dependency.
 */
function wpe_headless_add_graphql_scripts() {
	wp_enqueue_script( 'wp-api-fetch' );
	?>
	<script>
		document.addEventListener( 'DOMContentLoaded', function() {
			document.getElementById( 'wpe-headless-link-install-graphql' ).onclick = ( event ) => {
				event.preventDefault();
				doGraphQLInstall();
			}
		} );

		// Installs and activates the WP GraphQL plugin.
		async function doGraphQLInstall() {
			updateGraphQLNotice( 'installing' );

			let installed = false;

			/**
			 * Check if the plugin is installed first.
			 * Otherwise the REST endpoint downloads
			 * and tries to install the plugin before
			 * returning an error that the folder
			 * already exists.
			 */
			await isGraphQLPluginInstalled().then( ( result ) => {
				installed = result;
			} ).catch( ( result ) => {
				console.log( result );
				installed = false;
			} );

			if ( installed ) {
				await activateGraphQL();
			} else {
				await installActivateGraphQLPlugin();
			}
			updateGraphQLNotice( 'complete' );
		}

		// Updates the admin notice text.
		function updateGraphQLNotice( type = 'installing' ) {
			const notices = document.getElementsByClassName( 'wpe-headless-notice-graphql' );
			const notice = notices[0];
			switch ( type ) {
				case 'installing':
					notice.innerHTML = '<p>Installing and activating the WP GraphQL plugin...</p>';
					break;

				case 'complete':
					notice.innerHTML = '<p>GraphQL installed and activated!</p>';
					break;
			}
		}

		// Returns whether or not the WP GraphQL plugin is installed.
		async function isGraphQLPluginInstalled() {
			let installed = false;
			await wp.apiFetch( {
				path: '/wp/v2/plugins/wp-graphql/wp-graphql',
				method: 'GET'
			} ).then( ( result ) => {
				if ( result.hasOwnProperty( 'code' ) && result.code === 'rest_plugin_not_found' ) {
					installed = false;
				}

				if ( result.hasOwnProperty( 'plugin' ) && result.plugin === 'wp-graphql/wp-graphql' ) {
					installed = true;
				}
			} );
			return installed;
		}

		// Activates the plugin if it already exists.
		async function activateGraphQL() {
			await wp.apiFetch( {
				path: '/wp/v2/plugins/wp-graphql/wp-graphql',
				method: 'POST',
				data: { status: 'active' },
			} ).then( ( result ) => {
				console.log( result );
			} )
		}

		// Installs and activates the plugin.
		async function installActivateGraphQLPlugin() {
			await wp.apiFetch( {
				path: '/wp/v2/plugins',
				method: 'POST',
				data: { slug: 'wp-graphql', status: 'active' }
			} ).then( ( result ) => {
				console.log(result);
			} );
		}
	</script>
	<?php
}
