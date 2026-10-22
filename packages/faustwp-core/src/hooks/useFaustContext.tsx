import { DocumentNode } from '@apollo/client';
import { useContext } from 'react';
import { FaustContext } from '../store/FaustContext.js';
import { readFaustQuery } from '../store/faustQueries.js';

export type UseFaustQueryOptions = {
	/**
	 * The variables the query was run with in `Component.queries`. Pass them
	 * when a template runs the same query more than once with different
	 * variables, to get the result for these variables.
	 */
	variables?: { [key: string]: any };
};

export function useFaustQuery<TData>(
	query: DocumentNode,
	options?: UseFaustQueryOptions,
): TData {
	const context = useContext(FaustContext);

	if (context === undefined) {
		throw new Error('useFaustQuery must be used within a FaustProvider');
	}

	return readFaustQuery(context?.queries, query, options?.variables) as TData;
}
