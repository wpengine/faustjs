import gql from 'graphql-tag';

export const GET_POSTS = gql`
	query GetPosts {
		posts {
			edges {
				node {
					id
					title
					content
					date
					uri
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
					author {
						node {
							name
						}
					}
				}
			}
		}
	}
`;
