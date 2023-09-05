import * as React from 'react';
import { TextControl } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function Text<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: string) => {
    props.setAttributes({ [config.name]: newContent });
  };
  return (
    <TextControl
      label={config.label}
      value={props.attributes[config.name]}
      onChange={onChange}
    />
  );
}

export default Text;
