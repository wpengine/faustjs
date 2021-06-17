import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient,
} from '@gqless/react';
import type { LoggerOptions } from '@gqless/logger';
import { useRouter } from 'next/router';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import {
  CategoryIdType,
  client as createClient,
  GeneratedSchema,
  PostIdType,
  PageIdType,
  ensureAuthorization,
} from '@wpengine/headless-core';
import { useEffect } from 'react';
import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
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

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/explicit-module-boundary-types */
export function client<Schema extends GeneratedSchema = GeneratedSchema>(
  createReactClientOpts?: CreateReactClientOptions,
) {
  const coreClient = createClient<Schema>();

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
  const { useQuery } = reactClient as ReactClient<GeneratedSchema>;

  function usePosts(
    args?: Parameters<Schema['query']['posts']>[0],
  ): ReturnType<Schema['query']['posts']> {
    const router = useRouter();
    const { posts } = useQuery();

    if (!isObject(args)) {
      const { query } = router;

      if (hasCategoryId(query)) {
        return posts({
          where: {
            categoryId: Number(query.categoryId),
          },
        }) as ReturnType<Schema['query']['posts']>;
      }

      if (hasCategorySlug(query)) {
        return posts({
          where: {
            categoryName: query.categorySlug,
          },
        }) as ReturnType<Schema['query']['posts']>;
      }
    }

    return posts(args as Parameters<Schema['query']['posts']>[0]) as ReturnType<
      Schema['query']['posts']
    >;
  }

  function usePost(
    args?: Parameters<Schema['query']['post']>[0],
  ): ReturnType<Schema['query']['post']> {
    const router = useRouter();
    const { post } = useQuery();

    if (!isObject(args)) {
      const { query } = router;

      if (hasPostId(query)) {
        return post({
          id: query.postId,
          idType: PostIdType.ID,
        }) as ReturnType<Schema['query']['post']>;
      }
      if (hasPostSlug(query)) {
        return post({
          id: query.postSlug,
          idType: PostIdType.SLUG,
        }) as ReturnType<Schema['query']['post']>;
      }
      if (hasPostUri(query)) {
        return post({
          id: query.postUri.join('/'),
          idType: PostIdType.URI,
        }) as ReturnType<Schema['query']['post']>;
      }
    }

    return post(args as Parameters<Schema['query']['post']>[0]) as ReturnType<
      Schema['query']['post']
    >;
  }

  const usePages: Schema['query']['pages'] = (args) => {
    return useQuery().pages(args);
  };

  function usePage(
    args?: Parameters<Schema['query']['page']>[0],
  ): ReturnType<Schema['query']['page']> {
    const router = useRouter();
    const { page } = useQuery();

    if (!isObject(args)) {
      const { query } = router;

      if (hasPageId(query)) {
        return page({
          id: query.pageId,
          idType: PageIdType.ID,
        }) as ReturnType<Schema['query']['page']>;
      }
      if (hasPageUri(query)) {
        return page({
          id: query.pageUri.join('/'),
          idType: PageIdType.URI,
        }) as ReturnType<Schema['query']['page']>;
      }
    }

    return page(args as Parameters<Schema['query']['page']>[0]) as ReturnType<
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
    const router = useRouter();
    const { category } = useQuery();

    if (!isObject(args)) {
      const { query } = router;

      if (hasCategoryId(query)) {
        return category({
          id: query.categoryId,
          idType: CategoryIdType.ID,
        }) as ReturnType<Schema['query']['category']>;
      }
      if (hasCategorySlug(query)) {
        return category({
          id: query.categorySlug,
          idType: CategoryIdType.SLUG,
        }) as ReturnType<Schema['query']['category']>;
      }
    }

    return category(
      args as Parameters<Schema['query']['category']>[0],
    ) as ReturnType<Schema['query']['category']>;
  }

  const useGeneralSettings: () => Schema['query']['generalSettings'] = () => {
    return useQuery().generalSettings;
  };

  return {
    client: coreClient,
    ...reactClient,
    useCategory,
    usePosts,
    usePost,
    usePages,
    usePage,
    usePreview,
    useGeneralSettings,
  };
}

export async function logQueries(options?: LoggerOptions): Promise<() => void> {
  try {
    const { createLogger } = await import('@gqless/logger');
    const logger = createLogger(
      client().client,
      defaults({}, options, {
        showSelections: false,
        showCache: false,
      } as LoggerOptions),
    );
    return logger.start();
  } catch (e) {
    return () => {};
  }
}
