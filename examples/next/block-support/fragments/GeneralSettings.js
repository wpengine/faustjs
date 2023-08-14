import { gql } from '@apollo/client';

export const BlogInfoFragment = gql`
  fragment BlogInfoFragment on GeneralSettings {
    title
    description
  }
`;
