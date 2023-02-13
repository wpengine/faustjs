import React, { useEffect, useState } from 'react';
import { Faust, Edit, GraphiQL } from './nodes/index.js';
import { hooks } from '../../hooks/index.js';
import { ToolbarItem } from './ToolbarItem.js';
import { SeedNode } from '../../queries/seedQuery.js';

type ToolbarProps = {
  client: React.ReactNode;
  seedNode: SeedNode;
};

export type ToolbarNodes = React.ReactElement[];
export type ToolbarContext = {
  seedNode: SeedNode;
};

/**
 * Renders a Toolbar that is based on WordPress' own toolbar.
 */
export function Toolbar({ client, seedNode }: ToolbarProps) {
  /**
   * Define Toolbar Nodes that should be included by default.
   */
  const coreToolbarNodes = [
    <Faust />,
    <Edit seedNode={seedNode} />,
    <GraphiQL />,
  ];

  const [toolbarNodes, setToolbarNodes] = useState(coreToolbarNodes);
  const [loading, setLoading] = useState(null);

  /**
   * Handle Toolbar nodes.
   */
  useEffect(() => {
    const filteredNodes = hooks.applyFilters('toolbarNodes', coreToolbarNodes, {
      seedNode,
    }) as ToolbarNodes;

    setToolbarNodes(filteredNodes);
  }, []);

  /**
   * Handle adding `admin-bar` body class on render.
   *
   * This could eventually be handled with a Faust bodyClass hook
   * @link https://developer.wordpress.org/reference/hooks/body_class/
   */
  useEffect(() => {
    document?.body.classList.add('admin-bar');

    // Cleanup body class when this component unmounts.
    return () => {
      document?.body.classList.remove('admin-bar');
    };
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
