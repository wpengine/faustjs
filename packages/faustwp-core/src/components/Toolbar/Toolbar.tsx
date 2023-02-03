import React, { useEffect } from 'react';
import { getConfig } from '../../config/index.js';
import * as ToolbarNodes from './nodes';

export function Toolbar(props: {
  client: React.ReactNode;
}) {
  const { disableToolbar } = getConfig();

  if (disableToolbar) {
    return <></>;
  }

  const { client } = props;

  // @TODO REMOVE
  const loading = false;
  const data = {};

  /**
   * Handle body class.
   */
  useEffect(() => {
    if (data) {
      document?.body.classList.add('admin-bar');
    } else {
      document?.body.classList.remove('admin-bar');
    }

    return () => document?.body.classList.remove('admin-bar');
  }, [data]);

  return (
    <div id="wpadminbar" className={`${loading ? 'loading' : 'loading'} nojq`}>
      <div
        id="wp-toolbar"
        className="quicklinks"
        role="navigation"
        aria-label="Toolbar">
        <ul id="wp-admin-bar-root-default" className="ab-top-menu">
          <ToolbarNodes.Brand />
          <ToolbarNodes.GraphiQL />
        </ul>
        <ul
          id="wp-admin-bar-top-secondary"
          className="ab-top-secondary ab-top-menu">
        </ul>
      </div>
    </div>
  );
}
