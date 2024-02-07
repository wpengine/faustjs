import { gql } from '@apollo/client';
import React from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreHeadingFragmentProps = ContentBlock & {
  attributes?: {
    align?: string;
    anchor?: string;
    backgroundColor?: string;
    className?: string;
    content?: string;
    cssClassName?: string;
    fontFamily?: string;
    fontSize?: string;
    gradient?: string;
    style?: string;
    textColor?: string;
    textAlign?: string;
    level?: number;
  };
};

export function CoreHeading(props: CoreHeadingFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  const level = `h${attributes?.level ?? 1}`;
  const headingProps = {
    style,
    dangerouslySetInnerHTML: { __html: attributes?.content },
    id: attributes?.anchor,
    className: attributes?.cssClassName,
  };
  return React.createElement(level, headingProps);
}

CoreHeading.fragments = {
  key: `CoreHeadingBlockFragment`,
  entry: gql`
    fragment CoreHeadingBlockFragment on CoreHeading {
      attributes {
        align
        anchor
        backgroundColor
        content
        fontFamily
        fontSize
        gradient
        level
        style
        textAlign
        textColor
        cssClassName
      }
    }
  `,
};
CoreHeading.config = {
  name: 'CoreHeading',
};
CoreHeading.displayName = 'CoreHeading';
