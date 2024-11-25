import React from 'react';
import { gql } from '@apollo/client';

import { getStyles } from '../utils/get-styles/getStyles.js';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';

import {
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';

export type CoreColumnFragmentProps = ContentBlock & {
  attributes?: {
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
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes, innerBlocks } = props;
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
