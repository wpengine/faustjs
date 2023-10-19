import React from 'react';
import { gql } from '@apollo/client';

import { getStyles } from '../utils/get-styles/getStyles.js';

import {
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../types/theme.js';
import { WordPressBlock } from '../components/WordPressBlocksProvider.js';


export type CoreColumnFragmentProps = ContentBlock & {
  theme: BlocksTheme;
  blocks: { [key: string]: WordPressBlock };
  attributes: {
    cssClassName?: string;
    align?: string;
    anchor?: string;
    layout?: string;
    verticalAlignment?: string;
    borderColor?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontFamily?: string;
    style?: string;
    textColor?: string;
    gradient?: string;
  };
};

export function CoreColumn(props: CoreColumnFragmentProps) {
  const { attributes, theme, innerBlocks } = props;
  const style = getStyles(theme, { ...props });
  return (
    <div style={style} className={attributes?.cssClassName}>
      <WordPressBlocksViewer blocks={innerBlocks ?? []} />
    </div>
  );
}

CoreColumn.fragments = {
  key: `CoreColumnBlockFragment`,
  entry: gql`
    fragment CoreColumnBlockFragment on CoreColumn {
      attributes {
        anchor
        borderColor
        backgroundColor
        cssClassName
        fontSize
        fontFamily
        gradient
        layout
        style
        textColor
        verticalAlignment
        width
      }
    }
  `,
};
CoreColumn.config = {
  name: 'CoreColumn',
};
CoreColumn.displayName = 'CoreColumn';
