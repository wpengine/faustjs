import { CategoryIdType } from '@faustjs/core';
import type { RequiredSchema } from '@faustjs/react';
import { useRouter } from 'next/router';
import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
import { hasCategoryId, hasCategorySlug } from '../utils';
import type { NextClientHooks } from '.';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  useQuery: NextClientHooks<Schema, ObjectTypesNames, ObjectTypes>['useQuery'],
): NextClientHooks<Schema, ObjectTypesNames, ObjectTypes>['useCategory'] {
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
