/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { hooks } from '@faustwp/core';
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
  contentBlocks: EditorBlock[];
}

export interface EditorBlock {
  __typename?: string;
  apiVersion?: number;
  cssClassNames?: string;
  innerBlocks?: EditorBlock[];
  isDynamic?: boolean;
  name?: string;
  renderedHtml?: string;
}
/**
 * WordPressBlocksViewer is the main component that renders blocks taken from WordPress as a list of EditorBlock[] data.
 * @param props WordpressBlocksViewerProps
 * @returns JSX.Component that renders the block tree.
 */
export function WordPressBlocksViewer(props: WordpressBlocksViewerProps) {
  const { blocks } = React.useContext(WordPressBlocksContext);
  if (!blocks) {
    throw new Error('Blocks are required. Please add them to your config.');
  }

  const { contentBlocks } = props;
  const renderedBlocks = contentBlocks.map((block, idx) => {
    const BlockTemplate = resolveBlockTemplate(block, blocks);
    const blockProps = hooks.applyFilters(
      `resolve_block_${BlockTemplate.name}`,
      block,
      {},
    ) as EditorBlock;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <BlockDataProvider data={block} key={idx}>
        <>{React.createElement(BlockTemplate as any, { ...blockProps })}</>
      </BlockDataProvider>
    );
  });

  return renderedBlocks;
}
