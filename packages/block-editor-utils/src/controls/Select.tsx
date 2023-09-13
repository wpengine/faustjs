import * as React from 'react';
import { SelectControl } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function Select<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: string) => {
    props.setAttributes({ [config.name]: String(newContent) });
  };
  return (
    <SelectControl
      label={config.label}
      value={props.attributes[config.name]}
      options={config.options}
      onChange={onChange}
    />
  );
}

export default Select;
