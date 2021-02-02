import { gql } from '@apollo/client';

export const PAGE_INFO_DATA_FRAGMENT = gql`
  fragment pageInfoData on WPPageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;
