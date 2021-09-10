import type { RequiredSchema } from '@faustjs/react';
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
): NextClientHooks<Schema>['usePaginatedQuery'] {
  return (...args) => {
    return useClient().usePaginatedQuery(...args);
  };
}
