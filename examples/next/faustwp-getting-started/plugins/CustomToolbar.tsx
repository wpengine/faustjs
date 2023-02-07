import React from 'react';
import {
  FaustHooks,
  FaustPlugin,
  FaustToolbarNodes,
  ToolbarLink,
} from '@faustwp/core';

export class CustomToolbar implements FaustPlugin {
  apply(hooks: FaustHooks) {
    hooks.addFilter('toolbarNodes', 'faust', (toolbarNodes: FaustToolbarNodes) => {
      const previousToolbarNodes = toolbarNodes;
      const updatedToolbarNodes = [...previousToolbarNodes, [<HelloWorld />]];

      return updatedToolbarNodes;
    });
  }
}

export function HelloWorld() {
  return (
    <ToolbarLink url='https://wpengine.com'>
      Hello World!!
    </ToolbarLink>
  );
}
