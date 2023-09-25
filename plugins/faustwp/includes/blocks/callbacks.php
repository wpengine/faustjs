<?php
/**
 * Callbacks related to block support.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\register_custom_blocks' );
/**
 * Register Gutenberg blocks from block.json files located in the specified paths.
 */
function register_custom_blocks() {
    // Define the base directory path.
    $base_dir = untrailingslashit( WP_CONTENT_DIR ) . '/uploads/faustwp/blocks/';

    // Check if the directory exists.
    if ( ! is_dir( $base_dir ) ) {
        return;
    }

    // Scan the directory for subdirectories (each representing a block).
    $block_dirs = array_filter( glob( $base_dir . '*' ), 'is_dir' );

    foreach ( $block_dirs as $dir ) {
        // Path to the block.json file.
        $metadata_file = trailingslashit( $dir ) . 'block.json';

        // Check if block.json exists and register the block.
        if ( file_exists( $metadata_file ) ) {
            $metadata_content = file_get_contents( $metadata_file );
            $metadata = json_decode( $metadata_content, true );

            if ( is_array( $metadata ) && isset( $metadata['name'] ) ) {
                $block_base_url = content_url( '/uploads/faustwp/blocks/' . basename( $dir ) . '/' );

                $args = array(
                    'editor_script' => isset( $metadata['editorScript'] ) ? correct_asset_path( $metadata['editorScript'], $block_base_url ) : null,
                    'editor_style'  => isset( $metadata['editorStyle'] ) ? correct_asset_path( $metadata['editorStyle'], $block_base_url ) : null,
                    'style'         => isset( $metadata['style'] ) ? correct_asset_path( $metadata['style'], $block_base_url ) : null,
                );

                // Filter out any null values.
                $args = array_filter( $args );

                register_block_type( $metadata['name'], $args );
            }
        }
    }
}
