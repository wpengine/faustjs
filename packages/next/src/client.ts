import {
  CategoryIdType,
  ClientConfig,
  ensureAuthorizationNew,
  getClient as getCoreClient,
  headlessConfig,
  PageIdType,
  PostIdType,
  WithClient,
} from '@faustjs/core';
import type { RequiredSchema } from '@faustjs/react';
import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient,
} from '@gqless/react';
import type { GQlessClient } from 'gqless';
import type { IncomingMessage } from 'http';
import { isUndefined, trim } from 'lodash';
import defaults from 'lodash/defaults';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import merge from 'lodash/merge';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  hasCategoryId,
  hasCategorySlug,
  HasObject,
  hasPageId,
  hasPageUri,
  hasPostId,
  hasPostSlug,
  hasPostUri,
} from './utils';

export interface NextClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
> extends ReactClient<Schema> {
  client: GQlessClient<Schema>;

  setAsRoot(): void;

  context: WithClient<IncomingMessage, Schema> | undefined;

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
    authResult: true | { redirect?: string; login?: string };
  };
}

export interface HeadlessContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client?: NextClient<RequiredSchema>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeadlessContext = React.createContext<HeadlessContextType>({});

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/explicit-module-boundary-types */
export function getClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  clientConfig: ClientConfig<Schema, ObjectTypesNames, ObjectTypes>,
  createReactClientOpts?: CreateReactClientOptions,
): NextClient<Schema, ObjectTypesNames, ObjectTypes> {
  const coreClient = getCoreClient<Schema, ObjectTypesNames, ObjectTypes>(
    clientConfig,
  );

  let reactClientOpts: CreateReactClientOptions = {
    defaults: {
      // Set this flag as "true" if your usage involves React Suspense
      // Keep in mind that you can overwrite it in a per-hook basis
      suspense: false,

      // Set this flag based on your needs
      staleWhileRevalidate: false,
    },
  };

  if (isObject(createReactClientOpts)) {
    reactClientOpts = merge(reactClientOpts, createReactClientOpts);
  }

  const reactClient = createReactClient<Schema>(coreClient, reactClientOpts);
  const haveServerContext = isObject(clientConfig.context?.apiClient);
  let nextClient: NextClient<Schema, ObjectTypesNames, ObjectTypes>;

  function useClient() {
    let client: typeof nextClient | undefined = useContext(HeadlessContext)
      ?.client as typeof nextClient;

    if (haveServerContext || !isObject(client)) {
      client = nextClient;
    }

    return client;
  }

  const useQuery: typeof reactClient.useQuery = (...args) => {
    return useClient().useQuery(...args);
  };

  const useLazyQuery: typeof reactClient.useLazyQuery = (...args) => {
    return useClient().useLazyQuery(...args);
  };

  const useTransactionQuery: typeof reactClient.useTransactionQuery = (
    fn,
    ...args
  ) => {
    return useClient().useTransactionQuery(fn, ...args);
  };

  const usePaginatedQuery: typeof reactClient.usePaginatedQuery = (...args) => {
    return useClient().usePaginatedQuery(...args);
  };

  const useMutation: typeof reactClient.useMutation = (...args) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return useClient().useMutation(...args);
  };

  const useSubscription: typeof reactClient.useSubscription = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return useClient().useSubscription();
  };

  function useAuth() {
    const { authType, relativeLoginPage } = headlessConfig();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
      undefined,
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [authResult, setAuthResult] = useState<
      true | { redirect?: string; login?: string } | undefined
    >(undefined);

    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      /* eslint-disable @typescript-eslint/no-floating-promises */
      (async () => {
        const auth = await ensureAuthorizationNew({
          redirectUri: window.location.href,
          loginPageUri: `/${trim(
            relativeLoginPage,
            '/',
          )}/?redirect_uri=${encodeURIComponent(window.location.href)}`,
        });

        setAuthResult(auth);
        setIsAuthenticated(auth === true);
        setIsLoading(false);
      })();
    }, []);

    // Redirect the user to the login page if they are not authenticated
    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      if (isUndefined(isAuthenticated) || isAuthenticated === true) {
        return;
      }

      setTimeout(() => {
        if (!isObject(authResult)) {
          return;
        }

        if (authType === 'local' && authResult.login) {
          window.location.replace(authResult.login);
        }

        if (authType === 'redirect' && authResult.redirect) {
          window.location.replace(authResult.redirect);
        }
      }, 200);
    }, [isAuthenticated, authResult, authType]);

    return { isAuthenticated, isLoading, authResult };
  }

  function usePosts(
    args?: Parameters<Schema['query']['posts']>[0],
  ): ReturnType<Schema['query']['posts']> {
    const { query } = useRouter();
    const { posts } = useQuery();
    const params = defaults({}, args);

    if (hasCategoryId(query)) {
      params.where = {
        categoryId: Number(query.categoryId),
        ...params.where,
      };
    } else if (hasCategorySlug(query)) {
      params.where = {
        categoryName: query.categorySlug,
        ...params.where,
      };
    }

    return posts(params) as ReturnType<Schema['query']['posts']>;
  }

  function usePost(
    args?: Parameters<Schema['query']['post']>[0],
  ): ReturnType<Schema['query']['post']> {
    const router = useRouter();
    const { post } = useQuery();
    let params: Partial<Parameters<Schema['query']['post']>[0]> = defaults(
      {},
      args,
    );
    const { query } = router;

    if (hasPostId(query)) {
      params = {
        id: query.postId,
        idType: PostIdType.ID,
        ...params,
      };
    } else if (hasPostSlug(query)) {
      params = {
        id: query.postSlug,
        idType: PostIdType.SLUG,
        ...params,
      };
    } else if (hasPostUri(query)) {
      params = {
        id: query.postUri.join('/'),
        idType: PostIdType.URI,
        ...params,
      };
    }

    if (!isString(params.id)) {
      throw new Error(
        'Invalid parameters for usePost, you must send in an id or specify known URL params in your config',
      );
    }

    return post(params as Parameters<Schema['query']['post']>[0]) as ReturnType<
      Schema['query']['post']
    >;
  }

  function usePage(
    args?: Parameters<Schema['query']['page']>[0],
  ): ReturnType<Schema['query']['page']> {
    const { query } = useRouter();
    const { page } = useQuery();
    let params: Partial<Parameters<Schema['query']['page']>[0]> = defaults(
      {},
      args,
    );

    if (hasPageId(query)) {
      params = {
        id: query.pageId,
        idType: PageIdType.ID,
        ...params,
      };
    }
    if (hasPageUri(query)) {
      params = {
        id: query.pageUri.join('/'),
        idType: PageIdType.URI,
        ...params,
      };
    }

    if (!isString(params.id)) {
      throw new Error(
        'Invalid parameters for usePage, you must send in an id or specify known URL params in your config',
      );
    }

    return page(params as Parameters<Schema['query']['page']>[0]) as ReturnType<
      Schema['query']['page']
    >;
  }

  /* eslint-disable consistent-return */

  function usePreview(
    args: Record<'pageId', string>,
  ): ReturnType<Schema['query']['page']>;
  function usePreview(
    args: Record<'postId', string>,
  ): ReturnType<Schema['query']['post']>;
  function usePreview(
    args: HasObject,
  ): ReturnType<Schema['query']['page'] | Schema['query']['post']> | undefined {
    const client = useClient();
    const { isAuthenticated } = useAuth();

    const { post, page } = client.useQuery();

    if (isUndefined(isAuthenticated) || isAuthenticated !== true) {
      return;
    }

    const pagePreview = page({
      id: (args?.pageId as string) ?? '',
      idType: PageIdType.DATABASE_ID,
    }) as ReturnType<Schema['query']['page']>;

    const postPreview = post({
      id: (args?.postId as string) ?? '',
      idType: PostIdType.DATABASE_ID,
    }) as ReturnType<Schema['query']['post']>;

    if (hasPageId(args)) {
      return pagePreview;
    }
    if (hasPostId(args)) {
      return postPreview;
    }
  }
  /* eslint-enable consistent-return */

  function useCategory(
    args?: Parameters<Schema['query']['category']>[0],
  ): ReturnType<Schema['query']['category']> {
    const { query } = useRouter();
    const { category } = useQuery();
    let params: Partial<Parameters<Schema['query']['category']>[0]> = defaults(
      {},
      args,
    );

    if (hasCategoryId(query)) {
      params = {
        id: query.categoryId,
        idType: CategoryIdType.ID,
        ...params,
      };
    }
    if (hasCategorySlug(query)) {
      params = {
        id: query.categorySlug,
        idType: CategoryIdType.SLUG,
        ...params,
      };
    }

    if (!isString(params.id)) {
      throw new Error(
        'Invalid parameters for useCategory, you must send in an id or specify known URL params in your config',
      );
    }

    return category(
      params as Parameters<Schema['query']['category']>[0],
    ) as ReturnType<Schema['query']['category']>;
  }

  const useHydrateCache: typeof reactClient.useHydrateCache = ({
    cacheSnapshot,
    shouldRefetch,
  }) => {
    const snapshotCache = useRef('');
    const { client } = useClient();
    if (isString(cacheSnapshot) && snapshotCache.current !== cacheSnapshot) {
      snapshotCache.current = cacheSnapshot;

      client.hydrateCache({ cacheSnapshot, shouldRefetch: false });
    }

    useEffect(() => {
      if (!isObject(client) || !isFunction(client.refetch)) {
        return;
      }

      if (shouldRefetch) {
        client.refetch(client.query).catch(console.error);
      }
    }, [shouldRefetch, client]);
  };

  function useIsLoading() {
    return useQuery().$state.isLoading;
  }

  nextClient = {
    client: coreClient,
    ...reactClient,
    setAsRoot() {
      nextClient.useQuery = reactClient.useQuery;
      nextClient.useLazyQuery = reactClient.useLazyQuery;
      nextClient.useTransactionQuery = reactClient.useTransactionQuery;
      nextClient.usePaginatedQuery = reactClient.usePaginatedQuery;
      nextClient.useMutation = reactClient.useMutation;
      nextClient.useSubscription = reactClient.useSubscription;
      nextClient.useClient = () => nextClient;
    },
    context: clientConfig.context,
    useQuery,
    useLazyQuery,
    useTransactionQuery,
    usePaginatedQuery,
    useMutation,
    useSubscription,
    useClient,
    useHydrateCache,
    useAuth,
    useCategory,
    usePosts,
    usePost,
    usePage,
    usePreview,
    useIsLoading,
  };

  return nextClient;
}
