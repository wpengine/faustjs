import { DocumentNode } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { print } from '@apollo/client/utilities';
import { sha256 } from 'js-sha256';
import type { FaustQueries } from './FaustContext.js';

type Variables = { [key: string]: any };

// Suffix for the entry that records which variables the query-only key's
// result was fetched with.
const VARIABLES_SUFFIX = ':variables';

function sortKeys(value: unknown): unknown {
	if (Array.isArray(value)) {
		return value.map(sortKeys);
	}

	if (value !== null && typeof value === 'object') {
		return Object.keys(value)
			.sort()
			.reduce<Variables>((sorted, key) => {
				// eslint-disable-next-line no-param-reassign
				sorted[key] = sortKeys((value as Variables)[key]);
				return sorted;
			}, {});
	}

	return value;
}

/**
 * Get the key a query's result is stored under. With variables, the key also
 * covers them, in any key order, so the same query can be stored once per set
 * of variables. Variables go through JSON first, as they do when Apollo sends
 * them, so values like dates keep what makes them different.
 */
export function getFaustQueryKey(
	query: DocumentNode,
	variables?: Variables,
): string {
	const printed = print(query);

	return variables === undefined
		? sha256(printed)
		: sha256(
				`${printed}\n${JSON.stringify(
					sortKeys(JSON.parse(JSON.stringify(variables))),
				)}`,
		  );
}

/**
 * Store the results of a template's `queries`.
 *
 * Each result is stored once. The query-only key holds the last result for
 * each query, as it always has, so `useFaustQuery(query)` keeps working.
 * Results with variables that aren't under the query-only key are stored
 * under a key for the query and its variables.
 */
export function storeFaustQueries(
	results: {
		query: DocumentNode;
		variables?: Variables;
		data: any;
	}[],
): FaustQueries {
	const queries: FaustQueries = {};
	const entries = results.map(({ query, variables, data }) => ({
		queryKey: getFaustQueryKey(query),
		variablesKey:
			variables === undefined ? undefined : getFaustQueryKey(query, variables),
		data,
	}));
	const lastIndex = new Map<string, number>();

	// A later entry for the same query and variables replaces an earlier one.
	entries.forEach(({ queryKey, variablesKey }, index) => {
		lastIndex.set(queryKey, index);
		if (variablesKey) {
			lastIndex.set(variablesKey, index);
		}
	});

	entries.forEach(({ queryKey, variablesKey, data }, index) => {
		if (lastIndex.get(queryKey) === index) {
			queries[queryKey] = data;

			if (variablesKey) {
				queries[queryKey + VARIABLES_SUFFIX] = variablesKey;
			}
		}
	});

	entries.forEach(({ queryKey, variablesKey, data }, index) => {
		if (
			variablesKey &&
			lastIndex.get(variablesKey) === index &&
			queries[queryKey + VARIABLES_SUFFIX] !== variablesKey
		) {
			queries[variablesKey] = data;
		}
	});

	return queries;
}

/**
 * Read a stored query result, optionally the one for specific variables.
 */
export function readFaustQuery(
	queries: FaustQueries | null | undefined,
	query: DocumentNode,
	variables?: Variables,
): any {
	const queryKey = getFaustQueryKey(query);

	if (variables === undefined) {
		return queries?.[queryKey];
	}

	const variablesKey = getFaustQueryKey(query, variables);

	if (queries?.[variablesKey] !== undefined) {
		return queries[variablesKey];
	}

	return queries?.[queryKey + VARIABLES_SUFFIX] === variablesKey
		? queries[queryKey]
		: undefined;
}
