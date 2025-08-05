/**
 * @file Seed query utilities for NextJS integration
 */

import { SEED_QUERY } from '@faustjs/template-hierarchy';

/**
 * Default GraphQL client using fetch
 * @param {string} endpoint - GraphQL endpoint URL
 * @param {string} query - GraphQL query string
 * @param {Object} [variables={}] - Query variables
 * @returns {Promise<Object>} GraphQL response
 */
async function defaultGraphQLClient(endpoint, query, variables = {}) {
	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();

		if (result.errors) {
			throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
		}

		return result;
	} catch (error) {
		console.error('GraphQL request failed:', error);
		throw error;
	}
}

/**
 * Build GraphQL endpoint URL from WordPress URL
 * @param {string} wordpressUrl - WordPress site URL
 * @returns {string} GraphQL endpoint URL
 */
function buildGraphQLEndpoint(wordpressUrl) {
	// Remove trailing slash if present
	const baseUrl = wordpressUrl.replace(/\/$/, '');
	return `${baseUrl}/index.php?graphql`;
}

/**
 * Execute the seed query to fetch WordPress content for a URI
 * @param {Object} options - Query options
 * @param {string} options.uri - The URI to fetch content for
 * @param {import('../types.js').GraphQLClient} [options.graphqlClient] - Custom GraphQL client
 * @param {string} [options.wordpressUrl] - WordPress site URL (will append /index.php?graphql)
 * @returns {Promise<{data: Object, error: Error|null}>} Query result
 */
export async function getSeedQuery({ uri, graphqlClient, wordpressUrl }) {
	try {
		let result;

		if (graphqlClient && typeof graphqlClient.request === 'function') {
			// Use custom GraphQL client
			result = await graphqlClient.request(SEED_QUERY, { uri });
		} else {
			// Build endpoint URL from WordPress URL or environment variable
			const wpUrl =
				wordpressUrl ||
				process.env.WORDPRESS_URL ||
				process.env.NEXT_PUBLIC_WORDPRESS_URL;

			if (!wpUrl) {
				throw new Error(
					'No WordPress URL configured. Set WORDPRESS_URL environment variable or provide wordpressUrl option.',
				);
			}

			const endpoint = buildGraphQLEndpoint(wpUrl);
			result = await defaultGraphQLClient(endpoint, SEED_QUERY, { uri });
		}

		return {
			data: result.data || result,
			error: null,
		};
	} catch (error) {
		console.error('Error executing seed query:', error);
		return {
			data: null,
			error: error,
		};
	}
}
