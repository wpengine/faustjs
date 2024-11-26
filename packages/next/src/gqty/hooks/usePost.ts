// eslint-disable-next-line import/extensions
import { PostIdType } from '@faustjs/core/client';
import type { RequiredSchema } from '@faustjs/react';
import { useRouter } from 'next/router.js';
import defaults from 'lodash/defaults.js';
import isString from 'lodash/isString.js';
import { hasPostId, hasPostSlug, hasPostUri } from '../../utils/index.js';
import type { NextClientHooks } from '.';

export function create<Schema extends RequiredSchema>(
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooks<Schema>['usePost'] {
  return (args) => {
    const router = useRouter();
    const { post } = useQuery();
    let params: Partial<Parameters<Schema['query']['post']>[0]> = defaults(
      {},
      args,
    );
    const { query } = router;

    if (hasPostId(query)) {
      params = {
        id: query.postId,
        idType: PostIdType.ID,
        ...params,
      };
    } else if (hasPostSlug(query)) {
      params = {
        id: query.postSlug,
        idType: PostIdType.SLUG,
        ...params,
      };
    } else if (hasPostUri(query)) {
      params = {
        id: query.postUri.join('/'),
        idType: PostIdType.URI,
        ...params,
      };
    }

    if (!isString(params.id)) {
      throw new Error(
        'Invalid parameters for usePost, you must send in an id or specify known URL params in your config',
      );
    }

    return post(params as Parameters<Schema['query']['post']>[0]) as ReturnType<
      Schema['query']['post']
    >;
  };
}
