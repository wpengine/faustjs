import React, { useEffect, useMemo, useState } from 'react';
import { Edit } from './nodes/Edit.js';
import { GraphiQL } from './nodes/GraphiQL.js';
import { MyAccount } from './nodes/MyAccount.js';
import { hooks } from '../../wpHooks/index.js';
import { ToolbarNode } from './ToolbarNode.js';
import { SeedNode } from '../../queries/seedQuery.js';
import { useAuth } from '../../hooks/useAuth.js';
import { SiteName } from './nodes/SiteName.js';

/**
 * The available menu locations that nodes can be added to.
 */
export type MenuLocation = 'primary' | 'secondary';

/**
 * A single Faust Toolbar node.
 */
export type FaustToolbarNode = {
  /**
   * The identifier for this Toolbar Node.
   * Used to create each Toolbar Node's id. `#wp-admin-bar-{id}`
   */
  id: string;

  /**
   * The available menu locations that nodes can be added to.
   */
  location: MenuLocation;

  /**
   * The JSX component to load.
   * This will be rendered inside of an `<li>`.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
   */
  component: React.ReactElement;

  /**
   * Additional classNames for the Toolbar Node `<li></li>`.
   */
  additionalClassNames?: string;
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
  seedNode: SeedNode;
};

/**
 * Renders a Toolbar that is based on WordPress' own toolbar.
 */
export function Toolbar({ seedNode }: ToolbarProps) {
  /**
   * Define Toolbar Nodes that should be included by default.
   */
  const coreToolbarNodes: FaustToolbarNodes = useMemo(() => {
    return [
      {
        id: 'site-name',
        location: 'primary',
        component: <SiteName />,
      },
      {
        id: 'edit',
        location: 'primary',
        component: <Edit seedNode={seedNode} />,
      },
      {
        id: 'graphiql',
        location: 'primary',
        component: <GraphiQL />,
      },
      {
        id: 'my-account',
        location: 'secondary',
        component: <MyAccount />,
        additionalClassNames: 'with-avatar',
      },
    ];
  }, [seedNode]);

  const [toolbarNodes, setToolbarNodes] = useState(coreToolbarNodes);
  const { isAuthenticated } = useAuth();

  /**
   * Handle Toolbar nodes.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const filteredNodes = hooks.applyFilters('toolbarNodes', coreToolbarNodes, {
      seedNode,
    }) as FaustToolbarNodes;

    const uniqueIds = new Set(filteredNodes.map((nodes) => nodes.id));

    if (uniqueIds.size < filteredNodes.length) {
      throw new Error('Toolbar Nodes must have unique keys.');
    }

    setToolbarNodes(filteredNodes);
  }, [coreToolbarNodes, seedNode, isAuthenticated]);

  /**
   * Handle adding `admin-bar` body class on render.
   *
   * This could eventually be handled with a Faust bodyClass hook
   * @link https://developer.wordpress.org/reference/hooks/body_class/
   */
  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    document?.body.classList.add('admin-bar');

    // Cleanup body class when this component unmounts.
    return () => {
      document?.body.classList.remove('admin-bar');
      return undefined;
    };
  }, [isAuthenticated]);

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
          {primaryNodes.map(({ component, id, ...props }: FaustToolbarNode) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ToolbarNode key={id} id={id} {...props}>
              {component}
            </ToolbarNode>
          ))}
        </ul>
        <ul
          id="wp-admin-bar-top-secondary"
          className="ab-top-secondary ab-top-menu">
          {secondaryNodes.map(
            ({ component, id, ...props }: FaustToolbarNode) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <ToolbarNode key={id} id={id} {...props}>
                {component}
              </ToolbarNode>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
