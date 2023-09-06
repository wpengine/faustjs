import * as React from 'react';
import { ColorPicker } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function Color<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: string) => {
    props.setAttributes({ [config.name]: newContent });
  };

  return (
    <>
      <label
        style={{ marginBottom: '10px', display: 'block' }}
        htmlFor={config.label}>
        {config.label}
      </label>
      <ColorPicker
        id={config.label}
        color={props.attributes[config.name]}
        onChange={onChange}
      />
    </>
  );
}

export default Color;
