<?php
/**
 * Replacements for GraphQL responses.
 *
 * @package WPE_Headless
 */

add_filter( 'graphql_request_results', 'wpe_headless_url_replacement' );
/**
 * Replaces the WordPress Site URL with the replacement domain in 'url' nodes.
 *
 * @param object $response The default GraphQL query response.
 * @return object The modified response with URLs replaced.
 */
function wpe_headless_url_replacement( $response ) {
	if (
		is_object( $response ) &&
		property_exists( $response, 'data' ) &&
		is_array( $response->data ) &&
		wpe_headless_domain_replacement_enabled()
	) {
		array_walk_recursive(
			$response->data,
			function( &$value, $key ) {
				if ( 'url' === $key ) {
					$replacement = wpe_headless_get_setting( 'replacement_domain', '/' );
					$value       = str_replace( site_url(), $replacement, $value );
				}
			}
		);
	}

	return $response;
}
