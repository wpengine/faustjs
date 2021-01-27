import { gql } from '@apollo/client';

const GENERAL_SETTINGS = gql`
  query GeneralSettings {
    generalSettings {
      title
      description
    }
  }
`;

export { GENERAL_SETTINGS };
