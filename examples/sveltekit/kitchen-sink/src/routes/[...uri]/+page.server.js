import {
	createDefaultClient,
	setGraphQLClient,
	uriToTemplate,
} from '@faustjs/sveltekit';
import { WORDPRESS_URL } from '$env/static/private';
import availableQueries from '../../queries/templateQueries/index.js';
import { fetchTemplateQueries } from '@faustjs/data-fetching';

export const load = async (event) => {
	const {
		params: { uri },
		fetch,
	} = event;

	const workingUri = uri || '/';

	const client = createDefaultClient(WORDPRESS_URL);
	setGraphQLClient(client);

	const templateData = await uriToTemplate({
		fetch,
		uri: workingUri,
		graphqlClient: client,
	});

	// Fetch template-specific queries using the same mechanism as Next.js
	let queriesData = null;
	try {
		queriesData = await fetchTemplateQueries({
			availableQueries,
			templateData,
			client,
			locale: templateData?.seedNode?.locale,
		});
	} catch (error) {
		console.error('Error fetching template queries:', error);
		// Don't throw error, just continue with null queriesData
		queriesData = null;
	}

	return {
		uri: workingUri,
		templateData,
		queriesData,
	};
};
