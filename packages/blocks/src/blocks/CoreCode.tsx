import { gql } from '@apollo/client';
import React from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreCodeFragmentProps = ContentBlock & {
  attributes?: {
    anchor?: string;
    backgroundColor?: string;
    borderColor?: string;
    className?: string;
    content?: string;
    cssClassName?: string;
    fontFamily?: string;
    fontSize?: string;
    gradient?: string;
    lock?: string;
    style?: string;
    textColor?: string;
  };
};

export function CoreCode(props: CoreCodeFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  return (
    <pre style={style} className={attributes?.cssClassName}>
      <code
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: attributes?.content ?? '' }}
      />
    </pre>
  );
}

CoreCode.fragments = {
  key: `CoreCodeBlockFragment`,
  entry: gql`
    fragment CoreCodeBlockFragment on CoreCode {
      attributes {
        anchor
        backgroundColor
        borderColor
        className
        content
        cssClassName
        fontFamily
        fontSize
        gradient
        lock
        style
        textColor
      }
    }
  `,
};
CoreCode.config = {
  name: 'CoreCode',
};
CoreCode.displayName = 'CoreCode';
