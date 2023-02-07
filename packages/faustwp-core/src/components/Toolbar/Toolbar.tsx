import React, { useEffect, useState } from 'react';
import { getConfig } from '../../config/index.js';
import { Brand, GraphiQL } from './nodes';
import { hooks } from '../../hooks/index.js';
import { ToolbarItem } from './ToolbarItem.js';

export type ToolbarNodes = React.ReactElement[];

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

  const defaultToolbarNodes = [
    <Brand />,
    <GraphiQL />,
  ];

  const toolbarNodes = hooks.applyFilters('toolbarNodes', defaultToolbarNodes) as ToolbarNodes;

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

  useEffect(() => {
    if (!window) {
      return;
    }

  }, [toolbarNodes])


  return (
    <div id="wpadminbar" className={`${loading ? 'loading' : ''} nojq`}>
      <div
        id="wp-toolbar"
        className="quicklinks"
        role="navigation"
        aria-label="Toolbar"
      >
        <ul id="wp-admin-bar-root-default" className="ab-top-menu">
          {toolbarNodes.map((item, i) => {
            return (
              <ToolbarItem key={i} id={`${i}`}>{item}</ToolbarItem>
            )
          })}
        </ul>
        <ul
          id="wp-admin-bar-top-secondary"
          className="ab-top-secondary ab-top-menu">
        </ul>
      </div>
    </div>
  );
}
