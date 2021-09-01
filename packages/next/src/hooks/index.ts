import type { RequiredSchema } from '@faustjs/react';
import type { NextClient } from '../client';

import { create as createAuthHook } from './useAuth';
import { create as createLazyQueryHook } from './useLazyQuery';
import { create as createMutationHook } from './useMutation';
import { create as createPaginatedQueryHook } from './usePaginatedQuery';
import { create as createQueryHook } from './useQuery';
import { create as createSubscriptionHook } from './useSubscription';
import { create as createTransactionQueryHook } from './useTransactionQuery';
import { create as createHydrateCacheHook } from './useHydrateCache';
import { create as createCategoryHook } from './useCategory';
import { create as createPostsHook } from './usePosts';
import { create as createPostHook } from './usePost';
import { create as createPageHook } from './usePage';
import { create as createPreviewHook } from './usePreview';
import { create as createIsLoadingHook } from './useIsLoading';
import { create as createLoginHook } from './useLogin';

export function createHooks<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  useClient: () => NextClient<Schema, ObjectTypesNames, ObjectTypes>,
): Pick<
  NextClient<Schema, ObjectTypesNames, ObjectTypes>,
  | 'useQuery'
  | 'useClient'
  | 'useAuth'
  | 'useLazyQuery'
  | 'useMutation'
  | 'usePaginatedQuery'
  | 'useQuery'
  | 'useSubscription'
  | 'useTransactionQuery'
  | 'useHydrateCache'
  | 'useCategory'
  | 'usePosts'
  | 'usePost'
  | 'usePage'
  | 'usePreview'
  | 'useIsLoading'
  | 'useLogin'
> {
  const useQuery = createQueryHook(useClient);
  const useAuth = createAuthHook();
  const useMutation = createMutationHook(useClient);

  return {
    useClient,
    useQuery,
    useAuth,
    useLazyQuery: createLazyQueryHook(useClient),
    useMutation,
    usePaginatedQuery: createPaginatedQueryHook(useClient),
    useSubscription: createSubscriptionHook(useClient),
    useTransactionQuery: createTransactionQueryHook(useClient),
    useHydrateCache: createHydrateCacheHook(useClient),
    useCategory: createCategoryHook(useQuery),
    usePosts: createPostsHook(useQuery),
    usePost: createPostHook(useQuery),
    usePage: createPageHook(useQuery),
    usePreview: createPreviewHook(useAuth, useQuery),
    useIsLoading: createIsLoadingHook(useQuery),
    useLogin: createLoginHook(useMutation),
  };
}
