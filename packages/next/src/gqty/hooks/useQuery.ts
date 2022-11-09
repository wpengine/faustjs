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
): NextClientHooks<Schema>['useQuery'] {
  return (...args) => {
    useCheckFaustContext(FaustContext);
    return useClient().useQuery(...args);
  };
}
