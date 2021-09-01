import type { RequiredSchema } from '@faustjs/react';
import type { NextClientHooks } from '.';

export function create<Schema extends RequiredSchema>(
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooks<Schema>['useIsLoading'] {
  return () => {
    return useQuery().$state.isLoading;
  };
}
