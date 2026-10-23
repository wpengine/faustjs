/**
 * @jest-environment jsdom
 */
import { gql } from '@apollo/client';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { useFaustQuery } from '../../src/hooks/useFaustContext';
import { FaustContext } from '../../src/store/FaustContext';
import { storeFaustQueries } from '../../src/store/faustQueries';

const GET_POSTS = gql`
	query GetPosts($category: String) {
		posts(where: { categoryName: $category }) {
			nodes {
				title
			}
		}
	}
`;

describe('useFaustQuery()', () => {
	const queries = storeFaustQueries([
		{
			query: GET_POSTS,
			variables: { category: 'sports' },
			data: { id: 'sports' },
		},
		{ query: GET_POSTS, variables: { category: 'news' }, data: { id: 'news' } },
	]);
	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<FaustContext.Provider value={{ queries, setQueries: jest.fn() }}>
			{children}
		</FaustContext.Provider>
	);

	test('returns the result for the given variables', () => {
		const { result } = renderHook(
			() => useFaustQuery(GET_POSTS, { variables: { category: 'sports' } }),
			{ wrapper },
		);

		expect(result.current).toEqual({ id: 'sports' });
	});

	test('returns the last result without variables', () => {
		const { result } = renderHook(() => useFaustQuery(GET_POSTS), { wrapper });

		expect(result.current).toEqual({ id: 'news' });
	});

	test('throws outside FaustProvider', () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => renderHook(() => useFaustQuery(GET_POSTS))).toThrow(
			'useFaustQuery must be used within a FaustProvider',
		);
	});
});
