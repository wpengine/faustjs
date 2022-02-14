import type { RequiredSchema } from '@faustjs/react';
import type { NextClientHooks, UseClient } from '.';
import { useCheckFaustContext } from './useCheckFaustContext.js';
import { FaustContext } from '../client.js';

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
): NextClientHooks<Schema>['useSubscription'] {
  return (...args) => {
    useCheckFaustContext(FaustContext);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return useClient().useSubscription(...args);
  };
}
