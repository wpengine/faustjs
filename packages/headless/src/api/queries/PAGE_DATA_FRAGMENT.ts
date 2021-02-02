import { gql } from '@apollo/client';

const PAGE_DATA_FRAGMENT = gql`
  fragment pageData on Page {
    id
    slug
    title
    content
    isPreview
    isRevision
    isFrontPage
    isPostsPage
    uri
    status
    featuredImage {
      node {
        id
        altText
        sourceUrl
      }
    }
  }
`;

export { PAGE_DATA_FRAGMENT };
