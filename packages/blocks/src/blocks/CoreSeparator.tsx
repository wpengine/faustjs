import { gql } from '@apollo/client';
import React from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreSeparatorFragmentProps = ContentBlock & {
  attributes?: {
    align?: string;
    anchor?: string;
    backgroundColor?: string;
    cssClassName?: string;
    gradient?: string;
    opacity?: string;
    style?: string;
  };
};

export function CoreSeparator(props: CoreSeparatorFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  return (
    <hr
      style={style}
      className={attributes?.cssClassName}
      id={attributes?.anchor}
    />
  );
}

CoreSeparator.fragments = {
  key: `CoreSeparatorBlockFragment`,
  entry: gql`
    fragment CoreSeparatorBlockFragment on CoreSeparator {
      attributes {
        align
        anchor
        opacity
        gradient
        backgroundColor
        style
        cssClassName
      }
    }
  `,
};

CoreSeparator.config = {
  name: 'CoreSeparator',
};
CoreSeparator.displayName = 'CoreSeparator';
