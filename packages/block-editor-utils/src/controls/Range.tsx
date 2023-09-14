import * as React from 'react';
import { RangeControl } from '@wordpress/components';
import { ControlProps, RangeField } from '../types/index.js';

function Range<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const onChange = (newContent: number | undefined) => {
    props.setAttributes({ [config.name]: newContent });
  };
  const params: RangeField = {
    ...config,
    control: 'range',
  }; // TODO use satisfies operator when using TS v5
  return (
    <RangeControl
      label={params.label}
      onChange={onChange}
      value={props.attributes[config.name]}
      min={params?.min}
      max={params?.max}
    />
  );
}

export default Range;
