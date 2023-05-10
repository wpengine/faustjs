import { BlockWithAttributes } from '../components/WordPressBlocksViewer.js';

export default function getBlockName<T extends BlockWithAttributes>(
  block: T,
): string | undefined {
  if (block?.name) {
    return block.name;
  }
  // eslint-disable-next-line no-underscore-dangle
  if (block?.__typename) {
    // eslint-disable-next-line no-underscore-dangle
    return block.__typename;
  }
  return undefined;
}
