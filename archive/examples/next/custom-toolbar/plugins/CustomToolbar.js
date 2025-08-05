//plugins/CustomPlugin.js

import React from "react"
import {
  ToolbarItem,
  ToolbarSubmenu,
  ToolbarSubmenuWrapper
} from "@faustwp/core"

/**
 * Example Custom Toolbar Plugin.
 */
export class CustomToolbar {
  apply(hooks) {
    /**
     * This example demonstrates how to filter on the core Toolbar nodes
     * in order to add your own custom nodes!
     */
    hooks.addFilter("toolbarNodes", "faust", (toolbarNodes, context) => {
      const customToolbarNodes = [
        {
          id: "custom-node",
          location: "primary",
          component: <CustomNode />
        },
        {
          id: "custom-node-with-submenu",
          location: "primary",
          component: <CustomNodeWithSubmenu />
        }
      ]

      return [...toolbarNodes, ...customToolbarNodes]
    })
  }
}

/**
 * A simple link.
 */
export function CustomNode() {
  return (
    <ToolbarItem href="https://wpengine.com/headless-wordpress/" rel="nofollow">
      Headless WordPress
    </ToolbarItem>
  )
}

/**
 * A simple link with a submenu that displays on hover.
 */
export function CustomNodeWithSubmenu() {
  return (
    <>
      <ToolbarItem
        href="https://faustjs.org/tutorial/get-started-with-faust"
        rel="nofollow"
      >
        Documentation
      </ToolbarItem>
      <ToolbarSubmenuWrapper>
        <ToolbarSubmenu>
          <li>
            <ToolbarItem href="https://faustjs.org" rel="nofollow">
              Faustjs.org
            </ToolbarItem>
          </li>
          <li>
            <ToolbarItem
              href="https://faustjs.org/guide/how-to-customize-the-toolbar"
              rel="nofollow"
            >
              Customizing the Toolbar
            </ToolbarItem>
          </li>
          <li>
            <ToolbarItem
              href="https://faustjs.org/guide/how-to-handle-authentication"
              rel="nofollow"
            >
              How to Handle Authentication
            </ToolbarItem>
          </li>
        </ToolbarSubmenu>
      </ToolbarSubmenuWrapper>
    </>
  )
}
