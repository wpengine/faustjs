import { gql } from '@apollo/client';

export const GET_URI_INFO = gql`
  query GetUriInfo($uri: String!) {
    nodeByUri(uri: $uri) {
      id
      templates
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
