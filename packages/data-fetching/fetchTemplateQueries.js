/**
 * @file Fetches template-specific GraphQL queries for FaustJS templates
 */

import { print } from 'graphql';

/**
 * @param {Object} params
 * @param {Object.<string, Array>} params.availableQueries - Map of template IDs to their queries
 * @param {Object} params.templateData - Template data with seedNode and template info
 * @param {Object} params.client - GraphQL client with request method
 * @param {Object} [params.extraVariables={}] - Additional variables for queries
 * @param {string} [params.locale] - Locale for internationalization
 * @returns {Promise<Array|undefined>} Array of query results or undefined
 */
export async function fetchTemplateQueries({
	availableQueries,
	templateData,
	client,
	extraVariables,
	locale,
}) {
	if (!client) {
		throw new Error('GraphQL client is required to fetch template queries');
	}

	// Get the template queries for the current template
	const templateQueries = availableQueries[templateData?.template?.id];

	if (templateQueries) {
		const queryCalls = templateQueries.map(({ query, variables }) => {
			const queryVariables = variables
				? variables(
						templateData.seedNode,
						{
							asPreview: false,
							locale,
						},
						extraVariables,
				  )
				: undefined;

			return client.request(print(query), queryVariables);
		});

		const results = await Promise.all(queryCalls);

		return results.reduce((acc, result, index) => {
			const queryName = templateQueries[index].name ?? `query${index + 1}`;

			return {
				...acc,
				[queryName]: result,
			};
		}, {});
	}

	return null;
}
