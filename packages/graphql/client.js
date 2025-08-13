/**
 * @file Shared GraphQL client utilities
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
 * Build GraphQL endpoint URL from WordPress URL
 * @param {string} wordpressUrl - WordPress site URL
 * @returns {string} GraphQL endpoint URL
 */
export function buildGraphQLEndpoint(wordpressUrl) {
	// Remove trailing slash if present
	const baseUrl = wordpressUrl.replace(/\/$/, '');
	return `${baseUrl}/index.php?graphql`;
}

/**
 * Create a default GraphQL client using fetch
 * @param {string} wordpressUrl - WordPress URL to use (required)
 * @returns {import('./types.js').GraphQLClient} A basic GraphQL client
 * @throws {Error} If no WordPress URL is provided
 */
export function createDefaultGraphQLClient(wordpressUrl, headers = {}) {
	if (!wordpressUrl) {
		throw new Error(
			'WordPress URL is required to create a default GraphQL client.',
		);
	}

	const endpoint = buildGraphQLEndpoint(wordpressUrl);

	return {
		async request(query, variables = {}) {
			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						...headers,
					},
					body: JSON.stringify({ query, variables }),
				});

				if (!response.ok) {
					console.error();
					return {
						error: `GraphQL request failed: ${response.status}`,
						message: await response.body.text(),
					};
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
 * Get a GraphQL client with fallback priority (no automatic default client creation)
 * @param {import('./types.js').GraphQLClient} [providedClient] - Client provided directly
 * @returns {import('./types.js').GraphQLClient} The client to use
 * @throws {Error} If no client is provided and none is configured
 */
export function getGraphQLClient(providedClient) {
	// Priority: provided client > configured client > error
	const client = providedClient || getConfiguredClient();

	if (!client) {
		throw new Error(
			'No GraphQL client available. Either provide a client directly or set one globally using setGraphQLClient().',
		);
	}

	return client;
}
