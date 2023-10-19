import React from 'react';
import { gql } from '@apollo/client';

import { getStyles } from '../utils/get-styles/getStyles.js';

import {
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../types/theme.js';
import { WordPressBlock } from '../components/WordPressBlocksProvider.js';

export type CoreColumnsFragmentProps = ContentBlock & {
  theme: BlocksTheme;
  blocks: { [key: string]: WordPressBlock };
  attributes: {
    cssClassName?: string;
    align?: string;
    anchor?: string;
    layout?: string;
    isStackedOnMobile?: boolean;
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

export function CoreColumns(props: CoreColumnsFragmentProps) {
  const { attributes, theme, innerBlocks } = props;
  const style = getStyles(theme, { ...props });
  return (
    <div style={style} className={attributes?.cssClassName}>
      <WordPressBlocksViewer blocks={innerBlocks ?? []} />
    </div>
  );
}

CoreColumns.fragments = {
  key: `CoreColumnsBlockFragment`,
  entry: gql`
    fragment CoreColumnsBlockFragment on CoreColumns {
      attributes {
        align
        anchor
        layout
        cssClassName
        isStackedOnMobile
        verticalAlignment
        borderColor
        backgroundColor
        fontSize
        fontFamily
        style
        textColor
        gradient
      }
    }
  `,
};
CoreColumns.config = {
  name: 'CoreColumns',
};
CoreColumns.displayName = 'CoreColumns';
