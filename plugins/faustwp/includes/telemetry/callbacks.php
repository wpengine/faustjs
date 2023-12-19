<?php


add_action( 'admin_notices', __NAMESPACE__ . '\show_telemetry_prompt' );

function show_telemetry_prompt() {
    // how to tell if user is admin
	if ( ! current_user_can( 'activate_plugins' ) ) {
		return false;
	}

    // which screens will have the prompt
	$screens_to_show = array( 'plugins', 'settings_page_faustwp-settings' );

    // checks to see if the screen is either of the two options above
	$current_screen  = get_current_screen();
	if ( is_object( $current_screen ) && ! in_array( $current_screen->id, $screens_to_show, true ) ) {
		return false;
	}

    
    function display_dismissible_success_notice(): void {
        // Guard clause for already dismissed notice.
        if ( get_transient( 'admin_notice_example_dismissed' ) !== false ) {
            return;
        }
    
        $dismiss_url = add_query_arg( 'dismiss_admin_notice_example', '1' );
        ?>
            <div class="notice notice-warning">
                <p><em><?php esc_html_e( 'Telemetry Prompt:', 'admin-notice-example' ); ?></em> 
                <?php esc_html_e( 'To help Faust.js make decisions on where to focus our efforts for you, we would like to collect anonymous information on how you are using the plugin’s features. You can read more on what we collect by reading [Toggling Telemetry - Faust.js™](https://faustjs.org/guide/how-to-toggle-telemetry). If you are comfortable with sharing, please enable telemetry.', 'admin-notice-example' ); ?>
                <a href="<?php echo esc_url( $dismiss_url ); ?>"><?php esc_html_e( 'Dismiss', 'admin-notice-example' ); ?></a></p>
            </div>
        <?php
    }
    
    
    ?>
        <div>test</div>
    <?php

	// printf(
	// 	'<div id="%s" class="notice notice-warning notice-alt is-dismissible">
	// 		<h2 class="notice-title">Faust Telemetry</h2>
	// 		<p>To help Faust.js make decisions on where to focus our efforts for you, we would like to collect anonymous information on how you are using the plugin’s features. You can read more on what we collect by reading [Toggling Telemetry - Faust.js™](https://faustjs.org/guide/how-to-toggle-telemetry). If you are comfortable with sharing, please enable telemetry.</p>
	// 		<p>%s</p>
	// 	</div>',
	// 	esc_attr( NOTICE_ID ),
	// 	esc_html__( 'Yes, I consent to this data collection' ),
	// 	esc_html__( 'No' ),
	// 	esc_html__( 'Not right now. Remind me again in 90 days.' )
	// );
}

// /**
//  * Show an admin user the telemetry prompt the first time.
//  *
//  * @param string $name  The setting name.
//  * @param mixed  $value The setting value.
//  *
//  * @return void
//  */
// if (current_user_can( 'manage_options' )) {
// 	return;
// 	// the JS admin notice
// }

// /**
//  * Show an admin user the telemetry prompt after 90 days if the telemetry prompt value they selected was "Remind me again in 90 days.".
//  *
//  * @param string $name  The setting name.
//  * @param mixed  $value The setting value.
//  *
//  * @return void
//  */

//  if (current_user_can( 'manage_options' ) && faustwp_update_setting( 'dismissed-analytics-opt-in', $current_time )) {
// 	return;
// 	// the JS admin notice
// }


//////////////

// <?php

// function show_telemetry_prompt() {
//     // how to tell if user is admin
// 	if ( ! current_user_can( 'activate_plugins' ) ) {
// 		return false;
// 	}

//     // which screens will have the prompt
// 	$screens_to_show = array( 'plugins', 'settings_page_faustwp-settings' );

//     // checks to see if the screen is either of the two options above
// 	$current_screen  = get_current_screen();
// 	if ( is_object( $current_screen ) && ! in_array( $current_screen->id, $screens_to_show, true ) ) {
// 		return false;
// 	}

// 	printf(
// 		'<div id="%s" class="notice notice-warning notice-alt is-dismissible">
// 			<h2 class="notice-title">Faust Telemetry</h2>
// 			<p>To help Faust.js make decisions on where to focus our efforts for you, we would like to collect anonymous information on how you are using the plugin’s features. You can read more on what we collect by reading [Toggling Telemetry - Faust.js™](https://faustjs.org/guide/how-to-toggle-telemetry). If you are comfortable with sharing, please enable telemetry.</p>
// 			<p>%s</p>
// 		</div>',
// 		esc_attr( NOTICE_ID ),
// 		esc_html__( 'Yes, I consent to this data collection' ),
// 		esc_html__( 'No' ),
// 		esc_html__( 'Not right now. Remind me again in 90 days.' )
// 	);
// }
// add_action( 'admin_notices', __NAMESPACE__ . '\\show_telemetry_prompt' );