import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { flatListToHierarchical } from '../utils/flatListToHierarchical';
import * as Nodes from './nodes';

const query = gql`
    query questions {
        questions {
            id
            path @client
        }
    }
`;

export function FaustAdminBar(props: any) {
  const [ hoveredItem, setHoveredItem ] = useState(null);
  const { data } = useQuery(query);

  // Handle body class.
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

  const hierarchicalItems = flatListToHierarchical(data)

  return (
    <div id="wpadminbar" className="nojq">
      <div id="wp-toolbar" className="quicklinks" role="navigation" aria-label="Toolbar">
        <ul id="wp-admin-bar-root-default" className="ab-top-menu">
          <Nodes.Brand />
          <Nodes.Comments />
          <Nodes.GraphiQL />
        </ul>
      </div>
    </div>
  );
}
