import React from 'react';
import {
  FaustHooks,
  FaustPlugin,
} from '@faustwp/core';
import {
  FaustToolbarNodes,
  FaustToolbarContext,
  ToolbarItem,
  ToolbarSubmenu,
  ToolbarSubmenuWrapper,
} from '@faustwp/core/toolbar';

/**
 * Example Custom Toolbar Plugin.
 */
export class CustomToolbar implements FaustPlugin {
  apply(hooks: FaustHooks) {
    /**
     * This example demonstrates how to filter on the core Toolbar nodes
     * in order to add your own custom nodes!
     */
    hooks.addFilter('toolbarNodes', 'faust', (toolbarNodes: FaustToolbarNodes, context: FaustToolbarContext) => {
      const customToolbarNodes: FaustToolbarNodes = [
        {
          id: 'custom-node',
          location: 'primary',
          component: <CustomNode />,
        },
        {
          id: 'custom-node-with-submenu',
          location: 'primary',
          component: <CustomNodeWithSubmenu />
        },
      ];

      return [...toolbarNodes, ...customToolbarNodes];
    });
  }
}

/**
 * A simple link.
 */
export function CustomNode() {
  return (
    <ToolbarItem href='https://wpengine.com' rel='nofollow'>
      Custom Node
    </ToolbarItem>
  );
}

/**
 * A simple link with a submenu that displays on hover.
 */
export function CustomNodeWithSubmenu() {
  return (
    <>
      <ToolbarItem href='https://wpengine.com' rel='nofollow'>
        Custom Node w/ Submenu
      </ToolbarItem>
      <ToolbarSubmenuWrapper>
        <ToolbarSubmenu>
          <li>
            <ToolbarItem href='https://wpengine.com' rel='nofollow'>Link</ToolbarItem>
          </li>
          <li>
            <ToolbarItem href='https://wpengine.com' rel='nofollow'>Link</ToolbarItem>
          </li>
          <li>
            <ToolbarItem href='https://wpengine.com' rel='nofollow'>Link</ToolbarItem>
          </li>
        </ToolbarSubmenu>
      </ToolbarSubmenuWrapper>
    </>
  );
}
