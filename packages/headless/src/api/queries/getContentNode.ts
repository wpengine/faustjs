import { DocumentNode, gql } from '@apollo/client';
import { 
  PAGE_DATA_FRAGMENT
} from './PAGE_DATA_FRAGMENT';
import { 
  POST_DATA_FRAGMENT
} from './POST_DATA_FRAGMENT';

export interface ContentNodeFragments {
  fragments?: {
    postData?: DocumentNode;
    pageData?: DocumentNode;
  };
}

export function getContentNodeQuery({ fragments }: ContentNodeFragments = {}) {
  return gql`
    ${fragments?.postData ?? POST_DATA_FRAGMENT}
    ${fragments?.pageData ?? PAGE_DATA_FRAGMENT}
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
