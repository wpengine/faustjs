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
  useQuery: NextClient<Schema, ObjectTypesNames, ObjectTypes>['useQuery'],
): NextClient<Schema, ObjectTypesNames, ObjectTypes>['useIsLoading'] {
  return () => {
    return useQuery().$state.isLoading;
  };
}
