import { setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';
import React from 'react';

class HeadDesc {
  apply({ addFilter }) {
    addFilter('wphead', 'faust', (elements, ctx) => {
      return [
        ...elements,
        <meta property="description" content="My description" />,
      ];
    });
  }
}

class HeadTitle {
  apply({ addFilter }) {
    addFilter('wphead', 'faust', (elements, ctx) => {
      return [...elements, <title>My title</title>];
    });
  }
}

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [new HeadTitle(), new HeadDesc()],
  possibleTypes,
});
