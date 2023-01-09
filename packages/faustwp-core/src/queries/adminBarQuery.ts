import { gql } from '@apollo/client';

export const ADMIN_BAR_QUERY = gql`
  query AdminBarQuery {
    generalSettings {
      title
      description
    }
    comments(where: { includeUnapproved: [], status: null }) {
      edges {
        node {
          id
          status
          content(format: RAW)
        }
      }
    }
  }
`;
