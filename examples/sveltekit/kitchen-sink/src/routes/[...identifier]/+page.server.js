import {
	createDefaultClient,
	setGraphQLClient,
	uriToTemplate,
} from '@faustjs/sveltekit';
import { WORDPRESS_URL } from '$env/static/private';
import { WP_PREVIEW_SECRET } from '$env/static/private';
import availableQueries from '../../queries/templateQueries/index.js';
import { fetchTemplateQueries } from '@faustjs/data-fetching';
import { getAuthString } from '../../utils/getAuthString.js';

export const load = async (event) => {
	const {
		params: { identifier },
		url,
		fetch,
	} = event;

	const searchParams = url?.searchParams;

	// Determine if we are in preview mode based on the URL parameter and the secret
	const isPreview =
		searchParams.get('preview') === 'true' &&
		WP_PREVIEW_SECRET === searchParams.get('secret');

	const headers = isPreview ? { Authorization: getAuthString() } : undefined;

	const client = createDefaultClient(WORDPRESS_URL, headers);
	setGraphQLClient(client);

	const variables = isPreview
		? {
				id: identifier,
				asPreview: true,
		  }
		: { uri: identifier || '/' };

	const templateData = await uriToTemplate({
		fetch,
		graphqlClient: client,
		...variables,
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
		templateData,
		queriesData,
	};
};
