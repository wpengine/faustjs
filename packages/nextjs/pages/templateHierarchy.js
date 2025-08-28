/**
 * @file Template hierarchy resolution for NextJS using WordPress data
 */

import {
	getTemplate,
	getPossibleTemplates,
	getSeedQuery,
} from '@faustjs/template-hierarchy';
import { getGraphQLClient } from '@faustjs/graphql';

/**
 * Resolve a URI to template data using WordPress template hierarchy
 * @param {Object} options - Resolution options
 * @param {string} options.uri - The URI to resolve
 * @param {string[]} options.availableTemplates - Array of available template IDs
 * @param {import('../types.js').GraphQLClient} [options.graphqlClient] - Custom GraphQL client
 * @param {string} [options.wordpressUrl] - WordPress site URL (will append /index.php?graphql)
 * @returns {Promise<import('../types.js').NextJSTemplateData>} The resolved template data
 */
export async function uriToTemplate({
	uri,
	id,
	asPreview,
	availableTemplates,
	graphqlClient,
	wordpressUrl,
}) {
	/** @type {import('../types.js').NextJSTemplateData} */
	const returnData = {
		uri,
		seedQuery: undefined, // TODO remove in favor of seedNode
		availableTemplates: undefined,
		possibleTemplates: undefined,
		template: undefined,
		seedNode: undefined,
	};

	// Get the GraphQL client - use provided one or get configured one
	const client = getGraphQLClient(graphqlClient);
	const { data, error } = await getSeedQuery({
		uri,
		id,
		asPreview,
		graphqlClient: client,
	});

	returnData.seedQuery = { data, error };

	const seedNode = data?.nodeByUri || data?.contentNode;

	returnData.seedNode = seedNode ?? error;

	if (error) {
		console.error('Error fetching seedQuery:', error);
		return returnData;
	}

	if (!seedNode) {
		console.error('HTTP/404 - Not Found in WordPress:', uri);
		return returnData; // Let Next.js handle 404s
	}

	returnData.availableTemplates = availableTemplates;

	if (!availableTemplates || availableTemplates.length === 0) {
		console.error('No templates found');
		return returnData;
	}

	const possibleTemplates = getPossibleTemplates(seedNode);

	returnData.possibleTemplates = possibleTemplates;

	if (!possibleTemplates || possibleTemplates.length === 0) {
		console.error('No possible templates found');
		return returnData;
	}

	const template = getTemplate(availableTemplates, possibleTemplates);

	returnData.template = template ? { id: template } : null;

	if (!returnData.template) {
		console.error('No template found for route');
	}

	return returnData;
}
