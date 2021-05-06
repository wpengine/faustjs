import { gql } from '@apollo/client/core';

export const GET_URI_INFO = gql`
  query GetUriInfo($uri: String!) {
    nodeByUri(uri: $uri) {
      id
      ... on ContentType {
        isFrontPage
        isPostsPage
      }
      conditionalTags {
        isArchive
        isSingular
      }
    }
  }
`;
