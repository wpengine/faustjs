import * as React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { EditFnContext } from '../registerFaustBlock.js';
import Preview from './Preview.js';
import EditFormFields from './EditFormFields.js';
import getControlFields from '../helpers/getControlFields.js';
import { Control } from '../types/index.js';

type ControlMap = { [key: string]: Control };
addFilter(
  'faustBlockEditorUtils.controls',
  'faust-block-editor-utils',
  (controls: ControlMap) => {
    // eslint-disable-next-line no-param-reassign
    controls.color = () => <div>Another Color</div>;
    return controls;
  },
);

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
