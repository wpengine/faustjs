/**
 * @file Template hierarchy resolution utilities
 */

import {
	getTemplate,
	getPossibleTemplates,
} from '../template-hierarchy/templates.js';
import { SEED_QUERY } from '../template-hierarchy/seedQuery.js';
import { client } from './client.js';
import { error } from '@sveltejs/kit';
import '../template-hierarchy/types.js'; // Import central type definitions

/**
 * Resolve a URI to template data using WordPress template hierarchy
 * @param {import('../template-hierarchy/types.js').UriToTemplateOptions} options - The options object
 * @returns {Promise<import('../template-hierarchy/types.js').TemplateData>} The resolved template data
 */
export async function uriToTemplate({ fetch, uri }) {
	const { data: seedQueryData, error: errorMessage } = await client.query(
		SEED_QUERY,
		{ uri },
		{ fetch },
	);

	if (errorMessage) {
		console.error('Error fetching seedQuery:', error);
		throw error(500, 'Error fetching seedQuery');
	}

	if (!seedQueryData?.nodeByUri) {
		console.error('HTTP/404 - Not Found in WordPress:', uri);
		throw error(404, 'Not Found');
	}

	const resp = await fetch(`/api/templates?uri=${uri}`);

	if (!resp.ok) {
		console.error('Error fetching available templates:', resp.statusText);

		throw error(500, 'Error fetching available templates');
	}

	const availableTemplates = await resp.json();

	if (!availableTemplates || availableTemplates.length === 0) {
		console.error('No templates found');

		throw error(500, 'No available templates');
	}

	const possibleTemplates = getPossibleTemplates(seedQueryData.nodeByUri);

	if (!possibleTemplates || possibleTemplates.length === 0) {
		console.error('No possible templates found');
		throw error(500, 'No possible templates for this URI');
	}
	const template = getTemplate(availableTemplates, possibleTemplates);

	if (!template) {
		console.error('No template not found for route');
		throw error(500, 'No template found for this URI');
	}

	return {
		uri,
		seedQuery: seedQueryData,
		availableTemplates,
		possibleTemplates,
		template,
	};
}
