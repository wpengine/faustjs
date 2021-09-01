import type { RequiredSchema } from '@faustjs/react';
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
): NextClientHooks<Schema, ObjectTypesNames, ObjectTypes>['useIsLoading'] {
  return () => {
    return useQuery().$state.isLoading;
  };
}
