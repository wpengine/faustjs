import { registerFaustBlock } from '@faustwp/block-editor-utils';
import './style.scss';
import BlockB from './Component.js'
/**
 * Block.json metadata
 */
import metadata from './block.json';
/**
 * Register React block on the Block Editor
 */
registerFaustBlock(BlockB, {
	blockJson: metadata
});
