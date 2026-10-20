<?php
/**
 * Read-only admin screen for the versioned document store.
 *
 * Lists documents under Tools → Faust Documents and shows each document's data.
 * Nothing here can change a document.
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Documents;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Admin page slug.
 */
const ADMIN_PAGE_SLUG = 'faustwp-documents';

/**
 * Documents listed per page.
 */
const ADMIN_PER_PAGE = 20;

add_action( 'admin_menu', __NAMESPACE__ . '\\register_documents_admin_page' );
/**
 * Callback for WordPress 'admin_menu' action.
 *
 * Add Tools → Faust Documents when the store is enabled.
 */
function register_documents_admin_page() {
	if ( ! is_document_store_enabled() ) {
		return;
	}

	add_management_page(
		__( 'Faust Documents', 'faustwp' ),
		__( 'Faust Documents', 'faustwp' ),
		READ_CAPABILITY,
		ADMIN_PAGE_SLUG,
		__NAMESPACE__ . '\\render_documents_admin_page'
	);
}

/**
 * Render Tools → Faust Documents.
 */
function render_documents_admin_page() {
	if ( ! current_user_can( READ_CAPABILITY ) ) {
		wp_die( esc_html__( 'Sorry, you are not allowed to view documents.', 'faustwp' ), 403 );
	}

	// phpcs:disable WordPress.Security.NonceVerification.Recommended -- Read-only view.
	$collection = isset( $_GET['collection'] ) ? sanitize_text_field( wp_unslash( $_GET['collection'] ) ) : '';
	$id         = isset( $_GET['document'] ) ? sanitize_text_field( wp_unslash( $_GET['document'] ) ) : '';
	// phpcs:enable

	echo '<div class="wrap">';
	if ( '' !== $id ) {
		render_document_detail( $collection, $id );
	} else {
		render_document_list();
	}
	echo '</div>';
}

/**
 * URL of the documents admin screen.
 *
 * @param array $args Extra query arguments.
 *
 * @return string Admin URL.
 */
function documents_admin_url( $args = array() ) {
	return add_query_arg( array_merge( array( 'page' => ADMIN_PAGE_SLUG ), $args ), admin_url( 'tools.php' ) );
}

/**
 * When a document was last saved, in the site's time zone.
 *
 * @param array $summary Document summary from get_document_summary().
 *
 * @return string Formatted date.
 */
function format_document_modified( $summary ) {
	return (string) wp_date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), (int) strtotime( $summary['modified'] ) );
}

/**
 * Display name of the user who last saved a document.
 *
 * @param array $summary Document summary from get_document_summary().
 *
 * @return string Display name, or an em dash if unknown.
 */
function document_last_author( $summary ) {
	$user = $summary['modified_by'] ? get_userdata( $summary['modified_by'] ) : false;

	return $user ? $user->display_name : '—';
}

/**
 * Render the list of documents.
 */
