import { gql } from '@apollo/client';

export interface SeedNode {
  __typename?: string;
  uri?: string;
  id?: string;
  databaseId?: string;
  mimeType?: string;
  name?: string;
  isFrontPage?: boolean;
  isPostsPage?: boolean;
  isTermNode?: boolean;
  slug?: string;
  taxonomyName?: string;
  isContentNode?: boolean;
  contentType?: {
    node?: {
      name?: string;
    };
  };
  template?: {
    templateName?: string;
  };
  userId?: number;
}

export const SEED_QUERY = gql`
  query GetNodeByUri($uri: String!) {
    node: nodeByUri(uri: $uri) {
      ...NodeByUri
    }
  }

  fragment NodeByUri on UniformResourceIdentifiable {
    __typename
    uri
    id
    ...DatabaseIdentifier
    ...ContentType
    ...User
    ...TermNode
    ...ContentNode
    ...MediaItem
  }

  fragment DatabaseIdentifier on DatabaseIdentifier {
    databaseId
  }

  fragment MediaItem on MediaItem {
    id
    mimeType
  }

  fragment ContentType on ContentType {
    name
    isFrontPage
    isPostsPage
  }

  fragment TermNode on TermNode {
    isTermNode
    slug
    taxonomyName
  }

  fragment ContentNode on ContentNode {
    isContentNode
    slug
    contentType {
      node {
        name
      }
    }
    template {
      templateName
    }
  }

  fragment User on User {
    name
    userId
    databaseId
  }
`;
