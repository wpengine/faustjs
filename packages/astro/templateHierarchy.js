/**
 * @file Template hierarchy resolution for Astro using WordPress data
 */

import { getCollection, getEntry } from 'astro:content';
import {
	getTemplate,
	getPossibleTemplates,
	getSeedQuery,
} from '@faustjs/template-hierarchy';
import { getGraphQLClient } from '@faustjs/graphql';

console.log(
	'🚀 Astro templateHierarchy.js loaded at:',
	new Date().toISOString(),
);

/**
 * Resolve a URI to template data using WordPress template hierarchy
 * @param {import('@faustjs/template-hierarchy').UriToTemplateBaseParams & { graphqlClient?: import('./types.js').GraphQLClient }} options - Resolution options
 * @returns {Promise<import('@faustjs/template-hierarchy').TemplateData>} The resolved template data
 */
export async function uriToTemplate({ uri, graphqlClient }) {
	/** @type {import('@faustjs/template-hierarchy').TemplateData} */
	const returnData = {
		uri,
		seedQuery: undefined,
		availableTemplates: undefined,
		possibleTemplates: undefined,
		template: undefined,
	};

	// Get the GraphQL client - use provided one or get configured one
	const client = getGraphQLClient(graphqlClient);
	const { data, error } = await getSeedQuery({ uri, graphqlClient: client });

	returnData.seedQuery = { data, error };

	if (error) {
		console.error('Error fetching seedQuery:', error);
		return returnData;
	}

	if (!data.nodeByUri) {
		console.error('HTTP/404 - Not Found in WordPress:', uri);

		returnData.template = { id: '404 Not Found', path: '/404' };

		return returnData;
	}

	const availableTemplates = await getCollection('templates');

	returnData.availableTemplates = availableTemplates;

	if (!availableTemplates || availableTemplates.length === 0) {
		console.error('No templates found');
		return returnData;
	}

	const possibleTemplates = getPossibleTemplates(data.nodeByUri);

	returnData.possibleTemplates = possibleTemplates;

	if (!possibleTemplates || possibleTemplates.length === 0) {
		console.error('No possible templates found');
		return returnData;
	}

	const templateId = getTemplate(
		availableTemplates.map((template) => template.data.id),
		possibleTemplates,
	);

	const template = await getEntry('templates', templateId);

	returnData.template = template.data;

	if (!template) {
		console.error('No template found for route');
	}

	return returnData;
}
