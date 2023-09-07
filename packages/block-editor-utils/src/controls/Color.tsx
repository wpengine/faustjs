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
      <p style={{ marginBottom: '10px' }}>{config.label}</p>
      <ColorPicker color={props.attributes[config.name]} onChange={onChange} />
    </>
  );
}

export default Color;
