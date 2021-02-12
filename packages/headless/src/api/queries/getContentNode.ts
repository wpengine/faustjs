import { DocumentNode, gql } from '@apollo/client';
import { PAGE_DATA_FRAGMENT } from './PAGE_DATA_FRAGMENT';
import { POST_DATA_FRAGMENT } from './POST_DATA_FRAGMENT';

export interface ContentNodeOptions<
  Args extends WPGraphQL.RootQueryContentNodeArgs = WPGraphQL.RootQueryContentNodeArgs
> {
  fragments?: {
    postData?: DocumentNode;
    pageData?: DocumentNode;
  };
  variables?: Args;
}

export function getContentNodeQuery({ fragments }: ContentNodeOptions = {}) {
  return gql`
    ${fragments?.postData ??
    gql`
      ${POST_DATA_FRAGMENT}
    `}
    ${fragments?.pageData ??
    gql`
      ${PAGE_DATA_FRAGMENT}
    `}
    query GetContentNode(
      $id: ID!
      $idType: ContentNodeIdTypeEnum
      $asPreview: Boolean
    ) {
      contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
        ... on Post {
          ...postData
          preview {
            node {
              ...postData
            }
          }
        }
        ... on Page {
          ...pageData
          preview {
            node {
              ...pageData
            }
          }
        }
      }
    }
  `;
}
