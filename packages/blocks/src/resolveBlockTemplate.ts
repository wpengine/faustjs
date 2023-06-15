import { hooks } from '@faustwp/core';
import DefaultBlock from './components/DefaultBlock.js';
import { WordPressBlock } from './components/WordPressBlocksProvider.js';
import { ContentBlock } from './components/WordPressBlocksViewer.js';

/**
 * This function contains the main resolve logic for matching a provided contentBlock instance with the list of
 * available WordPressBlock components.
 *
 * @param contentBlock An instance of a block as retrieved from the API
 * @param blocks A list of available WordPressBlock components to match with the provided contentBlock
 * @param fallbackBlock A React component that, when specified, will be used when no blocks were resolved.
 * @returns An instance of the WordPressBlock component that matches the the provided contentBlock or a DefaultBlock if no such match exists.
 */
export default function resolveBlockTemplate(
  contentBlock: ContentBlock | null,
  blocks: { [key: string]: WordPressBlock },
  fallbackBlock: WordPressBlock | undefined,
): WordPressBlock {
  // eslint-disable-next-line no-underscore-dangle
  const namesToCheck = [contentBlock?.name, contentBlock?.__typename].filter(
    Boolean,
  );
  let block = Object.values(blocks).find((item) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  block = hooks.applyFilters('faustBlocksResolveBlockTemplate', block, {
    contentBlock,
    blocks,
    namesToCheck,
  }) as WordPressBlock | undefined;

  if (block) {
    return block;
  }

  if (fallbackBlock) {
    return fallbackBlock;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return hooks.applyFilters(
    'faustBlocksFallbackBlock',
    DefaultBlock,
    {},
  ) as WordPressBlock;
}
