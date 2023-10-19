import React from 'react';
import { gql } from '@apollo/client';

import { getStyles } from '../utils/get-styles/getStyles.js';

import {
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../types/theme.js';
import { WordPressBlock } from '../components/WordPressBlocksProvider.js';

export type CoreButtonsFragmentProps = ContentBlock & {
  theme: BlocksTheme;
  blocks: { [key: string]: WordPressBlock };
  attributes: {
    cssClassName?: string;
    align?: string;
    anchor?: string;
    layout?: string;
    fontSize?: string;
    fontFamily?: string;
    style?: string;
  };
};

export function CoreButtons(props: CoreButtonsFragmentProps) {
  const { attributes, theme, innerBlocks } = props;
  const style = getStyles(theme, { ...props });
  return (
    <div
      style={style}
      id={attributes?.anchor}
      className={attributes?.cssClassName}>
      <WordPressBlocksViewer blocks={innerBlocks ?? []} />
    </div>
  );
}

CoreButtons.fragments = {
  key: `CoreButtonsBlockFragment`,
  entry: gql`
    fragment CoreButtonsBlockFragment on CoreButtons {
      attributes {
        cssClassName
        align
        anchor
        fontFamily
        fontSize
        layout
        style
      }
    }
  `,
};
CoreButtons.config = {
  name: 'CoreButtons',
};
CoreButtons.displayName = 'CoreButtons';
