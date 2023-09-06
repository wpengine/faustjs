import * as React from 'react';
import { ColorPicker, ColorIndicator } from '@wordpress/components';
import { ControlProps } from '../types/index.js';


// following the convention set in Text.tsx
function Color<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: string) => {
    props.setAttributes({ [config.name]: newContent });
  };
  return (
    <>
      <ColorPicker
        label={config.label}
        value={props.attributes[config.name]}
        onChange={onChange}
      />  
      <ColorIndicator
        label={config.label}
        value={props.attributes[config.name]}
        onChange={onChange}
      /> 
    </>
  );
}

export default Color;
