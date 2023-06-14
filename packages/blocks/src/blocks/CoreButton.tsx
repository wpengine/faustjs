import { gql } from '@apollo/client';
import React from 'react';
import Link from 'next/link.js';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreButtonFragmentProps = ContentBlock & {
  attributes: {
    anchor?: string;
    backgroundColor?: string;
    cssClassName?: string;
    fontFamily?: string;
    fontSize?: string;
    gradient?: string;
    style?: string;
    text?: string;
    textColor?: string;
    linkTarget?: string;
    rel?: string;
    url?: string;
    linkClassName?: string;
  };
};

export function CoreButton(props: CoreButtonFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;
  if (attributes?.url) {
    return (
      <div
        aria-label={attributes?.text}
        style={style}
        id={attributes?.anchor}
        className={attributes?.cssClassName}>
        <Link href={attributes?.url}>
          <a className={attributes?.linkClassName} rel={attributes?.rel}>
            <span>{attributes?.text}</span>
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div
      aria-label={attributes?.text}
      style={style}
      id={attributes?.anchor}
      className={attributes?.cssClassName}>
      <a className={attributes?.linkClassName} rel={attributes?.rel}>
        <span>{attributes?.text}</span>
      </a>
    </div>
  );
}

CoreButton.fragments = {
  key: `CoreButtonBlockFragment`,
  entry: gql`
    fragment CoreButtonBlockFragment on CoreButton {
      attributes {
        anchor
        gradient
        text
        textAlign
        textColor
        style
        fontSize
        fontFamily
        linkTarget
        rel
        url
        backgroundColor
        cssClassName
        linkClassName
      }
    }
  `,
};
CoreButton.config = {
  name: 'CoreButton',
};
CoreButton.displayName = 'CoreButton';
