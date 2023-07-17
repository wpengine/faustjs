<?php
/**
 * Callbacks for block thangs.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Blocks;

use function WPE\FaustWP\Settings\{
	faustwp_get_setting,
};

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the Faust block type.
 *
 * @return void
 */
function register_faust_block_types() {
	// $frontend_uri = faustwp_get_setting( 'frontend_uri' );

	$json_file_path = trailingslashit( wp_upload_dir()['basedir'] ) . 'faustwp/blocks.json';

    if ( file_exists( $json_file_path ) ) {
        $json_content = file_get_contents( $json_file_path );
        $json_data    = json_decode( $json_content, true );

        if ( $json_data && isset( $json_data['blocks'] ) ) {
            foreach ( $json_data['blocks'] as $block ) {
                if ( isset( $block['name'] ) ) {
                    register_block_type( $block['name'], $block );
                }
            }
        }
    }
}
add_action( 'init', __NAMESPACE__ . '\\register_faust_block_types' );
