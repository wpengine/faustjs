import type { RequiredSchema } from '@faustjs/react';
import { useRouter } from 'next/router';
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
): NextClientHooks<Schema, ObjectTypesNames, ObjectTypes>['usePosts'] {
  return (args) => {
    const { query } = useRouter();
    const { posts } = useQuery();
    const params = defaults({}, args);

    if (hasCategoryId(query)) {
      params.where = {
        categoryId: Number(query.categoryId),
        ...params.where,
      };
    } else if (hasCategorySlug(query)) {
      params.where = {
        categoryName: query.categorySlug,
        ...params.where,
      };
    }

    return posts(params) as ReturnType<Schema['query']['posts']>;
  };
}
