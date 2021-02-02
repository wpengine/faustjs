import { gql } from '@apollo/client';

const LIST_POST_DATA_FRAGMENT = gql`
  fragment listPostData on Post {
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
  }
`;

export { LIST_POST_DATA_FRAGMENT };
