/**
 * @file Template hierarchy resolution utilities
 */

import {
	getTemplate,
	getPossibleTemplates,
	getSeedQuery,
} from '@faustjs/template-hierarchy';
import { getGraphQLClient } from '@faustjs/graphql';
import { error } from '@sveltejs/kit';

/**
 * Resolve a URI to template data using WordPress template hierarchy
 * @param {import('../template-hierarchy/types.js').UriToTemplateOptions} options - The options object
 * @returns {Promise<import('../template-hierarchy/types.js').TemplateData>} The resolved template data
 */
export async function uriToTemplate({ fetch, uri, graphqlClient }) {
	/** @type {import('../template-hierarchy/types.js').TemplateData} */
	const returnData = {
		uri,
		seedQuery: undefined,
		availableTemplates: undefined,
		possibleTemplates: undefined,
		template: undefined,
		seedNode: undefined,
	};

	// Get the GraphQL client - use provided one or get configured one
	const client = getGraphQLClient(graphqlClient);
	const { data, error: errorMessage } = await getSeedQuery({
		uri,
		graphqlClient: client,
	});

	returnData.seedQuery = { data, error: errorMessage };

	const seedNode = data?.nodeByUri || data?.contentNode;

	returnData.seedNode = seedNode ?? error;

	if (errorMessage) {
		console.error('Error fetching seedQuery:', errorMessage);
		throw error(500, 'Error fetching seedQuery');
	}

	if (!data?.nodeByUri) {
		console.error('HTTP/404 - Not Found in WordPress:', uri);
		throw error(404, 'Not Found');
	}

	const resp = await fetch(`/api/templates?uri=${uri}`);

	if (!resp.ok) {
		console.error('Error fetching available templates:', resp.statusText);
		throw error(500, 'Error fetching available templates');
	}

	const availableTemplates = await resp.json();

	returnData.availableTemplates = availableTemplates;

	if (!availableTemplates || availableTemplates.length === 0) {
		console.error('No templates found');
		throw error(500, 'No available templates');
	}

	const possibleTemplates = getPossibleTemplates(data.nodeByUri);

	returnData.possibleTemplates = possibleTemplates;

	if (!possibleTemplates || possibleTemplates.length === 0) {
		console.error('No possible templates found');
		throw error(500, 'No possible templates for this URI');
	}

	const templateId = getTemplate(
		availableTemplates.map((template) => template.id || template),
		possibleTemplates,
	);

	const template = availableTemplates.find((t) => (t.id || t) === templateId);

	returnData.template = template;

	if (!template) {
		console.error('No template found for route');
		throw error(500, 'No template found for this URI');
	}

	return returnData;
}
