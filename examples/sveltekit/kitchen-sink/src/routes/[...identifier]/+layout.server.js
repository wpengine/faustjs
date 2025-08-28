import { print } from 'graphql';
import { createDefaultClient, setGraphQLClient } from '@faustjs/sveltekit';
import { GET_LAYOUT } from '../../queries/getLayout.js';
import { WORDPRESS_URL } from '$env/static/private';

export const load = async () => {
	const client = createDefaultClient(WORDPRESS_URL);
	setGraphQLClient(client);

	if (client) {
		try {
			const { data } = await client.request(print(GET_LAYOUT));

			return {
				layoutData: data,
			};
		} catch (error) {
			console.error('Error fetching layout data:', error);
		}
	}

	return {
		layoutData: null,
	};
};
