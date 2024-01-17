import { gql, useQuery } from '@apollo/client';
import cookies from 'js-cookie';
import React, { useEffect, useMemo, useState } from 'react';
import { getApolloAuthClient } from '../../client.js';
import { useAuth } from '../../hooks/useAuth.js';
import { getWpUrl } from '../../lib/getWpUrl.js';
import { SeedNode } from '../../queries/seedQuery.js';
import { hooks } from '../../wpHooks/index.js';
import { ToolbarNode } from './ToolbarNode.js';
import { Edit } from './nodes/Edit.js';
import { GraphiQL } from './nodes/GraphiQL.js';
import { MyAccount } from './nodes/MyAccount.js';
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
  seedNode?: SeedNode;
};

/**
 * Toolbar props.
 */
export type ToolbarProps = {
  seedNode?: SeedNode | null;
};
/**
 * The component to actually render the toolbar. At this point we can assume
 * there is a proper authenticated user.
 */
export function AuthenticatedToolbar({ seedNode }: ToolbarProps) {
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

  /**
   * Handle Toolbar nodes.
   */
  useEffect(() => {
    const filteredNodes = hooks.applyFilters('toolbarNodes', coreToolbarNodes, {
      seedNode,
    }) as FaustToolbarNodes;

    const uniqueIds = new Set(filteredNodes.map((nodes) => nodes.id));

    if (uniqueIds.size < filteredNodes.length) {
      throw new Error('Toolbar Nodes must have unique keys.');
    }

    setToolbarNodes(filteredNodes);
  }, [coreToolbarNodes, seedNode]);

  /**
   * Handle adding `admin-bar` body class on render.
   *
   * This could eventually be handled with a Faust bodyClass hook
   * @link https://developer.wordpress.org/reference/hooks/body_class/
   */
  useEffect(() => {
    document?.body.classList.add('admin-bar');

    // Cleanup body class when this component unmounts.
    // eslint-disable-next-line consistent-return
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

  return (
    <div id="wpadminbar" className="nojq">
      <div
        id="wp-toolbar"
        className="quicklinks"
        role="navigation"
        aria-label="Toolbar">
        <ul
          id="wp-admin-bar-root-default"
          className="ab-top-menu"
          aria-label="primary toolbar menu items">
          {primaryNodes.map(({ component, id, ...props }: FaustToolbarNode) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ToolbarNode key={id} id={id} {...props}>
              {component}
            </ToolbarNode>
          ))}
        </ul>
        <ul
          id="wp-admin-bar-top-secondary"
          className="ab-top-secondary ab-top-menu"
          aria-label="secondary toolbar menu items">
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

/**
 * With an authenticated user, make a request for the viewer in WPGraphQL and
 * get the user' preference whether to display the toolbar.
 */
export function ToolbarAwaitUser({ seedNode }: ToolbarProps) {
  const client = getApolloAuthClient();
  const { data, error } = useQuery(
    gql`
      {
        viewer {
          shouldShowFaustToolbar
        }
      }
    `,
    { client },
  );

  /**
   * If the above query for "shouldShowFaustToolbar" fails, it likely means
   * that the user doesn't have a version of the FaustWP plugin installed where
   * this field was made available. In that case, don't throw an error, and
   * just continue with showing the toolbar.
   */
  if (error) {
    return <AuthenticatedToolbar seedNode={seedNode} />;
  }

  if (!data) {
    return null;
  }

  if (data.viewer.shouldShowFaustToolbar === false) {
    return null;
  }

  return <AuthenticatedToolbar seedNode={seedNode} />;
}

/**
 * Renders a Toolbar that is based on WordPress' own toolbar.
 */
export function Toolbar({ seedNode }: ToolbarProps) {
  const hasAuthenticatedUser = cookies.get(`${getWpUrl()}-has-rt`);

  const { isAuthenticated } = useAuth({
    strategy: 'redirect',
    /**
     * If the hasAuthenticatedUser cookie exists and it's "0", skip
     * running the useAuth hook.
     */
    skip: hasAuthenticatedUser === '0',
  });

  if (isAuthenticated !== true) {
    return null;
  }

  return <ToolbarAwaitUser seedNode={seedNode} />;
}
