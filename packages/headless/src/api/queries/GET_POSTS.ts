import { gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
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
    }
  }
`;

export { GET_POSTS };
