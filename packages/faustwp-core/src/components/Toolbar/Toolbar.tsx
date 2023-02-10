import React, { useEffect, useState } from 'react';
import { getConfig } from '../../config/index.js';
import { Brand, GraphiQL } from './nodes';
import { hooks } from '../../hooks/index.js';
import { ToolbarItem } from './ToolbarItem.js';

export type ToolbarNodes = React.ReactElement[];

/**
 * Renders a Toolbar that is based on WordPress' own toolbar.
 */
export function Toolbar(props: { client: React.ReactNode }) {
  const { disableToolbar } = getConfig();

  if (disableToolbar) {
    return <></>;
  }

  const { client } = props;

  const defaultToolbarNodes = [<Brand />, <GraphiQL />];

  const [toolbarNodes, setToolbarNodes] = useState(defaultToolbarNodes);
  const [loading, setLoading] = useState(null);

  // @TODO REMOVE
  const data = {};

  /**
   * Handle Toolbar nodes.
   */
  useEffect(() => {
    const filteredNodes = hooks.applyFilters(
      'toolbarNodes',
      defaultToolbarNodes,
    ) as ToolbarNodes;

    setToolbarNodes(filteredNodes);
  }, []);

  /**
   * Handle Toolbar nodes.
   */
  useEffect(() => {
    /**
     * Add admin-bar body class on render.
     *
     * This could eventually be handled with a Faust bodyClass hook
     * @link https://developer.wordpress.org/reference/hooks/body_class/
     */
    document?.body.classList.add('admin-bar');
  }, []);

  return (
    <div id="wpadminbar" className={`${loading ? 'loading' : ''} nojq`}>
      <div
        id="wp-toolbar"
        className="quicklinks"
        role="navigation"
        aria-label="Toolbar">
        <ul id="wp-admin-bar-root-default" className="ab-top-menu">
          {toolbarNodes.map((item, i) => {
            return (
              <ToolbarItem key={i} id={`${i}`}>
                {item}
              </ToolbarItem>
            );
          })}
        </ul>
        <ul
          id="wp-admin-bar-top-secondary"
          className="ab-top-secondary ab-top-menu"></ul>
      </div>
    </div>
  );
}
