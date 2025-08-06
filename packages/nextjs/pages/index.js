/**
 * @file Pages Router specific exports for @faustjs/nextjs
 */

// Import types for JSDoc usage
import './types.js';

// Export template hierarchy utilities
export { uriToTemplate } from './templateHierarchy.js';

// Export GraphQL client configuration
// Export GraphQL client configuration
export {
	setGraphQLClient,
	getGraphQLClient,
	createDefaultGraphQLClient as createDefaultClient,
} from '@faustjs/graphql';
