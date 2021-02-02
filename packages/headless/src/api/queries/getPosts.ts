import { DocumentNode, gql } from '@apollo/client';
import { 
  LIST_POST_DATA_FRAGMENT
} from './LIST_POST_DATA_FRAGMENT';
import { 
  PAGE_INFO_DATA_FRAGMENT
} from './PAGE_INFO_DATA_FRAGMENT';

export interface ListPostOptions {
  listPostData?: DocumentNode;
  variables?: WPGraphQL.RootQueryPostsArgs;
}

export function getPostsQuery({ listPostData }: ListPostOptions = {}) {
  return gql`
    ${listPostData ?? LIST_POST_DATA_FRAGMENT}
    ${PAGE_INFO_DATA_FRAGMENT}
    query GetPosts($where: RootQueryToPostConnectionWhereArgs, $after: String, $before: String, $first: Int, $last: Int) {
      posts(where: $where, after: $after, before: $before, first: $first, last: $last) {
        pageInfo {
          ...pageInfoData
        }
        nodes {
          ...listPostData
        }
      }
    }
  `;
}
