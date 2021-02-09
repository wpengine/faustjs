import { gql } from '@apollo/client';

const GENERAL_SETTINGS = gql`
  query GeneralSettings {
    generalSettings {
      title
      description
      url
    }
  }
`;

export { GENERAL_SETTINGS };
