/**
 * @file Main entry point for the template-hierarchy package
 */

// Import types for JSDoc usage
import './types.js';

// Export template utilities
export { getPossibleTemplates, getTemplate } from './templates.js';

// Export GraphQL query
export { SEED_QUERY } from './seedQuery.js';

// Export query as string for clients that need it
export const SEED_QUERY_STRING = `
	query GetSeedNode($uri: String! = "") {
		nodeByUri(uri: $uri) {
			__typename
			id
			uri
			... on Post {
				id
				slug
				postId
				title
				content
				date
				isSticky
				categories {
					nodes {
						id
						name
						slug
					}
				}
				tags {
					nodes {
						id
						name
						slug
					}
				}
			}
			... on Page {
				id
				slug
				pageId
				title
				content
			}
			... on Category {
				id
				slug
				categoryId
				name
				count
			}
			... on Tag {
				id
				slug
				tagId
				name
				count
			}
		}
	}
`;
