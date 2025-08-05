/**
 * @file Global configuration for @faustjs/astro
 */

/** @type {import('./types.js').GraphQLClient | null} */
let configuredClient = null;

/**
 * Set the global GraphQL client
 * @param {import('./types.js').GraphQLClient} client - The GraphQL client to use globally
 */
export function setGraphQLClient(client) {
	configuredClient = client;
}

/**
 * Get the configured GraphQL client
 * @returns {import('./types.js').GraphQLClient | null} The configured client or null
 */
export function getConfiguredClient() {
	return configuredClient;
}

/**
 * Create a default GraphQL client using fetch
 * @param {string} [wordpressUrl] - WordPress URL to use, if not provided will try to get from environment
 * @returns {import('./types.js').GraphQLClient} A basic GraphQL client
 */
export function createDefaultClient(wordpressUrl) {
	// Allow passing URL directly or get from Astro environment
	const url = wordpressUrl || import.meta.env.WORDPRESS_URL;

	if (!url) {
		throw new Error(
			'WORDPRESS_URL environment variable is required when no GraphQL client is provided. ' +
				'Make sure WORDPRESS_URL is set in your .env file.',
		);
	}

	return {
		async request(query, variables = {}) {
			try {
				const response = await fetch(`${url}/index.php?graphql`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ query, variables }),
				});

				if (!response.ok) {
					return { error: `GraphQL request failed: ${response.status}` };
				}

				const result = await response.json();
				return { data: result.data, error: result.errors?.[0]?.message };
			} catch (error) {
				return { error: error.message };
			}
		},
	};
}

/**
 * Get a GraphQL client with fallback priority
 * @param {import('./types.js').GraphQLClient} [providedClient] - Client provided directly
 * @returns {import('./types.js').GraphQLClient} The client to use
 */
export function getGraphQLClient(providedClient) {
	// Priority: provided client > configured client > default client
	return providedClient || getConfiguredClient() || createDefaultClient();
}
