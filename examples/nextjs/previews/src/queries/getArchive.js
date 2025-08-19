import gql from 'graphql-tag';

export const GET_ARCHIVE = gql`
	query GetArchivePage($uri: String!) {
		nodeByUri(uri: $uri) {
			... on Category {
				name
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
			... on Tag {
				name
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
		}
	}
`;
