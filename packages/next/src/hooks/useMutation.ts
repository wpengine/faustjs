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
  useClient: NextClientHooks<Schema, ObjectTypesNames, ObjectTypes>['useClient'],
): NextClientHooks<Schema, ObjectTypesNames, ObjectTypes>['useMutation'] {
  return (...args) => {
    return useClient().useMutation(...args);
  };
}
