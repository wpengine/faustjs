<?php
/**
 * Callbacks for display the prompt of plugin usage tracking.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Usage_Tracking;

const PROMPT_ID = 'faustwp_plugin_usage_tracking';

/**
 * Renders the plugin prompt admin prompt.
 *
 * @return void
 */
function show_usage_tracking_prompt() {
	if ( ! needs_prompt() ) {
		return;
	}

	printf(
		'<div id="%s" class="notice notice-info notice-alt is-dismissible">
			<h2 class="notice-title">%s</h2>
			<p>%s&nbsp;<b>%s</b></p>
		</div>',
		esc_attr( PROMPT_ID ),
		esc_html__( 'FaustWP enable usage tracking', 'faustwp' ),
		esc_html__( 'Opt into anonymous usage tracking to help us make Faust.js better.', 'faustwp' ),
		esc_html__( 'Settings -> Headless -> Enable usage tracking', 'faustwp' ),
	);
}
add_action( 'admin_notices', __NAMESPACE__ . '\\show_usage_tracking_prompt' );

/**
 * Includes a script for dismissing the plugin usage tracking prompt.
 *
 * Modified from https://github.com/WPTT/admin-notices.
 *
 * @return void
 */
function print_scripts() {
	if ( ! needs_prompt() ) {
		return;
	}

	// Create a nonce.
	$nonce = wp_create_nonce( PROMPT_ID );
	?>
	<script>

	window.addEventListener( 'load', function() {
		let wait_for_btn = null;
		let notice_selector = '#<?php echo esc_attr( PROMPT_ID ); ?>';

		// Wait for core WP to add the dismiss button to the prompt.
		wait_for_btn = setInterval(function() {
			let dismissBtn = document.querySelector( notice_selector );

			if (!dismissBtn && !dismissBtn.length) {
				return;
			}

			clearInterval(wait_for_btn);

			// Add an event listener to the dismiss button.
			dismissBtn.addEventListener( 'click', function( event ) {
				let postData = new FormData();
				postData.append('action', '<?php echo esc_attr( PROMPT_ID ); ?>');
				postData.append('nonce', '<?php echo esc_html( $nonce ); ?>');

				window.fetch('<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>', {
					method: 'POST',
					body: postData,
				})
			});
		}, 100);
	});
	</script>
	<?php
}
add_action( 'admin_footer', __NAMESPACE__ . '\\print_scripts' );

/**
 * Ajax handler for dismissing usage tracking prompt.
 *
 * Modified from https://github.com/WPTT/admin-notices.
 *
 * @return void
 */
function ajax_maybe_dismiss_prompt() {
	// Sanity check: Early exit if we're not on a faustwp_plugin_usage_tracking action.
	if ( ! isset( $_POST['action'] ) || esc_attr( PROMPT_ID ) !== $_POST['action'] ) {
		return;
	}

	// Security check: Make sure nonce is OK.
	check_ajax_referer( PROMPT_ID, 'nonce', true );

	dismiss_usage_tracking_prompt();
}
add_action( 'wp_ajax_' . PROMPT_ID, __NAMESPACE__ . '\\ajax_maybe_dismiss_prompt' );
