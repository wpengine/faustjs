import * as React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { SaveFnContext } from '../registerFaustBlock.js';

export default function Save<T extends Record<string, any>>(
  ctx: SaveFnContext<T>,
) {
  const blockProps = useBlockProps.save();
  const { block: Block, props } = ctx;
  const allBlockProps: React.Attributes = {
    key: null,
    ...blockProps,
    ...props,
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Block {...allBlockProps}>
      <InnerBlocks.Content />
    </Block>
  );
}
