import { getAuthString } from '@/utils/getAuthString';
import { createDefaultClient, setGraphQLClient } from '@faustjs/nextjs/pages';
import { gql } from 'graphql-tag';
import { print } from 'graphql';

const GET_CONTENT = gql`
	query GetNode($id: ID! = 0) {
		contentNode(id: $id, idType: DATABASE_ID, asPreview: true) {
			databaseId
		}
	}
`;

export default async function handler(req, res) {
	const { secret, id } = req.query;

	if (!id) {
		return res.status(400).json({ message: 'No ID provided.' });
	}

	// Check if preview secret token exists and matches environment variable
	if (secret !== process.env.WP_PREVIEW_SECRET) {
		return res.status(401).json({ message: 'Secret token is invalid.' });
	}

	const client = createDefaultClient(process.env.NEXT_PUBLIC_WORDPRESS_URL, {
		Authorization: getAuthString(),
	});
	setGraphQLClient(client);

	const { data, error } = await client.request(print(GET_CONTENT), {
		id,
	});

	if (error) {
		console.error('Error fetching content:', error);
		return res.status(500).json({ message: 'Error fetching content.' });
	}

	if (!data?.contentNode) {
		return res.status(404).json({
			message: 'Content could not be found. Verify your authentication method.',
		});
	}

	// Enable draft mode
	// More info: https://nextjs.org/docs/pages/guides/draft-mode#step-1-create-and-access-the-api-route
	res.setDraftMode({ enable: true });

	// Redirect with the databaseId retrieved from the query to prevent redirect at
	// More info: https://developers.google.com/search/blog/2009/01/open-redirect-urls-is-your-site-being
	res.redirect('/' + data?.contentNode?.databaseId);
}
