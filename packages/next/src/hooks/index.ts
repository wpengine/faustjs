import type { RequiredSchema } from '@faustjs/react';
import { ReactClient, UseMutationOptions } from '@gqty/react';
import type { GQtyError } from 'gqty';
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
import { create as createPreviewHook, UsePreviewResponse } from './usePreview';
import { create as createLoginHook } from './useLogin';

export type UseClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
> =
  | NextClient<Schema, ObjectTypesNames, ObjectTypes>['useClient']
  | NextClient<Schema, ObjectTypesNames, ObjectTypes>['auth']['useClient'];

interface WithAuthHooks<Schema extends RequiredSchema> {
  usePreview(): UsePreviewResponse<Schema>;

  useAuth(): {
    isLoading: boolean;
    isAuthenticated: boolean | undefined;
    authResult:
      | true
      | { redirect?: string | undefined; login?: string | undefined }
      | undefined;
  };

  useLogin(options?: {
    useMutationOptions?: UseMutationOptions<{
      code?: string | null | undefined;
      error?: string | null | undefined;
    }>;
  }): {
    login: (usernameEmail: string, password: string) => Promise<void>;
    isLoading: boolean;
    data:
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error: any;
          code?: undefined;
        }
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: any;
          error?: undefined;
        }
      | undefined;
    error: GQtyError | undefined;
  };
}

export interface NextClientHooks<Schema extends RequiredSchema>
  extends Pick<
    ReactClient<Schema>,
    | 'useLazyQuery'
    | 'useMutation'
    | 'usePaginatedQuery'
    | 'useQuery'
    | 'useSubscription'
    | 'useTransactionQuery'
    | 'useHydrateCache'
  > {
  useQuery: ReactClient<Schema>['useQuery'];

  useHydrateCache: ReactClient<Schema>['useHydrateCache'];

  useCategory(
    args?: Parameters<Schema['query']['category']>[0],
  ): ReturnType<Schema['query']['category']>;

  usePosts(
    args?: Parameters<Schema['query']['posts']>[0],
  ): ReturnType<Schema['query']['posts']>;

  usePost(
    args?: Parameters<Schema['query']['post']>[0],
  ): ReturnType<Schema['query']['post']>;

  usePage(
    args?: Parameters<Schema['query']['page']>[0],
  ): ReturnType<Schema['query']['page']>;
}

export type NextClientHooksWithAuth<Schema extends RequiredSchema> =
  NextClientHooks<Schema> & WithAuthHooks<Schema>;

export function createHooks<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  useClient: UseClient<Schema, ObjectTypesNames, ObjectTypes>,
): NextClientHooks<Schema> {
  const useQuery = createQueryHook(useClient);
  const useMutation = createMutationHook(useClient);

  return {
    useQuery,
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
  };
}

export function createAuthHooks<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  useClient: UseClient<Schema, ObjectTypesNames, ObjectTypes>,
): NextClientHooksWithAuth<Schema> {
  const useQuery = createQueryHook(useClient);
  const useAuth = createAuthHook();
  const useMutation = createMutationHook(useClient);

  return {
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
    useLogin: createLoginHook(useMutation),
  };
}
