/**
 * @file Seed query implementation for fetching WordPress data
 */

import { SEED_QUERY } from '@faustjs/template-hierarchy';
import { print } from 'graphql';
import { getGraphQLClient } from './config.js';

/**
 * Execute the seed query to get WordPress data for a URI
 * @param {import('./types.js').SeedQueryOptions} options - Query options
 * @returns {Promise<{data?: any, error?: string}>} The query result
 */
export async function getSeedQuery({ uri, graphqlClient }) {
	const client = getGraphQLClient(graphqlClient);

	try {
		// Convert DocumentNode to string for fetch-based clients
		const queryString = print(SEED_QUERY);
		const result = await client.request(queryString, { uri });
		return result;
	} catch (error) {
		return { error: `Failed to execute seed query: ${error.message}` };
	}
}
