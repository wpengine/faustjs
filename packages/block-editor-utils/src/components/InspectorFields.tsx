import * as React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { BlockEditProps } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';
import { Control, Field } from '../types/index.js';

interface InspectorFieldsProps<T extends Record<string, any>> {
  fields: Field[];
  props: BlockEditProps<T>;
}

function InspectorFields<T extends Record<string, any>>({
  fields,
  props,
}: InspectorFieldsProps<T>) {
  const loadedControls = applyFilters('faustBlockEditorUtils.controls', {}) as {
    [key: string]: Control;
  };
  const renderFields = () => {
    return fields
      .map((field: Field) => {
        const ControlField = loadedControls[field.control];
        if (!ControlField) {
          return null;
        }
        return (
          <PanelBody
            className="faust-inspector-form-field"
            key={`inspector-controls-panel-${field.name}`}>
            <ControlField config={field} props={props} />
          </PanelBody>
        );
      })
      .filter(Boolean);
  };
  return (
    <InspectorControls key="FaustBlockInspectorControls">
      <>{renderFields()}</>
    </InspectorControls>
  );
}

export default InspectorFields;
