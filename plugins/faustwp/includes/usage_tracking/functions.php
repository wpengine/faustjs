<?php
/**
 * Functions for managing usage tracking prompt
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Usage_Tracking;

use function WPE\FaustWP\Settings\{
	is_usage_tracking_enabled
};

/** User meta key for storing list of dismissed prompt. */
const DISMISSED_USAGE_TRACKING_META_KEY = 'faustwp_usage_tracking_dismissed';

/**
 * Determines whether the usage tracking prompt should be shown.
 *
 * The prompt is only shown when the user hasn't dismissed the prompt before and if the setting is disabled.
 *
 * @return boolean True if the prompt should be shown.
 */
function needs_prompt() {
	if ( is_usage_tracking_enabled() || ( '1' === is_usage_tracking_dismissed() ) ) {
		return false;
	}

	return true;
}

/**
 * Checks if the usage tracking prompt is dismissed for the current user.
 *
 * @return boolean
 */
function is_usage_tracking_dismissed() {
	return get_user_meta( get_current_user_id(), DISMISSED_USAGE_TRACKING_META_KEY, true );
}

/**
 * Clears the dismissed usage tracking prompt for the current user.
 *
 * @return boolean True on success, false on failure.
 */
function delete_usage_tracking_dismissed() {
	return delete_user_meta( get_current_user_id(), DISMISSED_USAGE_TRACKING_META_KEY );
}

/**
 * Updates the usage tracking prompt for the current user.
 *
 * @return void
 */
function dismiss_usage_tracking_prompt() {
	update_user_meta( get_current_user_id(), DISMISSED_USAGE_TRACKING_META_KEY, '1' );
}

