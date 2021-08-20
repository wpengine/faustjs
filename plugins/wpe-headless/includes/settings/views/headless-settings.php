<?php
/**
 * The view used on the Settings → Headless admin page.
 *
 * @package WPE_Headless
 */

?>
<div class="wrap">
	<header>
		<svg class="wpengine" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.29413L2.29411 0H9.64706V9.64707H0V2.29413ZM10.1765 0H19.8235V7.35294L17.4706 9.64707H12.4706L10.1765 7.35294V0ZM22.6471 10.1765L20.3529 12.4706V17.5294L22.6471 19.8235H30V10.1765H22.6471ZM10.1765 30H19.8235V22.6471L17.4706 20.3529H12.4706L10.1765 22.6471V30ZM30 30V22.6471L27.7059 20.3529H20.3529V30H30ZM20.3529 0V7.35294L22.6471 9.64707H30V0H20.3529ZM13.6471 15C13.6471 15.7059 14.2353 16.353 15 16.353C15.7647 16.353 16.3529 15.7647 16.3529 15C16.3529 14.2941 15.7647 13.6471 15 13.6471C14.2941 13.6471 13.6471 14.2353 13.6471 15ZM9.64706 10.1765H0V19.8235H7.29411L9.64706 17.5294V10.1765ZM7.29411 20.3529L9.64706 22.6471V27.7059L7.29411 30H0V20.3529H7.29411Z" fill="white"/>
		</svg>
		<h1><?php esc_html_e( 'Headless by WP&nbsp;Engine', 'wpe-headless' ); ?></h1>
	</header>
	<?php
	/**
	 * Since we are just checking for the existence of the "new_activation" query param,
	 * and not using the value, there is no real need to verify the nonce.
	 */
	if (
			! empty( $_GET['new_activation'] ) && // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			! get_option( 'permalink_structure' )
		) :
		?>
				<div class="wp-header-end">
					<div class="notice notice-warning is-dismissible" style="margin: 16px;">
						<p>
						<?php esc_html_e( 'Permalinks are not currently configured. Choose any setting to make your headless development easier.', 'wpe-headless' ); ?><br />
							<a href="/wp-admin/options-permalink.php"><?php esc_html_e( 'Go to Permalinks Settings', 'wpe-headless' ); ?></a>
						</p>
					</div>
				</div>
		<?php endif; ?>

	<h2 class="main"><?php esc_html_e( 'Headless Settings', 'wpe-headless' ); ?></h2>

	<div class="with-sidebar">
		<div>
			<div class="content">
				<form action="options.php" method="POST">
					<?php settings_fields( 'wpe_headless' ); ?>

					<?php do_settings_sections( 'wpe-headless-settings' ); ?>

					<?php submit_button(); ?>
				</form>
			</div>
			<div class="sidebar">
				<div class="box get-started primary">
					<h3><?php esc_html_e( 'Get Started With Headless', 'wpe-headless' ); ?></h3>
					<section>
						<h4><?php esc_html_e( 'Install WPGraphQL', 'wpe-headless' ); ?></h4>
						<p><a href="https://www.wpgraphql.com/docs/quick-start/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Learn about the plugin', 'wpe-headless' ); ?></a>.</p>
						<?php if ( function_exists( 'graphql' ) ) : ?>
							<button class="button-primary" disabled><?php esc_html_e( '☑️ WPGraphQL is active', 'wpe-headless' ); ?></button>
						<?php else : ?>
							<button class="button-primary" id="wpe-headless-button-install-graphql" aria-label="<?php esc_html_e( 'Install and Activate the WPGraphQL plugin', 'wpe-headless' ); ?>"><?php esc_html_e( 'Install and Activate', 'wpe-headless' ); ?></button>
							<span class="spinner"></span>
							<p class="error-message"></p>
						<?php endif; ?>
					</section>
					<?php if ( ! get_option( 'permalink_structure' ) ) : ?>
					<section>
						<h4><?php esc_html_e( 'Enable Permalinks', 'wpe-headless' ); ?></h4>
						<p><?php esc_html_e( 'Headless is easier with pretty permalinks! If you are unsure of which option to choose, go with "Post Name".', 'wpe-headless' ); ?></p>
						<p><a href="/wp-admin/options-permalink.php"><?php esc_html_e( 'Go to Settings', 'wpe-headless' ); ?></a></p>
					</section>
					<?php endif; ?>
					<section>
						<h4><?php esc_html_e( 'Create Your Headless App', 'wpe-headless' ); ?></h4>
						<p><a href="https://github.com/wpengine/faustjs/#readme" target="_blank" rel="noopener noreferrer">Follow our setup guide</a>.</p>
					</section>
				</div>
				<div class="box docs">
					<h3>Headless Documentation</h3>
					<section>
						<ul>
							<li><a href="https://github.com/wpengine/faustjs/#headless-wordpress-framework" target="_blank" rel="noopener noreferrer">Getting started</a></li>
							<li><a href="https://github.com/wpengine/faustjs/blob/main/packages/next/src/HeadlessProvider.tsx" target="_blank" rel="noopener noreferrer">HeadlessProvider component</a></li>
							<li><a href="https://github.com/wpengine/faustjs/blob/main/docs/previews/README.md" target="_blank" rel="noopener noreferrer">Post previews</a></li>
						</ul>
						<p><a class="button-primary" href="https://github.com/wpengine/faustjs/" target="_blank" rel="noopener noreferrer">Headless on GitHub</a></p>
					</section>
				</div>
			</div>
		</div>
	</div>
</div>
