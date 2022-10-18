<?php
/**
 * Functions for detecting and reporting plugin conflicts.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Detect_Conflicts;

/** User meta key for storing list of dismissed plugin conflicts. */
const DISMISSED_CONFLICTS_META_KEY = 'faustwp_conflicts_dismissed';

/**
 * Get the full list of plugins known to conflict with FaustWP.
 *
 * The list is an array of plugin file paths relative to the plugins directory.
 *
 * @return array List of plugins.
 */
function get_plugin_conflict_list() {
	return array(
		'elementor/elementor.php',
	);
}

/**
 * Get the active plugins known to conflict with FaustWP.
 *
 * @see WPE\FaustWP\Detect_Conflicts\get_plugin_conflict_list()
 *
 * @param  array|null $conflict_list     Optional. Alternative list of plugins known to conflict.
 * @param  boolean    $include_dismissed Whether to include dismissed conflicts. Default false.
 * @return array                         List of active conflicting plugins.
 */
function get_plugin_conflicts( $conflict_list = null, $include_dismissed = false ) {
	$plugins = is_array( $conflict_list ) ? $conflict_list : get_plugin_conflict_list();

	foreach ( $plugins as $index => $plugin ) {
		if (
			! is_plugin_active( $plugin ) ||
			( ! $include_dismissed && is_conflict_dismissed( $plugin ) )
		) {
			unset( $plugins[ $index ] );
		}
	}

	return $plugins;
}

/**
 * Determines whether the plugin conflicts warning should be shown.
 *
 * The warning is only shown on the plugins page and Faust settings page
 * when the user has the activate_plugins capability and there are active
 * conflicts.
 *
 * @return boolean True if the warning should be shown.
 */
function needs_warning() {
	if ( ! current_user_can( 'activate_plugins' ) ) {
		return false;
	}

	$screens_to_show = array( 'plugins', 'settings_page_faustwp-settings' );
	$current_screen  = get_current_screen();
	if ( is_object( $current_screen ) && ! in_array( $current_screen->id, $screens_to_show, true ) ) {
		return false;
	}

	$plugins = get_plugin_conflicts();

	return ! empty( $plugins );
}

/**
 * Get the list of dismissed plugin conflicts for the current user.
 *
 * @return array The list of dismissed plugin conflicts.
 */
function get_conflicts_dismissed() {
	$dismissed = get_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, true );
	return $dismissed ? $dismissed : array();
}

/**
 * Clears the list of dismissed plugin conflicts for the current user.
 *
 * @return boolean True on success, false on failure.
 */
function delete_conflicts_dismissed() {
	return delete_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY );
}

/**
 * Checks whether a plugin conflict has been dismissed by the current user.
 *
 * @param  string $plugin Path to the plugin file relative to the plugins directory.
 * @return boolean        True if the plugin conflict has been dismissed.
 */
function is_conflict_dismissed( $plugin ) {
	$dismissed = get_conflicts_dismissed();
	return in_array( $plugin, $dismissed, true );
}

/**
 * Adds any plugins that are currently active, in the conflict list, and not yet
 * dismissed to the current user's list of dismissed plugin conflicts.
 *
 * @param  array $conflict_list Optional. Alternative list of plugins known to conflict.
 * @return void
 */
function dismiss_active_conflicts( $conflict_list = null ) {
	$plugins   = get_plugin_conflicts( $conflict_list ); // Excludes dismissed conflicts.
	$dismissed = get_conflicts_dismissed();

	foreach ( $plugins as $plugin ) {
		$dismissed[] = $plugin;
	}

	update_user_meta( get_current_user_id(), DISMISSED_CONFLICTS_META_KEY, $dismissed );
}
