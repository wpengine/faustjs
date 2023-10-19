import React from 'react';
import { gql } from '@apollo/client';

import { getStyles } from '../utils/get-styles/getStyles.js';

import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { BlocksTheme } from '../types/theme.js';

export type CoreParagraphFragmentProps = ContentBlock & {
  theme: BlocksTheme;
  attributes: {
    cssClassName?: string;
    backgroundColor?: string;
    content?: string;
    style?: string;
    textColor?: string;
    fontSize?: string;
    fontFamily?: string;
    direction?: string;
    dropCap?: string;
    gradient?: string;
    align?: string;
  };
};

export function CoreParagraph(props: CoreParagraphFragmentProps) {
  const { attributes, theme } = props;
  const style = getStyles(theme, { ...props });

  return (
    <p
      style={style}
      className={attributes?.cssClassName}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: attributes?.content ?? '' }}
    />
  );
}

CoreParagraph.fragments = {
  key: `CoreParagraphBlockFragment`,
  entry: gql`
    fragment CoreParagraphBlockFragment on CoreParagraph {
      attributes {
        cssClassName
        backgroundColor
        content
        style
        textColor
        fontSize
        fontFamily
        direction
        dropCap
        gradient
        align
      }
    }
  `,
};
CoreParagraph.config = {
  name: 'CoreParagraph',
};
CoreParagraph.displayName = 'CoreParagraph';
