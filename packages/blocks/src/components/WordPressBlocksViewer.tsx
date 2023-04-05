import React from 'react';
import resolveBlockTemplate from '../resolveBlockTemplate.js';
import { WordPressBlocksContext } from './WordPressBlocksProvider.js';

const Context = React.createContext<{ [key: string]: any } | null>(null);

export const useBlockData = (): { [key: string]: any } | null => {
  const contextState = React.useContext(Context);
  if (contextState === null) {
    throw new Error('useBlockData must be used within a BlockDataProvider tag');
  }
  return contextState;
};

export function BlockDataProvider(
  props: React.PropsWithChildren<{ data: Record<string, any> | null }>,
) {
  const { children, data } = props;
  const ref = React.useRef(data);

  return <Context.Provider value={ref.current}>{children}</Context.Provider>;
}

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
   * <WordPressBlocksViewer FallbackBlock={MyFallbackComponent} />
   * ```
   */
  FallbackBlock: React.FC<ContentBlock>;
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
/**
 * WordPressBlocksViewer is the main component that renders blocks taken from WordPress as a list of ContentBlock[] data.
 * @param props WordpressBlocksViewerProps
 * @returns JSX.Component that renders the block tree.
 */
export function WordPressBlocksViewer(props: WordpressBlocksViewerProps) {
  const { blocks } = React.useContext(WordPressBlocksContext);

  if (!blocks) {
    throw new Error('Blocks are required. Please add them to your config.');
  }

  const { blocks: editorBlocks, FallbackBlock } = props;

  if (!editorBlocks) {
    throw new Error('The "blocks" prop is required in <WordPressBlocksViewer>');
  }

  const renderedBlocks = editorBlocks.map((blockProps, idx) => {
    const BlockTemplate = resolveBlockTemplate(
      blockProps,
      blocks,
      FallbackBlock,
    );
    return (
      // eslint-disable-next-line react/no-array-index-key
      <BlockDataProvider data={blockProps} key={idx}>
        <>
          {React.createElement<ContentBlock>(BlockTemplate, { ...blockProps })}
        </>
      </BlockDataProvider>
    );
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{renderedBlocks}</>;
}
