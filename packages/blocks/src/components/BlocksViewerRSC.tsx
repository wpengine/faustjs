import React from 'react';
import resolveBlockTemplate from '../resolveBlockTemplate.js';
import { WordPressBlock } from './WordPressBlocksProvider.js';
import { BlocksTheme } from '../types/theme.js';
import { ContentBlock } from './WordPressBlocksViewer.js';

export interface BlocksViewerRSCProps {
  /**
   * Block data obtained from WPGraphQL Content Blocks
   */
  data: Array<ContentBlock | null>;
  /**
   * Block components to use
   */
  blocks: { [key: string]: WordPressBlock };
  /**
   * An optional React component that will be used if
   * no React components are resolved for a given block.
   *
   * @example
   * ```jsx
   * const MyFallbackComponent = ({renderedHtml}) => {
   *   return (
   *     <span dangerouslySetInnerHTML={{__html: renderedHtml}} />
   *   )
   * }
   *
   * <BlocksViewerRSC fallbackBlock={MyFallbackComponent} />
   * ```
   */
  fallbackBlock?: React.FC<ContentBlock>;
  theme?: BlocksTheme;
}


/**
 * BlocksViewerRSC is the main component that renders blocks taken from WordPress as a list of ContentBlock[] data.
 * @param props BlocksViewerRSC
 * @returns JSX.Component that renders the block tree.
 */
export function BlocksViewerRSC(props: BlocksViewerRSCProps) {
  const { blocks } = props;
  if (!blocks) {
    throw new Error('The "blocks" prop is required in <WordPressBlocksViewer>');
  }
  const { data: editorBlocks, fallbackBlock, theme } = props;
  console.debug(arguments);
  if (!editorBlocks) {
    throw new Error('The "data" prop is required in <WordPressBlocksViewer>');
  }

  const renderedBlocks = editorBlocks.map((blockProps, idx) => {
    const BlockTemplate = resolveBlockTemplate(
      blockProps,
      blocks,
      fallbackBlock,
    );

    return React.createElement<ContentBlock>(BlockTemplate, {
      ...{ ...blockProps, theme, blocks },
      // eslint-disable-next-line react/no-array-index-key
      key: idx,
    });
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{renderedBlocks}</>;
}
