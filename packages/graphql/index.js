/**
 * @file Main entry point for @faustjs/graphql
 */

// Import types for JSDoc usage
import './types.js';

// Export GraphQL client utilities
export {
	setGraphQLClient,
	getGraphQLClient,
	createDefaultGraphQLClient,
	buildGraphQLEndpoint,
} from './client.js';
