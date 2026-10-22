import { gql } from '@apollo/client';
import * as client from '../src/client';
import { setConfig } from '../src/config';
import * as getTemplate from '../src/getTemplate';
import { getWordPressProps } from '../src/getWordPressProps';
import { readFaustQuery } from '../src/store/faustQueries';

const GET_POSTS = gql`
	query GetPosts($category: String) {
		posts(where: { categoryName: $category }) {
			nodes {
				title
			}
		}
	}
`;

afterEach(() => {
	jest.restoreAllMocks();
});

describe('getWordPressProps()', () => {
	test('keeps every result when a template runs the same query with different variables', async () => {
		const query = jest.fn(async ({ variables }) =>
			variables?.uri
				? { data: { nodeByUri: { __typename: 'Page', databaseId: 1 } } }
				: { data: { category: variables.category } },
		);
		jest
			.spyOn(client, 'getApolloClient')
			.mockReturnValue({ query, cache: { extract: () => ({}) } } as any);

		const Template = Object.assign(() => null, {
			queries: [
				{ query: GET_POSTS, variables: () => ({ category: 'sports' }) },
				{ query: GET_POSTS, variables: () => ({ category: 'news' }) },
			],
		});
		setConfig({ templates: { page: Template } } as any);
		jest.spyOn(getTemplate, 'getTemplate').mockReturnValue(Template as any);

		const result = (await getWordPressProps({
			ctx: { params: { wordpressNode: ['about'] } } as any,
		})) as { props: { __FAUST_QUERIES__: any } };
		const queries = result.props.__FAUST_QUERIES__;

		expect(readFaustQuery(queries, GET_POSTS, { category: 'sports' })).toEqual({
			category: 'sports',
		});
		expect(readFaustQuery(queries, GET_POSTS, { category: 'news' })).toEqual({
			category: 'news',
		});
		expect(readFaustQuery(queries, GET_POSTS)).toEqual({ category: 'news' });
		// The props are serialized for the page, so they must be plain JSON.
		expect(JSON.parse(JSON.stringify(queries))).toEqual(queries);
	});
});
