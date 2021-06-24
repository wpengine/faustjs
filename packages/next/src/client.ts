import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient,
} from '@gqless/react';
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
} from '@wpengine/headless-core';
import type { RequiredSchema } from '@wpengine/headless-react';
import { useEffect, useRef } from 'react';
import isString from 'lodash/isString';
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
import { defaults } from 'lodash';

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
) {
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

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { useQuery } = reactClient as ReactClient<Schema>;

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

  const usePages: Schema['query']['pages'] = (args) => {
    return useQuery().pages(args);
  };

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
    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      const authResult = ensureAuthorization(window.location.href);

      if (!isString(authResult) && isString(authResult?.redirect)) {
        setTimeout(() => {
          window.location.replace(authResult?.redirect as string);
        }, 200);
      }
    }, []);

    const { post, page } = useQuery();

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

  const useGeneralSettings: () => Schema['query']['generalSettings'] = () => {
    return useQuery().generalSettings;
  };

  const useHydrateCache: typeof reactClient.useHydrateCache = ({
    cacheSnapshot,
    shouldRefetch,
  }) => {
    const snapshotCache = useRef('');
    if (isString(cacheSnapshot) && snapshotCache.current !== cacheSnapshot) {
      snapshotCache.current = cacheSnapshot;

      coreClient.hydrateCache({ cacheSnapshot, shouldRefetch: false });
    }

    useEffect(() => {
      if (shouldRefetch) {
        coreClient.refetch(coreClient.query).catch(console.error);
      }
    }, [shouldRefetch]);
  };

  const useIsLoading = () => {
    return useQuery().$state.isLoading;
  };

  return {
    client: coreClient,
    ...reactClient,
    useHydrateCache,
    useCategory,
    usePosts,
    usePost,
    usePages,
    usePage,
    usePreview,
    useGeneralSettings,
    useIsLoading,
  };
}
