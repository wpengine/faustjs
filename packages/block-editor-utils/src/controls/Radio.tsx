import * as React from 'react';
import { RadioControl } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function Radio<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: string) => {
    props.setAttributes({ [config.name]: String(newContent) });
  };
  return (
    <RadioControl
      label={config.label}
      selected={props.attributes[config.name]}
      options={config.options}
      onChange={onChange}
    />
  );
}

export default Radio;
