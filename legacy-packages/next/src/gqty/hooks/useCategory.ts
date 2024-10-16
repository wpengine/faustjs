// eslint-disable-next-line import/extensions
import { CategoryIdType } from '@faustjs/core/client';
import type { RequiredSchema } from '@faustjs/react';
import { useRouter } from 'next/router.js';
import isString from 'lodash/isString.js';
import defaults from 'lodash/defaults.js';
import { hasCategoryId, hasCategorySlug } from '../../utils/index.js';
import type { NextClientHooks } from '.';

export function create<Schema extends RequiredSchema>(
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooks<Schema>['useCategory'] {
  return (args) => {
    const { query } = useRouter();
    const { category } = useQuery();
    let params: Partial<Parameters<Schema['query']['category']>[0]> = defaults(
      {},
      args,
    );

    if (hasCategoryId(query)) {
      params = {
        id: query.categoryId,
        idType: CategoryIdType.ID,
        ...params,
      };
    }
    if (hasCategorySlug(query)) {
      params = {
        id: query.categorySlug,
        idType: CategoryIdType.SLUG,
        ...params,
      };
    }

    if (!isString(params.id)) {
      throw new Error(
        'Invalid parameters for useCategory, you must send in an id or specify known URL params in your config',
      );
    }

    return category(
      params as Parameters<Schema['query']['category']>[0],
    ) as ReturnType<Schema['query']['category']>;
  };
}
