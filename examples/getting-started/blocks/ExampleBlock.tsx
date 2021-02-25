/**
 * External dependencies
 */
import * as React from 'react';

interface Attributes {
  title: string;
  description: string;
  'button-text': string;
  'button-link': string;
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
function ExampleBlock(props: ExampleProps): React.ReactElement {
  const { attrs, attributes } = props;
  const blockAttributes = attrs || attributes;

  return (
    <div>
      <h1>{blockAttributes.title}</h1>
      <p>{blockAttributes.description}</p>
      <a role="button" href={blockAttributes['button-link']}>
        {blockAttributes['button-text']}
      </a>
    </div>
  );
}

export default ExampleBlock;
