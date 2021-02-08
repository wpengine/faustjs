import { gql } from '@apollo/client';

const POST_DATA_FRAGMENT = gql`
  fragment postData on Post {
    id
    slug
    title
    content
    isRevision
    isPreview
    isSticky
    excerpt
    uri
    status
    featuredImage {
      node {
        id
        altText
        sourceUrl
      }
    }
    enqueuedStylesheets {
      nodes {
        src
        handle
      }
    }
  }
`;

export { POST_DATA_FRAGMENT };
