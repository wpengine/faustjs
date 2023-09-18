import * as React from 'react';
import { TextControl as NumberControl } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function NumberField<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: string) => {
    props.setAttributes({ [config.name]: Number(newContent) });
  };
  return (
    <NumberControl
      type="number"
      label={config.label}
      value={props.attributes[config.name]}
      onChange={onChange}
    />
  );
}

export default NumberField;
