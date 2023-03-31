import find from 'lodash/find.js';
import { ContentBlock } from './components/WordPressBlocksViewer.js';
import { WordPressBlock } from './components/WordPressBlocksProvider.js';
import DefaultBlock from './components/DefaultBlock.js';

/**
 * This function contains the main resolve logic for matching a provided contentBlock instance with the list of
 * available WordPressBlock components.
 *
 * @param contentBlock An instance of a block as retrieved from the API
 * @param blocks A list of available WordPressBlock components to match with the provided contentBlock
 * @returns An instance of the WordPressBlock component that matches the the provided contentBlock or a DefaultBlock if no such match exists.
 */
export default function resolveBlockTemplate(
  contentBlock: ContentBlock | null,
  blocks: WordPressBlock[],
): WordPressBlock {
  // eslint-disable-next-line no-underscore-dangle
  const namesToCheck = [contentBlock?.name, contentBlock?.__typename].filter(
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
