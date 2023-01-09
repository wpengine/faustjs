import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ADMIN_BAR_QUERY } from '../queries/adminBarQuery.js';
import * as AdminBarNode from './nodes';

export function FaustAdminBar(props: any) {
  const { loading, error, data } = useQuery(ADMIN_BAR_QUERY);

  useEffect(() => {
    if (data) {
      document?.body.classList.add('admin-bar');
    } else {
      document?.body.classList.remove('admin-bar');
    }

    return () => {
      document?.body.classList.remove('admin-bar');
    };
  }, [data]);

  const siteName = data?.generalSettings.title;
  const commentsInModeration = data?.comments.edges.length;

  return (
    <div id="wpadminbar" className="nojq">
      <div id="wp-toolbar" className="quicklinks" role="navigation" aria-label="Toolbar">
        <ul id="wp-admin-bar-root-default" className="ab-top-menu">
          <AdminBarNode.Brand />
          <AdminBarNode.SiteName siteName={siteName} />
          <AdminBarNode.Comments commentsInModeration={commentsInModeration} />
          <AdminBarNode.Edit postId={1} />
          <AdminBarNode.GraphiQL />
        </ul>
        <ul id="wp-admin-bar-top-secondary" className="ab-top-secondary ab-top-menu">
          <AdminBarNode.MyAccount />
        </ul>
      </div>
    </div>
  );
}
