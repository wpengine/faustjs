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
  query GetSeedNode(
    $id: ID! = 0
    $uri: String! = ""
    $asPreview: Boolean = false
  ) {
    ... on RootQuery @skip(if: $asPreview) {
      nodeByUri(uri: $uri) {
        __typename
        ...GetNode
      }
    }
    ... on RootQuery @include(if: $asPreview) {
      contentNode(id: $id, idType: DATABASE_ID, asPreview: true) {
        __typename
        ...GetNode
      }
    }
  }

  fragment GetNode on UniformResourceIdentifiable {
    __typename
    uri
    id
    ...DatabaseIdentifier
    ...ContentType
    ...User
    ...TermNode
    ...ContentNode
    ...MediaItem
    ...Page
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

    # This is currently broken. The home page (blog page) can not be
    # resolved when set to a custom page until the below issue is resolved.
    # Link: https://github.com/wp-graphql/wp-graphql/issues/2514
    isPostsPage
  }

  fragment Page on Page {
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
