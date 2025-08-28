/**
 * @file Seed query execution utilities
 */

import { SEED_QUERY } from './seedQuery.js';
import { print } from 'graphql';

/**
 * Execute the seed query to fetch WordPress content for a URI
 * @param {import('./types.js').SeedQueryOptions} options - Query options
 * @returns {Promise<import('./types.js').GraphQLResponse>} Query result
 */
export async function getSeedQuery({ uri, id, asPreview, graphqlClient }) {
	if (!graphqlClient) {
		throw new Error('GraphQL client is required for getSeedQuery');
	}

	try {
		const result = await graphqlClient.request(print(SEED_QUERY), {
			uri,
			id,
			asPreview,
		});

		return {
			data: result.data || result,
			error: result.error || null,
		};
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to execute seed query',
		};
	}
}
