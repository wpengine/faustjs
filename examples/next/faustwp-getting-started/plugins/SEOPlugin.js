import React, { ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';

const YOAST_SEO_QUERY = gql`
  fragment PostTypeSEOFields on PostTypeSEO {
    title
    metaDesc
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
    }
  }

  fragment ArchiveSEOFields on TaxonomySEO {
    title
    metaDesc
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
    }
  }

  query YoastSEOData($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        seo {
          ...PostTypeSEOFields
        }
      }
      ... on Post {
        seo {
          ...PostTypeSEOFields
        }
      }
      ... on Category {
        seo {
          ...ArchiveSEOFields
        }
      }
      ... on Tag {
        seo {
          ...ArchiveSEOFields
        }
      }
    }
  }
`;

export class SEOPlugin {
  apply({ addFilter }) {
    addFilter('templateQueries', 'faust', (queries, { seedNode }) => {
      return [
        ...queries,
        { query: YOAST_SEO_QUERY, variables: { uri: seedNode.uri } },
      ];
    });

    addFilter('wphead', 'faust', (elements, { seedNode }) => {
      const { data } = useQuery(YOAST_SEO_QUERY, {
        variables: { uri: seedNode.uri },
      });

      const newElements = [...elements];

      const title = data?.nodeByUri?.seo?.title;
      const desc = data?.nodeByUri?.seo?.metaDesc;
      const ogTitle = data?.nodeByUri?.seo?.opengraphTitle;
      const ogDesc = data?.nodeByUri?.seo?.opengraphDescription;
      const ogImage = data?.nodeByUri?.seo?.opengraphImage?.sourceUrl;

      if (title) {
        newElements.push(<title>{title}</title>);
        newElements.push(<meta name="title" content={title} />);
      }

      if (desc) {
        newElements.push(<meta property="description" content={desc} />);
      }

      if (ogTitle) {
        newElements.push(<meta property="og:title" content={ogTitle} />);
      }

      if (ogDesc) {
        newElements.push(<meta property="og:description" content={ogDesc} />);
      }

      if (ogImage) {
        newElements.push(<meta property="og:image" content={ogImage} />);
      }

      return newElements;
    });
  }
}
