// eslint-disable-next-line import/extensions
import { PageIdType } from '@faustjs/core/client';
import type { RequiredSchema } from '@faustjs/react';
import { useRouter } from 'next/router.js';
import defaults from 'lodash/defaults.js';
import isString from 'lodash/isString.js';
import { hasPageId, hasPageUri } from '../../utils/index.js';
import type { NextClientHooks } from '.';

export function create<Schema extends RequiredSchema>(
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooks<Schema>['usePage'] {
  return (args) => {
    const { query } = useRouter();
    const { page } = useQuery();
    let params: Partial<Parameters<Schema['query']['page']>[0]> = defaults(
      {},
      args,
    );

    if (hasPageId(query)) {
      params = {
        id: query.pageId,
        idType: PageIdType.ID,
        ...params,
      };
    }
    if (hasPageUri(query)) {
      params = {
        id: query.pageUri.join('/'),
        idType: PageIdType.URI,
        ...params,
      };
    }

    if (!isString(params.id)) {
      throw new Error(
        'Invalid parameters for usePage, you must send in an id or specify known URL params in your config',
      );
    }

    return page(params as Parameters<Schema['query']['page']>[0]) as ReturnType<
      Schema['query']['page']
    >;
  };
}
