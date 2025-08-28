import { GET_POST } from '../getPost.js';

export const queries = [
	{
		name: 'getPost',
		query: GET_POST,
		variables: ({ databaseId }, ctx) => ({
			databaseId,
			asPreview: ctx?.asPreview,
		}),
	},
];
