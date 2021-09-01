import type { RequiredSchema } from '@faustjs/react';
import type { NextClient } from '../client';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  useClient: () => NextClient<Schema, ObjectTypesNames, ObjectTypes>,
): NextClient<Schema, ObjectTypesNames, ObjectTypes>['useLazyQuery'] {
  return (...args) => {
    return useClient().useLazyQuery(...args);
  };
}
