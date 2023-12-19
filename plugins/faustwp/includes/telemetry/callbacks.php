<?php
/**
 * Telemetry callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Telemetry;

use function WPE\FaustWP\Settings\faustwp_get_setting;

add_action( 'admin_notices', __NAMESPACE__ . '\show_telemetry_prompt' );
/**
 * Shows opt-in telemetry admin notice.
 *
 * @return void
 */
function show_telemetry_prompt() {
	// how to tell if user is admin.
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	// which screens will have the prompt.
	$screens_to_show = array( 'plugins', 'settings_page_faustwp-settings' );

	// checks to see if the screen is either of the two options above.
	$current_screen = get_current_screen();
	if ( is_object( $current_screen ) && ! in_array( $current_screen->id, $screens_to_show, true ) ) {
		return;
	}

	$remind_me_later  = faustwp_get_setting( 'telemetry_reminder', false );
	$enable_telemetry = faustwp_get_setting( 'enable_telemetry', false );
	if ( $enable_telemetry ) {
		return;
	}

	$now = new DateTime( 'now', new DateTimeZone( 'UTC' ) );
	if ( ! empty( $remind_me_later ) && $now->getTimestamp() < $remind_me_later ) {
		return;
	}

	$dismiss_url = add_query_arg( 'dismiss_admin_notice_example', '1' );
	?>
		<div class="notice notice-warning">
			<p><em><?php esc_html_e( 'Telemetry Prompt:', 'faustwp' ); ?></em>
			<?php echo wp_kses_post( __( 'To help Faust.js make decisions on where to focus our efforts for you, we would like to collect anonymous information on how you are using the plugin’s features. You can read more on what we collect by reading <a href="https://faustjs.org/guide/how-to-toggle-telemetry">Toggling Telemetry - Faust.js™</a>. If you are comfortable with sharing, please enable telemetry.', 'faustwp' ) ); ?>
			<a href="<?php echo esc_url( $dismiss_url ); ?>"><?php esc_html_e( 'Dismiss', 'faustwp' ); ?></a></p>
		</div>
	<?php
}
