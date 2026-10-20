<?php
/**
 * Plugin Name: Enable the FaustWP document store
 * Description: Turns on the FaustWP document store for the document store example.
 */

add_filter( 'faustwp_enable_document_store', '__return_true' );
