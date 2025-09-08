import gql from 'graphql-tag';

export const GET_POST = gql`
	query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
		post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			date
			author {
				node {
					name
				}
			}
			featuredImage {
				node {
					id
					sourceUrl
					altText
					mediaDetails {
						width
						height
					}
				}
			}
		}
	}
`;
