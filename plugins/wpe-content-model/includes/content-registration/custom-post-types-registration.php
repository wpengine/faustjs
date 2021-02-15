<?php
/**
 * Registers custom content types and custom fields.
 *
 * @package WPE_Content_Model
 */

declare(strict_types=1);

namespace WPE\ContentModel\ContentRegistration;

add_action( 'init', __NAMESPACE__ . '\register_content_types' );
/**
 * Registers custom content types.
 */
function register_content_types(): void {
	$content_types = get_option( 'wpe_content_model_post_types', false );
	if ( ! $content_types ) {
		return;
	}

	foreach ( $content_types as $slug => $args ) {
		$fields = $args['fields'] ?? false;
		unset( $args['fields'] );

		register_post_type( $slug, $args );

		if ( $fields ) {
			register_meta_types( $slug, $fields );
		}
	}
}

/**
 * Registers custom meta with the specific custom post type.
 *
 * @param string $post_type_slug The custom post type slug.
 * @param array  $fields Custom fields to be registered with the custom post type.
 */
function register_meta_types( string $post_type_slug, array $fields ): void {
	foreach ( $fields as $key => $field ) {
		$field['object_subtype'] = $post_type_slug;
		register_meta( 'post', $key, $field );
	}
}
