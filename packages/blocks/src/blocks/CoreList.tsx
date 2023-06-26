import React from 'react';
import { useBlocksTheme } from '../components/WordPressBlocksProvider.js';
import { ContentBlock } from '../components/WordPressBlocksViewer.js';
import { getStyles } from '../utils/index.js';

export type CoreListFragmentProps = ContentBlock & {
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
  };
};

export function CoreList(props: CoreListFragmentProps) {
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });
  const { attributes } = props;

  if (!attributes?.values) {
    return null;
  }

  const ListLevel = attributes?.ordered ? 'ol' : 'ul';

  return (
    <ListLevel
      reversed={
        attributes?.ordered && attributes?.reversed === true ? true : undefined
      }
      start={
        attributes?.ordered && attributes?.start ? attributes?.start : undefined
      }
      style={style}
      dangerouslySetInnerHTML={{ __html: attributes.values }}
    />
  );
}
