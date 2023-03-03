/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
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
  blocks: ContentBlock[];
}

export interface ContentBlock {
  __typename?: string;
  apiVersion?: number;
  cssClassNames?: string;
  innerBlocks?: ContentBlock[];
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

  const { blocks: editorBlocks } = props;
  const renderedBlocks = editorBlocks.map((blockProps, idx) => {
    const BlockTemplate = resolveBlockTemplate(blockProps, blocks);
    return (
      // eslint-disable-next-line react/no-array-index-key
      <BlockDataProvider data={blockProps} key={idx}>
        <>{React.createElement<ContentBlock>(BlockTemplate, { ...blockProps })}</>
      </BlockDataProvider>
    );
  });

  return renderedBlocks;
}
