import React from 'react';
import {
  ToolbarItem,
  ToolbarSubmenu,
  ToolbarSubmenuWrapper,
  ToolbarNodeSkeleton,
} from '@faustwp/core';

/**
 * Example Custom Toolbar Plugin.
 */
export class CustomToolbarPlugin {
  apply(hooks) {
    /**
     * This example demonstrates how to filter on the core Toolbar nodes
     * in order to add your own custom nodes!
     */
    hooks.addFilter(
      'toolbarNodes',
      'faust',
      (toolbarNodes, context) => {
        const customToolbarNodes = [
          {
            id: 'custom-node',
            location: 'primary',
            component: <CustomNode />,
          },
          {
            id: 'custom-node-with-submenu',
            location: 'primary',
            component: <CustomNodeWithSubmenu />,
          },
          {
            id: 'custom-node-with-submenu',
            location: 'primary',
            component: <CustomNodeWithLoader />,
          },
        ];

        return [...toolbarNodes, ...customToolbarNodes];
      },
    );
  }
}

/**
 * A simple link.
 */
export function CustomNode() {
  return (
    <ToolbarItem href="https://wpengine.com" rel="nofollow">
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
      <ToolbarItem>
        Custom Node w/ Submenu
      </ToolbarItem>
      <ToolbarSubmenuWrapper>
        <ToolbarSubmenu>
          <li>
            <ToolbarItem href="https://wpengine.com" rel="nofollow">
              Link
            </ToolbarItem>
          </li>
          <li>
            <ToolbarItem href="https://wpengine.com" rel="nofollow">
              Link
            </ToolbarItem>
          </li>
          <li>
            <ToolbarItem href="https://wpengine.com" rel="nofollow">
              Link
            </ToolbarItem>
          </li>
        </ToolbarSubmenu>
      </ToolbarSubmenuWrapper>
    </>
  );
}

/**
 * Use the skeleton component for async data.
 */
export function CustomNodeWithLoader() {
  return (
    <ToolbarNodeSkeleton />
  );
}