import * as React from 'react';
import { BlockEditProps } from '@wordpress/blocks';
import InspectorFields from './InspectorFields.js';
import { Field } from '../types/index.js';

interface EditFormFieldsProps<T extends Record<string, any>> {
  props: BlockEditProps<T>;
}

function EditFormFields<T extends Record<string, any>>({
  props,
}: EditFormFieldsProps<T>) {
  const inspectorFields = [] as Field[];
  return (
    <>
      <InspectorFields fields={inspectorFields} props={props} />
      <div>Edit mode</div>
    </>
  );
}

export default EditFormFields;
