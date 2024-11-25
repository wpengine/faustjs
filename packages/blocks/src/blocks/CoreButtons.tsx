import React from 'react';
import { gql } from '@apollo/client';

import { getStyles } from '../utils/get-styles/getStyles.js';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';

import {
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';

export type CoreButtonsFragmentProps = ContentBlock & {
  attributes?: {
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
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes, innerBlocks } = props;
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
