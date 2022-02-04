import type { RequiredSchema } from '@faustjs/react';
import type { NextClientHooks, UseClient } from '.';
import { useFaustContext } from './useFaustContext';

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
    useFaustContext();
    return useClient().useQuery(...args);
  };
}
