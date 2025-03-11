import { gql } from '@apollo/client';
import React from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import {
  BlockWithAttributes,
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreListItemFragmentProps = ContentBlock & {
  attributes?: {
    content?: string;
    anchor?: string;
    backgroundColor?: string;
    borderColor?: string;
    className?: string;
    fontFamily?: string;
    fontSize?: string;
    gradient?: string;
    lock?: string;
    metadata?: string;
    placeholder?: string;
    style?: string;
    textColor?: string;
  };
  innerBlocks?: Array<BlockWithAttributes | null>;
};

export function CoreListItem(props: CoreListItemFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes, innerBlocks } = props;

  const content = attributes?.content;

  if (!content) {
    return null;
  }

  const ownContent = content ? content.split('\n')[0] : '';

  return (
    <li style={style} className={attributes?.className}>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: ownContent }}
      />

      <WordPressBlocksViewer blocks={innerBlocks ?? []} />
    </li>
  );
}

CoreListItem.fragments = {
  key: `CoreListItemFragment`,
  entry: gql`
    fragment CoreListItemFragment on CoreListItem {
      attributes {
        content
        anchor
        backgroundColor
        borderColor
        className
        fontFamily
        fontSize
        gradient
        lock
        metadata
        placeholder
        style
        textColor
      }
    }
  `,
};

CoreListItem.config = {
  name: 'CoreListItem',
};

CoreListItem.displayName = 'CoreListItem';
