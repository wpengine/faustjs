import {
	createDefaultClient,
	setGraphQLClient,
	uriToTemplate,
} from '@faustjs/sveltekit';
import { WORDPRESS_URL } from '$env/static/private';

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

	return {
		uri: workingUri,
		templateData,
	};
};
