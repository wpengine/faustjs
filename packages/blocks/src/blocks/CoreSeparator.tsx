import { gql } from '@apollo/client';
import React from 'react';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';
import { BlocksTheme } from '../types/theme.js';

export type CoreSeparatorFragmentProps = ContentBlock & {
  theme: BlocksTheme;
  attributes: {
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
  const { attributes, theme } = props;
  const style = getStyles(theme, { ...props });

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
