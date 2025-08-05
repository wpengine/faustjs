/**
 * @file Astro integration for FaustJS template hierarchy
 */

// Export template utilities
export { uriToTemplate } from './templateHierarchy.js';

// Export template collection
export { createTemplateCollection, templateSchema } from './templateLoader.js';

// Export configuration utilities
export {
	setGraphQLClient,
	getConfiguredClient,
	createDefaultClient,
} from './config.js';

// TODO: Implement Astro integration
export function faustjs(options = {}) {
	return {
		name: '@faustjs/astro',
		hooks: {
			// TODO: Add Astro integration hooks
		},
	};
}
