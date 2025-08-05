/**
 * @file Template hierarchy resolution for Astro using WordPress data
 */

import { getCollection, getEntry } from 'astro:content';
import { getTemplate, getPossibleTemplates } from '@faustjs/template-hierarchy';
import { getSeedQuery } from './seedQuery.js';

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

	const { data, error } = await getSeedQuery({ uri, graphqlClient });

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
	returnData.template = await getEntry('templates', templateId)?.data;

	if (!returnData.template) {
		console.error('No template found for route');
	}

	return returnData;
}
