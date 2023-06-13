import React from 'react';
import { ContentBlock } from './WordPressBlocksViewer.js';

/**
 * DefaultBlock is an instance of WordPressBlock that is used in case no matching component is found when rendering the list of blocks.
 * @param param0
 * @returns JSX.Element
 */
export default function DefaultBlock({ renderedHtml }: ContentBlock) {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: renderedHtml ?? '' }} />;
}

DefaultBlock.displayName = 'DefaultBlock';
