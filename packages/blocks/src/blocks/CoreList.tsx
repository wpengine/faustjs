import { gql } from '@apollo/client';
import React from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import {
  BlockWithAttributes,
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';
import { CoreListItemFragmentProps } from './CoreListItem.js';

export type CoreListFragmentProps = Omit<ContentBlock, 'innerBlocks'> & {
  attributes?: {
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
  innerBlocks?: Array<BlockWithAttributes | CoreListItemFragmentProps | null>;
};

export function CoreList(props: CoreListFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  if (!attributes?.values) {
    return null;
  }

  const innerBlocks = props?.innerBlocks ?? [];
  const hasInnerBlocks = innerBlocks.some((ib) => ib?.attributes);

  const ListLevel = attributes?.ordered ? 'ol' : 'ul';

  if (process.env.NODE_ENV === 'development' && !hasInnerBlocks) {
    console.warn(`[Faust.js] To ensure compatibility with the next major release, update your template queries to use 'blocks.CoreListItem.fragments'. 
                  
Without this update, CoreList will NOT render list items in the next major version.

This warning is shown only in development mode.
    `);
  }

  const listProps = {
    style,
    className: attributes?.cssClassName,
    reversed:
      attributes?.ordered && attributes?.reversed === true ? true : undefined,
    start:
      attributes?.ordered && attributes?.start ? attributes?.start : undefined,
  };

  if (hasInnerBlocks) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <ListLevel {...listProps}>
        <WordPressBlocksViewer blocks={innerBlocks} />
      </ListLevel>
    );
  }

  return (
    <ListLevel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...listProps}
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
