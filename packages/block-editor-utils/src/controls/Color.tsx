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
  // check for default value (https://developer.wordpress.org/block-editor/reference-guides/components/color-picker/#usage:~:text=setColor%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20enableAlpha-,defaultValue%3D%22%23000%22,-/%3E%0A%20%20%20%20)%3B)
  // label https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
  
  return (
    <>
    <label style={{ marginBottom: "10px", display: "block" }} htmlFor={config.label}>{config.label}</label>  
      <ColorPicker
        id={config.label}
        color={props.attributes[config.name]}
        onChange={onChange}
      />  
    </>
  );
}

export default Color;
