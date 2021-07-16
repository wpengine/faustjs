import type { GQlessClient } from 'gqless';
import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient,
} from '@gqless/react';
import React, { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import {
  CategoryIdType,
  ClientConfig,
  getClient as getCoreClient,
  PageIdType,
  PostIdType,
  ensureAuthorization,
  WithClient,
} from '@faustjs/core';
import type { RequiredSchema } from '@faustjs/react';
import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
import isFunction from 'lodash/isFunction';
import type { IncomingMessage } from 'http';
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

    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      const authResult = ensureAuthorization(window.location.href, {
        request: client.context,
      });

      if (
        !isString(authResult) &&
        isString(authResult?.redirect) &&
        !haveServerContext
      ) {
        setTimeout(() => {
          window.location.replace(authResult?.redirect as string);
        }, 200);
      }
    }, [client]);

    const { post, page } = client.useQuery();

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
    useCategory,
    usePosts,
    usePost,
    usePage,
    usePreview,
    useIsLoading,
  };

  return nextClient;
}
