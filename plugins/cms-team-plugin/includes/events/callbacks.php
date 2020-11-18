<?php
/**
 * Callback for WordPress actions.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'update_option_rewrite_rules', 'wpe_headless_rewrite_rules_change', 10, 3 );
/**
 * Callback for WordPress 'update_option_rewrite_rules' action.
 *
 * Detect when the rewrite rules have changed.
 *
 * Store a hash of the current rewrite rules to prevent multiple api requests.
 *
 * @param string $old_value   The old option value.
 * @param string $new_value   The new option value.
 * @param string $option_name The option name.
 *
 * @return void
 */
function wpe_headless_rewrite_rules_change( $old_value, $new_value, $option_name ) {
	if ( '' !== $new_value ) {
		$existing_hash = get_option( 'rewrite_rules_hash' );
		$new_hash      = md5( wp_json_encode( $new_value ) );

		if ( $existing_hash !== $new_hash ) {
			update_option( 'rewrite_rules_hash', $new_hash );

			error_log( 'Rewrite rules changed...' ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		}
	}
}

add_action( 'post_updated', 'wpe_headless_check_post_slug', 10, 3 );
/**
 * Callback for WordPress 'post_updated' action.
 *
 * Detect a post or page slug change on published posts.
 *
 * @param int     $post_ID     Post ID.
 * @param WP_Post $post_after  Post object following the update.
 * @param WP_Post $post_before Post object before the update.
 *
 * @return void
 */
function wpe_headless_check_post_slug( $post_ID, $post_after, $post_before ) {
	if ( ! in_array( $post_after->post_type, array( 'post', 'page' ), true ) ) {
		return;
	}

	// Ensure post status is 'publish'.
	if ( 'publish' !== $post_before->post_status || 'publish' !== $post_after->post_status ) {
		return;
	}

	// Ensure post_name (slug) is not empty.
	if ( ! $post_after->post_name ) {
		return;
	}

	// Ensure post_name has changed.
	if ( $post_after->post_name === $post_before->post_name ) {
		return;
	}

	error_log( "Post {$post_ID} slug changed..." ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
}

add_action( 'draft_to_publish', 'wpe_headless_post_status_changed' );
add_action( 'publish_to_draft', 'wpe_headless_post_status_changed' );
add_action( 'publish_to_trash', 'wpe_headless_post_status_changed' );
/**
 * Callback for WordPress "{$old_status}_to_{$new_status}" action.
 *
 * Detect post status changes for post and page post types.
 *
 * @param WP_Post $post Post object.
 *
 * @return void
 */
function wpe_headless_post_status_changed( $post ) {
	if ( ! in_array( $post->post_type, array( 'post', 'page' ), true ) ) {
		return;
	}

	error_log( "Post {$post->ID} set to {$post->post_status}" ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
}
