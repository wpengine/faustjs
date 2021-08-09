import { hasCategoryId, hasCategorySlug } from './utils';
import isString from 'lodash/isString.js';
import type { Category } from './schema.generated';

export async function getCategory(
	loadApi,
	resolver = (data: Category): any => ({ id: data.id }),
	args = {}
): Promise<Partial<Category> | false> {
	const {
		page: { query, params },
		context: {
			client: { query: gqlQuery, resolved }
		}
	} = loadApi;
	const { category } = gqlQuery;
	let gqlParams;

	if (hasCategoryId(query)) {
		gqlParams = {
			id: query.categoryId,
			idType: 'ID',
			...args
		};
	}
	if (hasCategorySlug(params)) {
		gqlParams = {
			id: params.categorySlug,
			idType: 'SLUG',
			...args
		};
	}

	if (!isString(gqlParams?.id)) {
		throw new Error(
			'Invalid parameters for getCategory, you must send in an id or specify known URL params in your config'
		);
	}
	const retCategory = category(gqlParams);
	if (!retCategory) {
		return false;
	}

	return resolved(() => resolver(retCategory));
}
