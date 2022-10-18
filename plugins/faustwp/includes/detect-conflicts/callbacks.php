<?php
/**
 * Callbacks for display and dismissal of plugin conflicts warning.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Detect_Conflicts;

/** Unique ID for the conflict warning. */
const NOTICE_ID = 'faustwp_plugin_conflicts';

/**
 * Renders the plugin conflicts admin notice.
 *
 * @return void
 */
function show_warning() {
	if ( ! needs_warning() ) {
		return;
	}

	$plugins  = get_plugin_conflicts();
	$warnings = array();

	foreach ( $plugins as $plugin ) {
		$plugin_headers = get_plugin_data( WP_PLUGIN_DIR . '/' . $plugin );
		$warnings[]     = $plugin_headers['Name'];
	}

	printf(
		'<div id="%s" class="notice notice-warning notice-alt is-dismissible">
			<h2 class="notice-title">%s</h2>
			<p>%s</p>
			<p>%s</p>
		</div>',
		esc_attr( NOTICE_ID ),
		esc_html__( 'Faust detected incompatible plugins', 'faustwp' ),
		esc_html__( 'The following active plugins are known to conflict with Faust and may cause unexpected behavior:', 'faustwp' ),
		esc_html( implode( ', ', $warnings ) )
	);
}
add_action( 'admin_notices', __NAMESPACE__ . '\\show_warning' );

/**
 * Includes a script for dismissing the plugin conflicts warning.
 *
 * Modified from https://github.com/WPTT/admin-notices.
 *
 * @return void
 */
function print_scripts() {
	if ( ! needs_warning() ) {
		return;
	}

	// Create a nonce.
	$nonce = wp_create_nonce( NOTICE_ID );
	?>
	<script>

	window.addEventListener( 'load', function() {
		let wait_for_btn = null;
		let notice_selector = '#<?php echo esc_attr( NOTICE_ID ); ?> .notice-dismiss';

		// Wait for core WP to add the dismiss button to the notice.
		wait_for_btn = setInterval(function() {
			let dismissBtn = document.querySelector( notice_selector );

			if (!dismissBtn && !dismissBtn.length) {
				return;
			}

			clearInterval(wait_for_btn);

			// Add an event listener to the dismiss button.
			dismissBtn.addEventListener( 'click', function( event ) {
				let postData = new FormData();
				postData.append('action', '<?php echo esc_attr( NOTICE_ID ); ?>');
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
 * Ajax handler for dismissing plugin conflicts.
 *
 * Modified from https://github.com/WPTT/admin-notices.
 *
 * @return void
 */
function ajax_maybe_dismiss_conflicts() {
	// Sanity check: Early exit if we're not on a faustwp_plugin_conflicts action.
	if ( ! isset( $_POST['action'] ) || esc_attr( NOTICE_ID ) !== $_POST['action'] ) {
		return;
	}

	// Security check: Make sure nonce is OK.
	check_ajax_referer( NOTICE_ID, 'nonce', true );

	// If we got this far, we need to dismiss the current plugin conflicts.
	dismiss_active_conflicts();
}
add_action( 'wp_ajax_' . NOTICE_ID, __NAMESPACE__ . '\\ajax_maybe_dismiss_conflicts' );
