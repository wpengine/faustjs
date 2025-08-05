/**
 * @file Configuration utilities for NextJS integration
 */

/**
 * Create a NextJS configuration with WordPress template hierarchy support
 * @param {import('./pages/types.js').NextJSConfig} [options={}] - Configuration options
 * @returns {Object} NextJS configuration object
 */
export function createNextJSConfig(options = {}) {
	const { wordpressUrl, graphqlClient } = options;

	return {
		// Environment variables for WordPress integration
		env: {
			WORDPRESS_URL: wordpressUrl || process.env.WORDPRESS_URL,
		},

		// Template configuration
		templateHierarchy: {
			graphqlClient,
		},
	};
}
