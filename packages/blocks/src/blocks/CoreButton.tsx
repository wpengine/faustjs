import { gql } from '@apollo/client';
import React from 'react';
import Link from 'next/link.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';
import { BlocksTheme } from '../types/theme.js';

export type CoreButtonFragmentProps = ContentBlock & {
  theme: BlocksTheme;
  attributes: {
    anchor?: string;
    backgroundColor?: string;
    cssClassName?: string;
    fontFamily?: string;
    fontSize?: string;
    gradient?: string;
    style?: string;
    text?: string;
    textAlign?: string;
    textColor?: string;
    linkTarget?: string;
    rel?: string;
    url?: string;
    linkClassName?: string;
  };
};

export function CoreButton(props: CoreButtonFragmentProps) {
  const { attributes, theme } = props;
  const style = getStyles(theme, { ...props });
  const linkTarget = attributes.linkTarget ? '_blank' : undefined;
  if (attributes?.url) {
    return (
      <div
        aria-label={attributes?.text}
        id={attributes?.anchor}
        className={attributes?.cssClassName}>
        <Link href={attributes?.url}>
          <a
            target={linkTarget}
            className={attributes?.linkClassName}
            rel={attributes?.rel}
            style={style}>
            <span>{attributes?.text}</span>
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div
      aria-label={attributes?.text}
      id={attributes?.anchor}
      className={attributes?.cssClassName}>
      <a
        target={linkTarget}
        className={attributes?.linkClassName}
        rel={attributes?.rel}
        style={style}>
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
