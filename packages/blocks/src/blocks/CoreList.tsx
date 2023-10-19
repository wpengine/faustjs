import { gql } from '@apollo/client';
import React from 'react';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';
import { BlocksTheme } from '../types/theme.js';

export type CoreListFragmentProps = ContentBlock & {
  theme: BlocksTheme;
  attributes: {
    anchor?: string;
    backgroundColor?: string;
    className?: string;
    fontFamily?: string;
    fontSize?: string;
    gradient?: string;
    lock?: string;
    ordered?: boolean;
    reversed?: boolean;
    start?: number;
    style?: string;
    textColor?: string;
    type?: string;
    values?: string;
    cssClassName?: string;
  };
};

export function CoreList(props: CoreListFragmentProps) {
  const { attributes, theme } = props;
  const style = getStyles(theme, { ...props });

  if (!attributes?.values) {
    return null;
  }

  const ListLevel = attributes?.ordered ? 'ol' : 'ul';

  return (
    <ListLevel
      style={style}
      className={attributes?.cssClassName}
      reversed={
        attributes?.ordered && attributes?.reversed === true ? true : undefined
      }
      start={
        attributes?.ordered && attributes?.start ? attributes?.start : undefined
      }
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: attributes.values }}
    />
  );
}

CoreList.fragments = {
  key: `CoreListBlockFragment`,
  entry: gql`
    fragment CoreListBlockFragment on CoreList {
      attributes {
        anchor
        backgroundColor
        className
        fontFamily
        fontSize
        gradient
        lock
        ordered
        reversed
        start
        style
        textColor
        type
        values
        cssClassName
      }
    }
  `,
};

CoreList.config = {
  name: 'CoreList',
};

CoreList.displayName = 'CoreList';
