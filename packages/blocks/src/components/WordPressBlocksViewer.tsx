import React from 'react';
import resolveBlockTemplate from '../resolveBlockTemplate.js';
import { WordPressBlocksContext } from './WordPressBlocksProvider.js';

export interface WordpressBlocksViewerProps {
  /**
   * Block data obtained from WPGraphQL Content Blocks
   */
  blocks: Array<ContentBlock | null>;
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
   * <WordPressBlocksViewer fallbackBlock={MyFallbackComponent} />
   * ```
   */
  fallbackBlock?: React.FC<ContentBlock>;
}

export interface ContentBlock {
  __typename?: string;
  apiVersion?: number;
  cssClassNames?: string;
  innerBlocks?: Array<ContentBlock | null>;
  isDynamic?: boolean;
  name?: string;
  renderedHtml?: string;
}

export interface BlockWithAttributes extends ContentBlock {
  attributes?: Record<string, unknown> | null;
}

/**
 * WordPressBlocksViewer is the main component that renders blocks taken from WordPress as a list of ContentBlock[] data.
 * @param props WordpressBlocksViewerProps
 * @returns JSX.Component that renders the block tree.
 */
export function WordPressBlocksViewer(props: WordpressBlocksViewerProps) {
  const blocks = React.useContext(WordPressBlocksContext);

  if (!blocks) {
    throw new Error('Blocks are required. Please add them to your config.');
  }

  const { blocks: editorBlocks, fallbackBlock } = props;

  if (!editorBlocks) {
    throw new Error('The "blocks" prop is required in <WordPressBlocksViewer>');
  }

  const renderedBlocks = editorBlocks.map((blockProps, idx) => {
    const BlockTemplate = resolveBlockTemplate(
      blockProps,
      blocks,
      fallbackBlock,
    );

    return React.createElement<ContentBlock>(BlockTemplate, {
      ...blockProps,
      // eslint-disable-next-line react/no-array-index-key
      key: idx,
    });
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{renderedBlocks}</>;
}
