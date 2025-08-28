import { createDefaultClient, setGraphQLClient } from '@faustjs/nextjs/pages';
import { print } from 'graphql';
import { gql } from 'graphql-tag';

const VERIFY_NODE = gql`
	query GetNode($id: ID! = 0) {
		contentNode(id: $id, idType: DATABASE_ID, asPreview: true) {
			databaseId
		}
	}
`;

export function enablePreview({
	wordpressUrl,
	expectedSecret,
	secretParamName = 'secret',
	idParamName = 'id',
	graphqlClient,
	bearerToken,
}) {
	return async function handler(req, res) {
		const id = req.query[idParamName];
		const secret = req.query[secretParamName];

		if (!id) {
			return res.status(400).json({ message: 'No ID received.' });
		}

		// Check if preview secret token exists and matches environment variable
		if (secret !== expectedSecret) {
			return res.status(401).json({ message: 'Secret token is invalid.' });
		}

		if (!wordpressUrl) {
			return res
				.status(500)
				.json({ message: 'WordPress URL is not configured.' });
		}

		let client;

		if (graphqlClient) {
			client = graphqlClient;
		} else {
			client = createDefaultClient(wordpressUrl, {
				Authorization: bearerToken,
			});
			setGraphQLClient(client);
		}

		const { data, error } = await client.request(print(VERIFY_NODE), {
			id,
		});

		if (error) {
			console.error('Error fetching content:', error);
			return res.status(500).json({ message: 'Error fetching content.' });
		}

		if (!data?.contentNode) {
			return res.status(404).json({
				message:
					'Content could not be found. Verify your authentication method.',
			});
		}

		// Enable draft mode
		res.setDraftMode({ enable: true });

		// Redirect with the databaseId retrieved from the query
		res.redirect('/' + data?.contentNode?.databaseId);
	};
}
