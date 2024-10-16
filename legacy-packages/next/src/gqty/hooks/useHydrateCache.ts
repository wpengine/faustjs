import type { RequiredSchema } from '@faustjs/react';
import { useEffect, useRef } from 'react';
import isString from 'lodash/isString.js';
import isObject from 'lodash/isObject.js';
import isFunction from 'lodash/isFunction.js';
import type { NextClientHooks, UseClient } from '.';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename?: P;
    };
  } = never,
>(
  useClient: UseClient<Schema, ObjectTypesNames, ObjectTypes>,
): NextClientHooks<Schema>['useHydrateCache'] {
  return ({ cacheSnapshot, shouldRefetch }) => {
    const snapshotCache = useRef('');
    const { client } = useClient();
    if (isString(cacheSnapshot) && snapshotCache.current !== cacheSnapshot) {
      snapshotCache.current = cacheSnapshot;

      client.hydrateCache({ cacheSnapshot, shouldRefetch: false });
    }

    useEffect(() => {
      if (!isObject(client) || !isFunction(client.refetch)) {
        return;
      }

      if (shouldRefetch) {
        client.refetch(client.query).catch(console.error);
      }
    }, [shouldRefetch, client]);
  };
}
