import React from 'react';
import { gql } from '@apollo/client';

import { getStyles } from '../utils/get-styles/getStyles.js';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';

import {
  ContentBlock,
  WordPressBlocksViewer,
} from '../components/WordPressBlocksViewer.js';

export type CoreColumnFragmentProps = ContentBlock & {
  attributes?: {
    cssClassName?: string;
    align?: string;
    anchor?: string;
    layout?: string;
    verticalAlignment?: string;
    borderColor?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontFamily?: string;
    style?: string;
    textColor?: string;
    gradient?: string;
  };
};

type ConstrainedLayout = {
  contentSize?: string;
  wideSize?: string;
  justifyContent?: string;
};

// Keep layout sizes to characters valid in CSS lengths, calc() and var(),
// since they're written into a <style> element.
function sanitizeSize(value?: string) {
  return value?.replace(/[^\w\s.%()+\-*/,]/g, '') || undefined;
}

// A small, stable hash so the same layout gets the same class name on the
// server and the client.
function hash(value: string) {
  let result = 5381;
  for (let i = 0; i < value.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    result = ((result << 5) + result + value.charCodeAt(i)) >>> 0;
  }
  return result.toString(36);
}

/**
 * Returns the class name and CSS for a column whose inner blocks use a
 * content width or justification. Like WordPress, the max width and margins
 * apply to the column's inner blocks, not the column itself.
 */
function getConstrainedLayout(layoutAttribute?: string) {
  if (!layoutAttribute) {
    return null;
  }
  let layout: ConstrainedLayout = {};
  try {
    layout = JSON.parse(layoutAttribute) as ConstrainedLayout;
  } catch (e) {
    return null;
  }
  const contentSize = sanitizeSize(layout?.contentSize);
  const wideSize = sanitizeSize(layout?.wideSize);
  const { justifyContent } = layout;
  const isJustified = justifyContent === 'left' || justifyContent === 'right';
  if (!contentSize && !wideSize && !isJustified) {
    return null;
  }
  const className = `wp-container-core-column-faust-${hash(
    [contentSize, wideSize, justifyContent].join('|'),
  )}`;
  const selector = `.${className}`;
  const innerBlocksSelector = `${selector} > :where(:not(.alignleft):not(.alignright):not(.alignfull))`;
  // These match the rules WordPress outputs in wp_get_layout_style().
  const rules: string[] = [];
  if (contentSize || wideSize) {
    const marginLeft =
      justifyContent === 'left' ? '0 !important' : 'auto !important';
    const marginRight =
      justifyContent === 'right' ? '0 !important' : 'auto !important';
    rules.push(
      `${innerBlocksSelector} { max-width: ${
        contentSize ?? wideSize
      }; margin-left: ${marginLeft}; margin-right: ${marginRight}; }`,
      `${selector} > .alignwide { max-width: ${wideSize ?? contentSize}; }`,
      `${selector} .alignfull { max-width: none; }`,
    );
  }
  if (justifyContent === 'left') {
    rules.push(`${innerBlocksSelector} { margin-left: 0 !important; }`);
  } else if (justifyContent === 'right') {
    rules.push(`${innerBlocksSelector} { margin-right: 0 !important; }`);
  }
  return { className, css: rules.join('\n') };
}

export function CoreColumn(props: CoreColumnFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes, innerBlocks } = props;
  const constrainedLayout = getConstrainedLayout(attributes?.layout);
  if (constrainedLayout) {
    // getStyles puts the layout's max width on the block itself, which suits
    // other blocks but not a column.
    delete style.maxWidth;
    delete style.marginLeft;
    delete style.marginRight;
  }
  const className = [attributes?.cssClassName, constrainedLayout?.className]
    .filter(Boolean)
    .join(' ');
  return (
    <>
      {constrainedLayout && <style>{constrainedLayout.css}</style>}
      <div style={style} className={className || undefined}>
        <WordPressBlocksViewer blocks={innerBlocks ?? []} />
      </div>
    </>
  );
}

CoreColumn.fragments = {
  key: `CoreColumnBlockFragment`,
  entry: gql`
    fragment CoreColumnBlockFragment on CoreColumn {
      attributes {
        anchor
        borderColor
        backgroundColor
        cssClassName
        fontSize
        fontFamily
        gradient
        layout
        style
        textColor
        verticalAlignment
        width
      }
    }
  `,
};
CoreColumn.config = {
  name: 'CoreColumn',
};
CoreColumn.displayName = 'CoreColumn';
