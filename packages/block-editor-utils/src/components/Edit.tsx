import * as React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { EditFnContext } from '../registerFaustBlock.js';
import Preview from './Preview.js';
import EditFormFields from './EditFormFields.js';
import getControlFields from '../helpers/getControlFields.js';

export default function Edit<T extends Record<string, any>>(
  ctx: EditFnContext<T>,
) {
  const blockProps = useBlockProps();
  const { block, props, blockJson } = ctx;
  const { editorFields = [] } = block.config;
  const fieldsConfig = getControlFields(
    blockJson,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    editorFields,
  );
  return (
    <div {...blockProps}>
      {props.isSelected ? (
        <EditFormFields
          props={props}
          fields={fieldsConfig}
          blockJson={blockJson}
        />
      ) : (
        <Preview block={block} props={props} />
      )}
    </div>
  );
}
