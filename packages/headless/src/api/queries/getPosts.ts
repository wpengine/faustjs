import { DocumentNode, gql } from '@apollo/client';
import { 
  LIST_POST_DATA_FRAGMENT
} from './LIST_POST_DATA_FRAGMENT';

export interface ListPostFragments {
  listPostData?: DocumentNode;
}

export function getPostsQuery({ listPostData }: ListPostFragments = {}) {
  return gql`
    ${listPostData ?? LIST_POST_DATA_FRAGMENT}
    query GetPosts {
      posts {
        nodes {
          ...listPostData
        }
      }
    }
  `;
}
