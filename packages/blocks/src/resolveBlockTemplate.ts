import find from 'lodash/find.js';
import { EditorBlock } from './components/WordPressBlocksViewer.js';
import { WordPressBlock } from './components/WordPressBlocksProvider.js';
import DefaultBlock from './components/DefaultBlock.js';

/**
 * This function contains the main resolve logic for matching a provided editorBlock instance with the list of
 * available WordPressBlock components.
 *
 * @param editorBlock An instance of a block as retrieved from the API
 * @param blocks A list of available WordPressBlock components to match with the provided editorBlock
 * @returns An instance of the WordPressBlock component that matches the the provided editorBlock or a DefaultBlock if no such match exists.
 */
export default function resolveBlockTemplate(
  editorBlock: EditorBlock,
  blocks: WordPressBlock[],
): WordPressBlock {
  // eslint-disable-next-line no-underscore-dangle
  const namesToCheck = [editorBlock?.name, editorBlock?.__typename].filter(
    Boolean,
  ) as string[];
  const block = find(blocks, (item) => {
    for (let i = 0; i < namesToCheck.length; i += 1) {
      if (item?.displayName === namesToCheck[i]) {
        return true;
      }
      if (item?.config?.name === namesToCheck[i]) {
        return true;
      }
      if (item?.name === namesToCheck[i]) {
        return true;
      }
    }
    return false;
  });
  if (block) {
    return block;
  }
  return DefaultBlock as WordPressBlock;
}
