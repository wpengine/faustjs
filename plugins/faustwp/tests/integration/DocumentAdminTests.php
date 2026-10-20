<?php
/**
 * Class DocumentAdminTests
 *
 * @package FaustWP
 */

namespace WPE\FaustWP\Tests\Integration;

use function WPE\FaustWP\Documents\maybe_install_document_table;
use function WPE\FaustWP\Documents\register_documents_admin_page;
use function WPE\FaustWP\Documents\render_documents_admin_page;
use function WPE\FaustWP\Documents\save_document;
use function WPE\FaustWP\Documents\uninstall_document_table;
use const WPE\FaustWP\Documents\ADMIN_PAGE_SLUG;

/**
 * Tests for the read-only Tools → Faust Documents screen.
 *
 * @group documents
 */
class DocumentAdminTests extends \WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();

		add_filter( 'faustwp_enable_document_store', '__return_true' );
		maybe_install_document_table();
		wp_set_current_user( self::factory()->user->create( array( 'role' => 'administrator' ) ) );
		set_current_screen( 'dashboard' );
	}

	public function tearDown(): void {
		global $submenu, $_registered_pages;

		unset( $_GET['collection'], $_GET['document'], $_GET['paged'] );
		remove_all_filters( 'faustwp_enable_document_store' );
		remove_all_filters( 'wp_die_handler' );
		uninstall_document_table();
		unset( $submenu['tools.php'] );
		$_registered_pages = array();

		parent::tearDown();
	}

	private function page_is_registered() {
		return (bool) get_plugin_page_hook( ADMIN_PAGE_SLUG, 'tools.php' );
	}

	private function render() {
		ob_start();
		try {
			render_documents_admin_page();
		} finally {
			$output = ob_get_clean();
		}
		return $output;
	}

	public function test_page_is_registered_when_the_store_is_enabled() {
		register_documents_admin_page();

		$this->assertTrue( $this->page_is_registered() );
	}

	public function test_page_is_not_registered_when_the_store_is_disabled() {
		remove_all_filters( 'faustwp_enable_document_store' );

		register_documents_admin_page();

		$this->assertFalse( $this->page_is_registered() );
	}

	public function test_render_denies_users_without_the_read_capability() {
		wp_set_current_user( self::factory()->user->create( array( 'role' => 'editor' ) ) );
		add_filter(
			'wp_die_handler',
			function () {
				return function ( $message ) {
					throw new \WPDieException( is_string( $message ) ? $message : 'denied' );
				};
			}
		);

		$this->expectException( \WPDieException::class );
		$this->render();
	}

	public function test_list_shows_the_document_collection_id_and_version() {
		save_document( 'notes', 'team-notes', 0, array( 'title' => 'First' ) );
		save_document( 'notes', 'team-notes', 1, array( 'title' => 'Second' ) );

		$output = $this->render();

		$this->assertStringContainsString( '<code>notes</code>', $output );
		$this->assertStringContainsString( '<code>team-notes</code>', $output );
		$this->assertStringContainsString( '<td>2</td>', $output );
		$this->assertStringContainsString( wp_get_current_user()->display_name, $output );
	}

	public function test_list_explains_how_documents_are_created_when_empty() {
		$this->assertStringContainsString( 'No documents yet', $this->render() );
	}

	public function test_detail_view_escapes_document_data() {
		save_document( 'notes', 'xss', 0, array( 'note' => '<script>alert(1)</script>' ) );
		$_GET['collection'] = 'notes';
		$_GET['document']   = 'xss';

		$output = $this->render();

		$this->assertStringNotContainsString( '<script>', $output );
		$this->assertStringContainsString( '&lt;script&gt;alert(1)&lt;/script&gt;', $output );
	}

	public function test_detail_view_reports_a_missing_or_invalid_document() {
		$_GET['document'] = 'Not A Slug!';

		$this->assertStringContainsString( 'Document not found.', $this->render() );
	}
}
