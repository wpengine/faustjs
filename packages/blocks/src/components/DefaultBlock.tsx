/* eslint-disable prettier/prettier */
import React from 'react';
import { EditorBlock } from './WordPressBlocksViewer.js';

/**
 * DefaultBlock is an instance of WordPressBlock that is used in case no matching component is found when rendering the list of blocks.
 * @param param0
 * @returns JSX.Element
 */
export default function DefaultBlock({ renderedHtml }: EditorBlock) {
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: renderedHtml ?? '' }} />;
}

DefaultBlock.displayName = 'DefaultBlock';
