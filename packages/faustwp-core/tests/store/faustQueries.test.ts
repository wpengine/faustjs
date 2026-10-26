import { gql } from '@apollo/client';
import {
	getFaustQueryKey,
	readFaustQuery,
	storeFaustQueries,
} from '../../src/store/faustQueries';

const GET_POSTS = gql`
	query GetPosts($category: String) {
		posts(where: { categoryName: $category }) {
			nodes {
				title
			}
		}
	}
`;

const GET_LAYOUT = gql`
	query GetLayout {
		generalSettings {
			title
		}
	}
`;

const posts = (title: string) => ({ posts: { nodes: [{ title }] } });

describe('getFaustQueryKey()', () => {
	test('ignores the order of variable keys', () => {
		expect(getFaustQueryKey(GET_POSTS, { a: 1, b: { c: 2, d: 3 } })).toBe(
			getFaustQueryKey(GET_POSTS, { b: { d: 3, c: 2 }, a: 1 }),
		);
	});

	test('differs by variables and from the query-only key', () => {
		const sports = getFaustQueryKey(GET_POSTS, { category: 'sports' });

		expect(sports).not.toBe(getFaustQueryKey(GET_POSTS, { category: 'news' }));
		expect(sports).not.toBe(getFaustQueryKey(GET_POSTS));
	});

	test('tells apart values that JSON serializes, like dates', () => {
		expect(
			getFaustQueryKey(GET_POSTS, { after: new Date('2026-01-01') }),
		).not.toBe(getFaustQueryKey(GET_POSTS, { after: new Date('2026-02-01') }));
		expect(getFaustQueryKey(GET_POSTS, { after: new Date('2026-01-01') })).toBe(
			getFaustQueryKey(GET_POSTS, { after: '2026-01-01T00:00:00.000Z' }),
		);
	});
});

describe('storeFaustQueries() and readFaustQuery()', () => {
	test('reads queries without variables as before', () => {
		const queries = storeFaustQueries([
			{ query: GET_LAYOUT, data: { generalSettings: { title: 'Site' } } },
			{ query: GET_POSTS, variables: { category: 'news' }, data: posts('A') },
		]);

		expect(readFaustQuery(queries, GET_LAYOUT)).toEqual({
			generalSettings: { title: 'Site' },
		});
		expect(readFaustQuery(queries, GET_POSTS)).toEqual(posts('A'));
		expect(readFaustQuery(queries, GET_POSTS, { category: 'news' })).toEqual(
			posts('A'),
		);
	});

	test('keeps each result when the same query runs with different variables', () => {
		const queries = storeFaustQueries([
			{
				query: GET_POSTS,
				variables: { category: 'featured' },
				data: posts('F'),
			},
			{ query: GET_POSTS, variables: { category: 'sports' }, data: posts('S') },
			{ query: GET_POSTS, variables: { category: 'news' }, data: posts('N') },
		]);

		expect(
			readFaustQuery(queries, GET_POSTS, { category: 'featured' }),
		).toEqual(posts('F'));
		expect(readFaustQuery(queries, GET_POSTS, { category: 'sports' })).toEqual(
			posts('S'),
		);
		expect(readFaustQuery(queries, GET_POSTS, { category: 'news' })).toEqual(
			posts('N'),
		);
		// Without variables, the last result is returned, as before.
		expect(readFaustQuery(queries, GET_POSTS)).toEqual(posts('N'));
	});

	test('stores each result once', () => {
		const queries = storeFaustQueries([
			{ query: GET_POSTS, variables: { category: 'sports' }, data: posts('S') },
			{ query: GET_POSTS, variables: { category: 'news' }, data: posts('N') },
		]);
		const stored = Object.values(queries).filter(
			(value) => typeof value === 'object',
		);

		expect(stored).toHaveLength(2);
	});

	test('returns undefined for variables that were never queried', () => {
		const queries = storeFaustQueries([
			{ query: GET_POSTS, variables: { category: 'news' }, data: posts('N') },
		]);

		expect(
			readFaustQuery(queries, GET_POSTS, { category: 'other' }),
		).toBeUndefined();
		expect(
			readFaustQuery(null, GET_POSTS, { category: 'news' }),
		).toBeUndefined();
	});

	test('a query stored without variables has no result for specific variables', () => {
		const queries = storeFaustQueries([{ query: GET_POSTS, data: posts('A') }]);

		expect(
			readFaustQuery(queries, GET_POSTS, { category: 'news' }),
		).toBeUndefined();
	});

	test('a repeated query and variables pair keeps only the last result', () => {
		const queries = storeFaustQueries([
			{
				query: GET_POSTS,
				variables: { category: 'sports' },
				data: posts('S1'),
			},
			{ query: GET_POSTS, variables: { category: 'news' }, data: posts('N') },
			{
				query: GET_POSTS,
				variables: { category: 'sports' },
				data: posts('S2'),
			},
		]);

		expect(readFaustQuery(queries, GET_POSTS, { category: 'sports' })).toEqual(
			posts('S2'),
		);
		expect(readFaustQuery(queries, GET_POSTS)).toEqual(posts('S2'));
		expect(readFaustQuery(queries, GET_POSTS, { category: 'news' })).toEqual(
			posts('N'),
		);
		expect(
			Object.values(queries).filter((value) => typeof value === 'object'),
		).toHaveLength(2);
	});
});
