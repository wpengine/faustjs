/**
 * External dependencies
 */
import * as React from 'react';

interface Attributes {
  'new-field': string;
}

interface ExampleProps {
  attrs: Attributes;
  attributes: Attributes;
}

/**
 * An example block component.
 *
 * @param {ExampleProps} props
 * @return {React.ReactElement} An example preview component.
 */
function Example(props: ExampleProps): React.ReactElement {
  const { attrs, attributes } = props;
  const blockAttributes = attrs || attributes;

  return (
    <div>
      <p>This is an alternate preview component</p>
      <p>{blockAttributes['new-field']}</p>
    </div>
  );
}

export default Example;
