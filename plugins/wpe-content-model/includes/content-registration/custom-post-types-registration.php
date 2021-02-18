<?php
/**
 * Registers custom content types and custom fields.
 *
 * @package WPE_Content_Model
 */

declare(strict_types=1);

namespace WPE\ContentModel\ContentRegistration;

use InvalidArgumentException;

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

		try {
			$args['labels'] = generate_custom_post_type_labels(
				[
					'singular' => $args['singular_name'],
					'plural'   => $args['name'],
				]
			);
		} catch ( InvalidArgumentException $exception ) {
			// Do nothing and let WP use defaults.
		}

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

/**
 * Generates an array of labels for use when registering custom post types.
 *
 * @see get_post_type_labels()
 *
 * @param array $labels {
 *     Singular and plural labels.
 *     @type string $singular Singular name of post type.
 *     @type string $plural Plural name of post type.
 * }
 *
 * @throws InvalidArgumentException When missing singular or plural arguments.
 * @return array
 */
function generate_custom_post_type_labels( array $labels ): array {
	if ( empty( $labels['singular'] ) || empty( $labels['plural'] ) ) {
		throw new InvalidArgumentException(
			__( 'You must provide both singular and plural labels to generate content type labels.', 'wpe-content-model' )
		);
	}

	$singular = $labels['singular'];
	$plural   = $labels['plural'];

	/**
	 * Ignoring these values and using WP defaults:
	 * insert_into_item
	 * add_new
	 * featured_image
	 * set_featured_image
	 * remove_featured_image
	 * use_featured_image
	 * menu_name (same as name)
	 * name_admin_bar (same as singular or name)
	 *
	 * @todo i18n
	 */
	return [
		'name'                     => $plural,
		'singular_name'            => $singular,
		'add_new_item'             => sprintf( 'Add new %s', $singular ),
		'edit_item'                => sprintf( 'Edit %s', $singular ),
		'new_item'                 => sprintf( 'New %s', $singular ),
		'view_item'                => sprintf( 'View %s', $singular ),
		'view_items'               => sprintf( 'View %s', $plural ),
		'search_items'             => sprintf( 'Search %s', $plural ),
		'not_found'                => sprintf( 'No %s found', $plural ),
		'not_found_in_trash'       => sprintf( 'No %s found in trash', $plural ),
		'parent_item_colon'        => sprintf( 'Parent %s:', $singular ),
		'all_items'                => sprintf( 'All %s', $plural ),
		'archives'                 => sprintf( '%s archives', $singular ),
		'attributes'               => sprintf( '%s Attributes', $singular ),
		'uploaded_to_this_item'    => sprintf( 'Uploaded to this %s', $singular ),
		'filter_items_list'        => sprintf( 'Filter %s list', $plural ),
		'items_list_navigation'    => sprintf( '%s list navigation', $plural ),
		'items_list'               => sprintf( '%s list', $plural ),
		'item_published'           => sprintf( '%s published.', $singular ),
		'item_published_privately' => sprintf( '%s published privately.', $singular ),
		'item_reverted_to_draft'   => sprintf( '%s reverted to draft.', $singular ),
		'item_scheduled'           => sprintf( '%s scheduled.', $singular ),
		'item_updated'             => sprintf( '%s updated.', $singular ),
		'parent'                   => sprintf( 'Parent %s', $singular ),
	];
}
