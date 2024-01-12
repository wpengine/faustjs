<?php
/**
 * Telemetry callbacks.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Telemetry;

use function WPE\FaustWP\Settings\faustwp_get_setting;
use function WPE\FaustWP\Utilities\plugin_version;

add_action( 'admin_notices', __NAMESPACE__ . '\show_telemetry_prompt' );
/**
 * Shows opt-in telemetry admin notice.
 *
 * @return void
 */
function show_telemetry_prompt() {
	if ( ! should_show_telemetry_prompt() ) {
		return;
	}

	echo wp_kses_post( telemetry_notice_text() );
}

/**
 * Determines whether the telemetry prompt should be shown.
 *
 * @return boolean
 */
function should_show_telemetry_prompt() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return false;
	}

	$screens_to_show = array( 'plugins', 'settings_page_faustwp-settings' );
	$current_screen  = get_current_screen();
	if ( is_object( $current_screen ) && ! in_array( $current_screen->id, $screens_to_show, true ) ) {
		return false;
	}

	$remind_me_later  = faustwp_get_setting( 'telemetry_reminder', false );
	$enable_telemetry = faustwp_get_setting( 'enable_telemetry', false );
	if ( '1' === $enable_telemetry || 'no' === $enable_telemetry ) {
		return false;
	}

	$now = new \DateTime( 'now', new \DateTimeZone( 'UTC' ) );
	if ( ! empty( $remind_me_later ) && $now->getTimestamp() < $remind_me_later ) {
		return false;
	}

	return true;
}

/**
 * Returns the anonymous opt-in telemetry text
 * to be displayed in an admin notice.
 *
 * @return string
 */
function telemetry_notice_text() {
	return '<div id="faustwp-telemetry-notice" class="notice notice-info">
		<p>' . __( 'To help the Faust.js™ team make decisions on where to focus our efforts for you, we would like to collect anonymous information on how you are using the plugin’s features. You can read more on what we collect by reading <a href="https://faustjs.org/guide/how-to-toggle-telemetry">Faust Telemetry</a>.', 'faustwp' ) . '
		</p>
		<p>' . __( 'Would you like to opt into anonymous telemetry to help improve Faust.js?', 'faustwp' ) . '
		</p>
		<p>
			<button id="faustwp-telemetry-decision-yes" class="button button-primary button-telemetry" value="yes" aria-label="' . esc_html__( 'Opt into anonymous telemetry', 'faustwp' ) . '">' . __( 'Yes', 'faustwp' ) . '</button>
			<button id="faustwp-telemetry-decision-no" class="button button-telemetry" value="no" aria-label="' . esc_html__( 'Opt out of anonymous telemetry', 'faustwp' ) . '">' . __( 'No', 'faustwp' ) . '</button>
			<button id="faustwp-telemetry-decision-remind" class="button button-telemetry" value="remind" aria-label="' . esc_html__( 'Remind me later about anonymous telemetry', 'faustwp' ) . '">' . __( 'Remind me later', 'faustwp' ) . '</button>
		</p>
	</div>';
}

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\load_telemetry_assets' );
/**
 * Loads JS assets related to telemetry.
 *
 * @return void
 */
function load_telemetry_assets() {
	wp_register_script(
		'faustwp-telemetry-handler',
		FAUSTWP_URL . 'includes/telemetry/assets/js/telemetry-decision-handler.js',
		array( 'wp-a11y', 'wp-api-fetch' ),
		plugin_version(),
		array( 'in_footer' => true )
	);

	if ( ! should_show_telemetry_prompt() ) {
		return;
	}

	wp_enqueue_script( 'faustwp-telemetry-handler' );
	wp_localize_script(
		'faustwp-telemetry-handler',
		'faustwp_telemetry',
		array(
			'strings' => array(
				'decision_yes'     => esc_html__( 'Enabling anonymous opt-in telemetry in Faust.', 'faustwp' ),
				'decision_no'      => esc_html__( 'Disabling anonymous opt-in telemetry in Faust.', 'faustwp' ),
				'decision_remind'  => esc_html__( "We'll remind you later about anonymous opt-in telemetry in Faust.", 'faustwp' ),
				'decision_success' => wp_kses_post( '<p>' . __( 'Your telemetry decision has been saved.', 'faustwp' ) . '</p>' ),
				'decision_fail'    => wp_kses_post( '<p>' . __( 'There was a problem saving your telemetry decision. Please refresh the page and try again.', 'faustwp' ) . '</p>' ),
			),
		)
	);
}
