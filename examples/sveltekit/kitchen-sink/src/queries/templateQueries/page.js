import { GET_PAGE } from '../getPage.js';

export const queries = [
	{
		name: 'getPage',
		query: GET_PAGE,
		variables: ({ databaseId }, ctx) => ({
			databaseId,
			asPreview: ctx?.asPreview,
		}),
	},
];
