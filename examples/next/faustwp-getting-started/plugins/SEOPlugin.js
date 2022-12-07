import React, { ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';
import * as MENUS from '../constants/menus';
import Component from '../wp-templates/front-page';

const YOAST_SEO_QUERY = gql`
  query YoastSEOData($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        seo {
          title
          metaDesc
        }
      }
      ... on Post {
        seo {
          title
          metaDesc
        }
      }
    }
  }
`;

export class SEOPlugin {
  async apply({ addFilter }) {
    addFilter('templateQueries', 'faust', (queries, { seedNode }) => {
      console.log('seednode uri', seedNode.uri);
      return [
        ...queries,
        { query: YOAST_SEO_QUERY, variables: { uri: seedNode.uri } },
      ];
    });

    await addFilter('wphead', 'faust', (elements) => {
      const { data } = useQuery(YOAST_SEO_QUERY, {
        variables: { uri: '/new-page/' },
      });

      console.log(data);

      const title = <title>{data?.nodeByUri?.seo?.title}</title>;
      const metaDesc = (
        <meta property="description" content={data?.nodeByUri?.seo?.metaDesc} />
      );

      return [...elements, title, metaDesc];
    });
  }
}
