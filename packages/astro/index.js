/**
 * @file Astro integration for FaustJS template hierarchy
 */

// Export template utilities
export { uriToTemplate } from './templateHierarchy.js';

// Export template collection
export { createTemplateCollection, templateSchema } from './templateLoader.js';

// Export GraphQL configuration utilities
export {
	setGraphQLClient,
	getGraphQLClient,
	createDefaultGraphQLClient as createDefaultClient,
} from '@faustjs/graphql';
