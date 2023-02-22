import React, { useEffect, useMemo, useState } from 'react';
import { Faust, Edit, GraphiQL } from './nodes/index.js';
import { hooks } from '../../wpHooks/index.js';
import { ToolbarItem } from './ToolbarItem.js';
import { SeedNode } from '../../queries/seedQuery.js';
import { useAuth } from '../../hooks/useAuth.js';

/**
 * The available menu locations that nodes can be added to.
 */
export type MenuLocation = 'primary' | 'secondary';

/**
 * A single Faust Toolbar node.
 */
export type FaustToolbarNode = {
  /**
   * The key identifier for this Toolbar Node.
   * Used to create each Toolbar Node's id. `#wp-admin-bar-{key}`
   */
  key: string;

  /**
   * The available menu locations that nodes can be added to.
   */
  location: MenuLocation;

  /**
   * The JSX component to load.
   * This will ultimately be rendered inside of an `<li>`.
   */
  component: React.ReactElement;
};

/**
 * An array of toolbar nodes.
 */
export type FaustToolbarNodes = FaustToolbarNode[];

/**
 * Toolbar context.
 */
export type FaustToolbarContext = {
  seedNode: SeedNode;
};

/**
 * Toolbar props.
 */
export type ToolbarProps = {
  client: React.ReactNode;
  seedNode: SeedNode;
};

/**
 * Renders a Toolbar that is based on WordPress' own toolbar.
 */
export function Toolbar({ client, seedNode }: ToolbarProps) {
  /**
   * Define Toolbar Nodes that should be included by default.
   */
  const coreToolbarNodes: FaustToolbarNodes = useMemo(() => {
    return [
      {
        key: 'faust',
        location: 'primary',
        component: <Faust />,
      },
      {
        key: 'edit',
        location: 'primary',
        component: <Edit seedNode={seedNode} />,
      },
      {
        key: 'graphiql',
        location: 'primary',
        component: <GraphiQL />,
      },
    ];
  }, [seedNode]);

  const [toolbarNodes, setToolbarNodes] = useState(coreToolbarNodes);
  const { isAuthenticated } = useAuth();

  /**
   * Handle Toolbar nodes.
   */
  useEffect(() => {
    const filteredNodes = hooks.applyFilters('toolbarNodes', coreToolbarNodes, {
      client,
      seedNode,
    }) as FaustToolbarNodes;

    const uniqueKeys = new Set(filteredNodes.map((nodes) => nodes.key));

    if (uniqueKeys.size < filteredNodes.length) {
      throw new Error('Toolbar Nodes must have unique keys.');
    }

    setToolbarNodes(filteredNodes);
  }, [coreToolbarNodes, client, seedNode]);

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

  const primaryNodes = toolbarNodes.filter(
    ({ location }) => location === 'primary',
  );
  const secondaryNodes = toolbarNodes.filter(
    ({ location }) => location === 'secondary',
  );

  if (isAuthenticated !== true) {
    return null;
  }

  return (
    <div id="wpadminbar" className="nojq">
      <div
        id="wp-toolbar"
        className="quicklinks"
        role="navigation"
        aria-label="Toolbar">
        <ul id="wp-admin-bar-root-default" className="ab-top-menu">
          {primaryNodes.map(({ key, component }) => (
            <ToolbarItem key={key} id={`wp-admin-bar-${key}`}>
              {component}
            </ToolbarItem>
          ))}
        </ul>
        <ul
          id="wp-admin-bar-top-secondary"
          className="ab-top-secondary ab-top-menu">
          {secondaryNodes.map(({ key, component }) => (
            <ToolbarItem key={key} id={`wp-admin-bar-${key}`}>
              {component}
            </ToolbarItem>
          ))}
        </ul>
      </div>
    </div>
  );
}
