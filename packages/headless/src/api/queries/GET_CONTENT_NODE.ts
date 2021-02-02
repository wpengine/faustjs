import { DocumentNode, gql } from '@apollo/client';
import { 
  PAGE_DATA_FRAGMENT
} from './PAGE_DATA_FRAGMENT';
import { 
  POST_DATA_FRAGMENT
} from './POST_DATA_FRAGMENT';

export interface ContentNodeFragments {
  postData?: DocumentNode;
  pageData?: DocumentNode;
}

const GET_CONTENT_NODE = ({ postData, pageData }: ContentNodeFragments = {}) => gql`
  ${postData ?? POST_DATA_FRAGMENT}
  ${pageData ?? PAGE_DATA_FRAGMENT}
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
        enqueuedStylesheets {
          nodes {
            src
            handle
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
