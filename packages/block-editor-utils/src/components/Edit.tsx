import * as React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { EditFnContext } from '../registerFaustBlock.js';
import Preview from './Preview.js';
import EditFormFields from './EditFormFields.js';
import getControlFields from '../helpers/getControlFields.js';
import { Field } from '../types/index.js';

export default function Edit<T extends Record<string, any>>(
  ctx: EditFnContext<T>,
) {
  const blockProps = useBlockProps();
  const { block, props, blockJson } = ctx;
  const { editorFields = [] } = block.config;
  const fieldsConfig = getControlFields(
    blockJson,
    editorFields as Partial<Field>[],
  );
  return (
    <div {...blockProps}>
      {props.isSelected ? (
        <EditFormFields props={props} fields={fieldsConfig} />
      ) : (
        <Preview block={block} props={props} />
      )}
    </div>
  );
}
