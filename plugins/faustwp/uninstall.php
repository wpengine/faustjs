<?php
/**
 * Removes FaustWP data when the plugin is deleted.
 *
 * @package FaustWP
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

require_once __DIR__ . '/includes/documents/functions.php';

if ( is_multisite() ) {
	$faust_site_ids = get_sites(
		array(
			'fields' => 'ids',
			'number' => 0,
		)
	);

	foreach ( $faust_site_ids as $faust_site_id ) {
		switch_to_blog( $faust_site_id );
		WPE\FaustWP\Documents\uninstall_document_table();
		restore_current_blog();
	}
} else {
	WPE\FaustWP\Documents\uninstall_document_table();
}
