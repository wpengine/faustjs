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
    placeholder?: string;
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
  const { values } = attributes;

  if (!values) {
    return null;
  }

  const ListLevel = attributes?.ordered ? 'ol' : 'ul';

  return (
    <ListLevel style={style} dangerouslySetInnerHTML={{ __html: values }} />
  );
}
