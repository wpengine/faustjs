import React from 'react';
import {
  FaustHooks,
  FaustPlugin,
  FaustToolbarNodes,
  ToolbarItem,
  ToolbarLink,
  ToolbarSubmenu,
  ToolbarSubmenuWrapper
} from '@faustwp/core';

/**
 * Example Custom Toolbar Plugin.
 */
export class CustomToolbar implements FaustPlugin {
  apply(hooks: FaustHooks) {
    /**
     * This example demonstrates how to filter on the core Toolbar nodes
     * in order to add your own custom nodes!
     */
    hooks.addFilter('toolbarNodes', 'faust', (toolbarNodes: FaustToolbarNodes) => {
      const customToolbarNodes = [
        /**
         * A simple link.
         */
        <CustomNode />,
        /**
         * A simple link with a submenu that displays on hover.
         */
        <CustomNodeWithSubmenu/>
      ];

      return [...toolbarNodes, ...customToolbarNodes];
    });
  }
}

export function CustomNode() {
  return (
    <ToolbarLink url='https://wpengine.com' rel='nofollow'>
      Custom Node
    </ToolbarLink>
  );
}

export function CustomNodeWithSubmenu() {
  return (
    <>
      <ToolbarLink url='https://wpengine.com' rel='nofollow'>
        Custom Node w/ Submenu
      </ToolbarLink>
      <ToolbarSubmenuWrapper>
        <ToolbarSubmenu>
          <ToolbarItem>
            <ToolbarLink url='https://wpengine.com' rel='nofollow'>Link</ToolbarLink>
          </ToolbarItem>
          <ToolbarItem>
            <ToolbarLink url='https://wpengine.com' rel='nofollow'>Link</ToolbarLink>
          </ToolbarItem>
          <ToolbarItem>
            <ToolbarLink url='https://wpengine.com' rel='nofollow'>Link</ToolbarLink>
          </ToolbarItem>
        </ToolbarSubmenu>
      </ToolbarSubmenuWrapper>
    </>
  );
}
