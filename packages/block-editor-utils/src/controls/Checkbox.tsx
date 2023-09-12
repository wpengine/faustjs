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
    // TODO: ensure contents match CheckControl in Block Editor- what is help value?
    // https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/#usage-2
    <CheckboxControl
      label={config.label}
      help={props.attributes[config.help]}
      checked={props.attributes[config.name]}
      onChange={onChange}
    />
  );
}

export default Checkbox;
