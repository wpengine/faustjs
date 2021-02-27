import * as React from 'react';

interface Attributes {
  'new-field': string;
}

interface ExampleProps {
  attrs: Attributes;
  attributes: Attributes;
}

function Example(props: ExampleProps): React.ReactElement {
  const { attrs, attributes } = props;
  const blockAttributes = attrs || attributes;

  return (
    <div>
      <p>This is the React component</p>
      <p>{blockAttributes['new-field']}</p>
    </div>
  );
}

export default Example;
