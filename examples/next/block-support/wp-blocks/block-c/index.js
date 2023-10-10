import { registerFaustBlock } from '@faustwp/block-editor-utils';
import './style.scss';
import BlockC from './Component.js'
/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerFaustBlock(BlockC, {
	blockJson: metadata
});
