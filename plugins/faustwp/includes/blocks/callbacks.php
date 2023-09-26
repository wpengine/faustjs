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

add_action( 'init', __NAMESPACE__ . '\\register_custom_blocks' );
/**
 * Register Gutenberg blocks from block.json files located in the specified paths.
 */
/**
 * Register Gutenberg blocks from block.json files located in the specified paths.
 */
function register_custom_blocks() {
    $uploads = wp_upload_dir();

    // Define the base directory path and URL.
    $base_dir = trailingslashit( $uploads['basedir'] ) . 'faustwp/blocks/';
    $base_url = trailingslashit( $uploads['baseurl'] ) . 'faustwp/blocks/';

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

            // Assign a fallback title if the title is missing.
            if ( isset( $metadata['name'] ) && empty( $metadata['title'] ) ) {
                $metadata['title'] = infer_title_from_name( $metadata['name'] );
            }

            if ( isset( $metadata['name'] ) && is_array( $metadata ) ) {
                $block_base_url = $base_url . trailingslashit( basename( $dir ) );

                // Enqueue the scripts and styles, and get their handles.
                $handles = array(
                    'editor_script' => isset( $metadata['editorScript'] ) ? enqueue_asset( $metadata['editorScript'], $block_base_url, true ) : null,
                    'editor_style'  => isset( $metadata['editorStyle'] ) ? enqueue_asset( $metadata['editorStyle'], $block_base_url, 'style' ) : null,
                    'script'        => isset( $metadata['script'] ) ? enqueue_asset( $metadata['script'], $block_base_url, true ) : null,
                    'style'         => isset( $metadata['style'] ) ? enqueue_asset( $metadata['style'], $block_base_url, 'style' ) : null,
                );

                $additional_args = array(
                    'title' => isset( $metadata['title'] ) ? $metadata['title'] : infer_title_from_name( $metadata['name'] ),
                );

                $args = array_merge( $handles, $additional_args );

                register_block_type( $metadata['name'], $args );
            }
        }
    }
}