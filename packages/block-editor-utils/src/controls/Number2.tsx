import * as React from 'react';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function Number<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: string) => {
    props.setAttributes({ [config.name]: newContent });
  };
  return (
    <NumberControl
      label={config.label}
      value={props.attributes[config.name]}
      onChange={onChange}
      isShiftStepEnabled={ true }
      onChange={ setValue }
      shiftStep={ 10 }
      value={ value }
    />
  );
}

export default Number;
