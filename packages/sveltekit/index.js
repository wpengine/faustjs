/**
 * @file Sveltekit integration for FaustJS template hierarchy
 */

// Export template utilities
export { uriToTemplate } from './templateHierarchy.js';

// Export GraphQL configuration utilities
export {
	setGraphQLClient,
	getGraphQLClient,
	createDefaultGraphQLClient as createDefaultClient,
} from '@faustjs/graphql';
