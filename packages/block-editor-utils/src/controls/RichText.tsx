import * as React from 'react';
import { RichText } from '@wordpress/block-editor';
import { BaseControl, useBaseControlProps } from '@wordpress/components';
import { ControlProps, RichTextField } from '../types/index.js';

function Rich<T extends Record<string, any>>({
  config,
  props,
}: ControlProps<T>) {
  const c = config as RichTextField;
  const { baseControlProps } = useBaseControlProps({
    id: props?.clientId,
    className: props?.className,
    label: c.label,
  });
  const onChange = (newContent: string | undefined) => {
    props.setAttributes({ [config.name]: newContent });
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseControl {...baseControlProps}>
      <RichText
        id={baseControlProps.id}
        className="components-text-control__input"
        aria-label={c.label}
        value={props.attributes[c.name]}
        tagName={c.tagName ?? 'div'}
        onChange={onChange}
        label={c.label}
      />
    </BaseControl>
  );
}

export default Rich;
