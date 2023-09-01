import * as React from 'react';
import { BlockEditProps } from '@wordpress/blocks';
import InspectorFields from './InspectorFields.js';
import { Field } from '../types/index.js';

interface EditFormFieldsProps<T extends Record<string, any>> {
  props: BlockEditProps<T>;
  fields: Field[];
}

function EditFormFields<T extends Record<string, any>>({
  props,
  fields,
}: EditFormFieldsProps<T>) {
  const inspectorFields = fields.filter(
    (field: Field) => field.location === 'inspector',
  );
  return (
    <>
      <InspectorFields fields={inspectorFields} props={props} />
      <div>Edit mode</div>
    </>
  );
}

export default EditFormFields;