function render_document_list() {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only view.
	$paged = isset( $_GET['paged'] ) ? max( 1, absint( $_GET['paged'] ) ) : 1;
	$list  = list_documents( $paged, ADMIN_PER_PAGE );

	echo '<h1>' . esc_html__( 'Faust Documents', 'faustwp' ) . '</h1>';
	echo '<p>' . esc_html__( 'Documents your app has saved to the FaustWP document store. This screen is read-only.', 'faustwp' ) . '</p>';

	if ( ! $list['documents'] ) {
		printf(
			'<p>%s <a href="%s">%s</a></p>',
			esc_html__( 'No documents yet. Your app creates a document the first time it saves one through the document store API.', 'faustwp' ),
			esc_url( 'https://faustjs.org/docs/how-to/write-data-to-wordpress/' ),
			esc_html__( 'Learn how to write data to WordPress.', 'faustwp' )
		);
		return;
	}

	echo '<table class="widefat striped"><thead><tr>';
	echo '<th scope="col">' . esc_html__( 'Collection', 'faustwp' ) . '</th>';
	echo '<th scope="col">' . esc_html__( 'ID', 'faustwp' ) . '</th>';
	echo '<th scope="col">' . esc_html__( 'Version', 'faustwp' ) . '</th>';
	echo '<th scope="col">' . esc_html__( 'Last saved', 'faustwp' ) . '</th>';
	echo '<th scope="col">' . esc_html__( 'Saved by', 'faustwp' ) . '</th>';
	echo '</tr></thead><tbody>';

	foreach ( $list['documents'] as $summary ) {
		printf(
			'<tr><td><code>%s</code></td><td><a href="%s"><code>%s</code></a></td><td>%s</td><td>%s</td><td>%s</td></tr>',
			esc_html( $summary['collection'] ),
			esc_url(
				documents_admin_url(
					array(
						'collection' => $summary['collection'],
						'document'   => $summary['id'],
					)
				)
			),
			esc_html( $summary['id'] ),
			esc_html( (string) $summary['version'] ),
			esc_html( format_document_modified( $summary ) ),
			esc_html( document_last_author( $summary ) )
		);
	}

	echo '</tbody></table>';

	$pagination = paginate_links(
		array(
			'base'    => add_query_arg( 'paged', '%#%', documents_admin_url() ),
			'format'  => '',
			'current' => $paged,
			'total'   => $list['total_pages'],
		)
	);
	if ( $pagination ) {
		echo '<div class="tablenav"><div class="tablenav-pages">' . wp_kses_post( $pagination ) . '</div></div>';
	}
}

/**
 * Render one document.
 *
 * @param string $collection Collection name from the request.
 * @param string $id         Document ID from the request.
 */
function render_document_detail( $collection, $id ) {
	echo '<h1>' . esc_html__( 'Faust Document', 'faustwp' ) . '</h1>';
	printf( '<p><a href="%s">%s</a></p>', esc_url( documents_admin_url() ), esc_html__( '← All documents', 'faustwp' ) );

	$valid    = preg_match( '/^' . COLLECTION_PATTERN . '$/', $collection ) && preg_match( '/^' . ID_PATTERN . '$/', $id );
	$document = $valid ? get_document( $collection, $id ) : null;
	$summary  = $valid ? get_document_summary( $collection, $id ) : null;

	if ( ! $document || ! $summary ) {
		echo '<div class="notice notice-error inline"><p>' . esc_html__( 'Document not found.', 'faustwp' ) . '</p></div>';
		return;
	}

	$json = wp_json_encode( $document['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

	echo '<table class="form-table" role="presentation"><tbody>';
	printf( '<tr><th scope="row">%s</th><td><code>%s</code></td></tr>', esc_html__( 'Collection', 'faustwp' ), esc_html( $document['collection'] ) );
	printf( '<tr><th scope="row">%s</th><td><code>%s</code></td></tr>', esc_html__( 'ID', 'faustwp' ), esc_html( $document['id'] ) );
	printf( '<tr><th scope="row">%s</th><td>%s</td></tr>', esc_html__( 'Version', 'faustwp' ), esc_html( (string) $document['version'] ) );
	printf( '<tr><th scope="row">%s</th><td>%s</td></tr>', esc_html__( 'Last saved', 'faustwp' ), esc_html( format_document_modified( $summary ) ) );
	printf( '<tr><th scope="row">%s</th><td>%s</td></tr>', esc_html__( 'Saved by', 'faustwp' ), esc_html( document_last_author( $summary ) ) );
	echo '</tbody></table>';

	echo '<h2>' . esc_html__( 'Data', 'faustwp' ) . '</h2>';
	echo '<pre style="max-height:40em;overflow:auto;padding:1em;background:#fff;border:1px solid #c3c4c7;"><code style="background:none;padding:0;">' . esc_html( (string) $json ) . '</code></pre>';
}
