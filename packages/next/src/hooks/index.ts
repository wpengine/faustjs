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
import { ReactClient, UseMutationOptions } from '@gqty/react';
import { GQtyError } from 'gqty';

export interface NextClientHooks<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
> extends Pick<
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

  useClient(): NextClient<Schema, ObjectTypesNames, ObjectTypes>;

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

  usePreview(
    args: Record<'pageId', string>,
  ): ReturnType<Schema['query']['page']>;
  usePreview(
    args: Record<'postId', string>,
  ): ReturnType<Schema['query']['post']>;

  useIsLoading(): boolean;

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
): NextClientHooks<Schema, ObjectTypesNames, ObjectTypes> {
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
