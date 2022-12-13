/* eslint-disable prettier/prettier */
import React from 'react';
import { EditorBlock } from './WordPressBlocksViewer.js';

export default function DefaultBlock({ renderedHtml }: EditorBlock) {
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: renderedHtml ?? '' }} />;
}

DefaultBlock.displayName = 'DefaultBlock';
