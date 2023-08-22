import * as React from 'react';
import { BlockEditProps } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { BlockFC } from '../types/index.js';

const overlayStyle: React.CSSProperties = {
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
};

interface PreviewProps<T extends Record<string, any>> {
  block: BlockFC;
  props: BlockEditProps<T>;
}

function Preview<T extends Record<string, any>>({
  block: Block,
  props,
}: PreviewProps<T>) {
  const blockProps = useBlockProps();
  const allBlockProps: React.Attributes = {
    key: null,
    ...blockProps,
    ...props,
  };
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Block {...allBlockProps}>
        <InnerBlocks />
      </Block>
      <div style={overlayStyle} />
    </>
  );
}

export default Preview;
