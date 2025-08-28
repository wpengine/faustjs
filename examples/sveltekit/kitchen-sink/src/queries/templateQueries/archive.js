import { GET_ARCHIVE } from '../getArchive.js';

export const queries = [
	{
		name: 'getCategory',
		query: GET_ARCHIVE,
		variables: ({ uri }) => ({
			uri,
		}),
	},
];
