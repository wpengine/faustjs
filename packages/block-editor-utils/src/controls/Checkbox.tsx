import * as React from 'react';
import { CheckboxControl } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function Checkbox<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: boolean) => {
    props.setAttributes({ [config.name]: newContent });
  };
  return (
    <CheckboxControl
      label={config.label}
      checked={props.attributes[config.name]}
      onChange={onChange}
    />
  );
}

export default Checkbox;
