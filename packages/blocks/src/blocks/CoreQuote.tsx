import { gql } from '@apollo/client';
import React from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import {
  BlockWithAttributes,
  ContentBlock,
} from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreQuoteFragmentProps = ContentBlock & {
  attributes: {
    align?: string;
    anchor?: string;
    backgroundColor?: string;
    citation?: string;
    className?: string;
    fontFamily?: string;
    fontSize?: string;
    gradient?: string;
    lock?: string;
    style?: string;
    textColor?: string;
    value?: string;
    cssClassName?: string;
  };
};

export function CoreQuote(props: BlockWithAttributes<CoreQuoteFragmentProps>) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  if (!attributes.value) {
    return null;
  }

  return (
    <figure className={attributes.cssClassName} style={style}>
      {/* eslint-disable-next-line react/no-danger */}
      <blockquote dangerouslySetInnerHTML={{ __html: attributes.value }} />

      {!!attributes.citation && (
        // eslint-disable-next-line react/no-danger
        <figcaption dangerouslySetInnerHTML={{ __html: attributes.citation }} />
      )}
    </figure>
  );
}

CoreQuote.fragments = {
  key: `CoreQuoteBlockFragment`,
  entry: gql`
    fragment CoreQuoteBlockFragment on CoreQuote {
      attributes {
        align
        anchor
        backgroundColor
        citation
        className
        fontFamily
        fontSize
        gradient
        lock
        style
        textColor
        value
        cssClassName
      }
    }
  `,
};
