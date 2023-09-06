import * as React from 'react';
import { BlockConfiguration, BlockEditProps } from '@wordpress/blocks';
import InspectorFields from './InspectorFields.js';
import EditorForm from './EditorForm.js';
import { Field } from '../types/index.js';

interface EditFormFieldsProps<T extends Record<string, any>> {
  props: BlockEditProps<T>;
  fields: Field[];
  blockJson: BlockConfiguration;
}

function EditFormFields<T extends Record<string, any>>({
  props,
  fields,
  blockJson,
}: EditFormFieldsProps<T>) {
  const inspectorFields = fields.filter(
    (field: Field) => field.location === 'inspector',
  );
  const editorFields = fields.filter(
    (field: Field) => field.location === 'editor',
  );
  return (
    <>
      <InspectorFields fields={inspectorFields} props={props} />
      <EditorForm fields={editorFields} props={props} blockJson={blockJson} />
    </>
  );
}

export default EditFormFields;
