import * as React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { EditFnContext } from '../registerFaustBlock.js';
import Preview from './Preview.js';

export default function Edit<T extends Record<string, any>>(
  ctx: EditFnContext<T>,
) {
  const blockProps = useBlockProps();
  const { block, props } = ctx;
  return (
    <div {...blockProps}>
      {props.isSelected ? (
        <div>Edit mode</div>
      ) : (
        <Preview block={block} props={props} />
      )}
    </div>
  );
}
