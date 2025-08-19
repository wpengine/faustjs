import gql from 'graphql-tag';

export const GET_PAGE = gql`
	query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
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
