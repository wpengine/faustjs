const { default: gql } = require('graphql-tag');

export const GET_LAYOUT = gql`
	query GetLayout {
		generalSettings {
			title
			description
		}
	}
`;
