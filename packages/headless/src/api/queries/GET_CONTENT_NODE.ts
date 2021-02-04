import { gql } from '@apollo/client';

const GET_CONTENT_NODE = gql`
  query GetContentNode(
    $id: ID!
    $idType: ContentNodeIdTypeEnum
    $asPreview: Boolean
  ) {
    contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
      ... on Post {
        id
        slug
        title
        content
        isRevision
        isPreview
        isSticky
        excerpt
        templates
        uri
        status
        featuredImage {
          node {
            id
            altText
            sourceUrl
          }
        }
        preview {
          node {
            id
            slug
            title
            content
            isRevision
            isPreview
            isSticky
            excerpt
            uri
            templates
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
        enqueuedStylesheets {
          nodes {
            src
            handle
          }
        }
      }
      ... on Page {
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
        templates
        featuredImage {
          node {
            id
            altText
            sourceUrl
          }
        }
        preview {
          node {
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
            templates
            featuredImage {
              node {
                id
                altText
                sourceUrl
              }
            }
          }
        }
        enqueuedStylesheets {
          nodes {
            src
            handle
          }
        }
      }
    }
  }
`;

export { GET_CONTENT_NODE };
