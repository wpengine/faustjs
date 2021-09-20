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
      __typename?: P;
    };
  } = never,
> =
  | NextClient<Schema, ObjectTypesNames, ObjectTypes>['useClient']
  | NextClient<Schema, ObjectTypesNames, ObjectTypes>['auth']['useClient'];

export interface UseLoginOptions {
  useMutationOptions?: UseMutationOptions<{
    code?: string | null | undefined;
    error?: string | null | undefined;
  }>;
}

interface WithAuthHooks<Schema extends RequiredSchema> {
  /**
   * Faust.js hook to get preview data for a page or post.
   *
   * @see https://faustjs.org/docs/next/reference/custom-hooks#usepreview
   */
  usePreview(): UsePreviewResponse<Schema>;

  /**
   * Faust.js hook to ensure a user is authenticated.
   *
   * @see https://faustjs.org/docs/next/reference/custom-hooks#useauth
   */
  useAuth(): {
    isLoading: boolean;
    isAuthenticated: boolean | undefined;
    authResult:
      | true
      | { redirect?: string | undefined; login?: string | undefined }
      | undefined;
  };

  /**
   * Faust.js hook to facilitate a login request.
   *
   * @param {UseLoginOptions} [options]
   * @see https://faustjs.org/docs/next/reference/custom-hooks#uselogin
   */
  useLogin(options?: UseLoginOptions): {
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
  /**
   * GQty hook to make any query request to the Headless Wordpress API.
   *
   * @see https://faustjs.org/docs/next/reference/custom-hooks#custom-queries-and-mutations
   */
  useQuery: ReactClient<Schema>['useQuery'];

  useHydrateCache: ReactClient<Schema>['useHydrateCache'];

  /**
   * Faust.js hook to get a category.
   */
  useCategory(
    args?: Parameters<Schema['query']['category']>[0],
  ): ReturnType<Schema['query']['category']>;

  /**
   * Faust.js hook to get a list of posts.
   *
   * @see https://faustjs.org/docs/next/reference/custom-hooks#useposts
   */
  usePosts(
    args?: Parameters<Schema['query']['posts']>[0],
  ): ReturnType<Schema['query']['posts']>;

  /**
   * Faust.js hook to get a single post.
   *
   * @see https://faustjs.org/docs/next/reference/custom-hooks#usepost
   */
  usePost(
    args?: Parameters<Schema['query']['post']>[0],
  ): ReturnType<Schema['query']['post']>;

  /**
   * Faust.js hook to get a single page.
   *
   * @see https://faustjs.org/docs/next/reference/custom-hooks#usepage
   */
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
      __typename?: P;
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
      __typename?: P;
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
