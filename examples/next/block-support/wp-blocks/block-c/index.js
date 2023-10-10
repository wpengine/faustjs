import { registerFaustBlock } from '@faustwp/block-editor-utils';
import './style.scss';
import BlockC from './Component.js'
/**
 * Block.json metadata
 */
import metadata from './block.json';

registerFaustBlock(BlockC, {
	blockJson: metadata
});
