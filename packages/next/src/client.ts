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
  client as createClient,
  GeneratedSchema,
  PostIdType,
  PageIdType,
} from '@wpengine/headless-core';
import {
  hasCategoryId,
  hasCategorySlug,
  hasPageId,
  hasPageUri,
  hasPagePreviewUri,
  hasPostId,
  hasPostSlug,
  hasPostUri,
  hasPostPreviewUri,
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
      if (hasPostPreviewUri(query)) {
        return post({
          id: query.postPreviewUri.join('/'),
          idType: PostIdType.URI,
          asPreview: true,
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
      if (hasPagePreviewUri(query)) {
        return page({
          id: query.pagePreviewUri.join('/'),
          idType: PageIdType.URI,
          asPreview: true,
        }) as ReturnType<Schema['query']['page']>;
      }
    }

    return page(args as Parameters<Schema['query']['page']>[0]) as ReturnType<
      Schema['query']['page']
    >;
  }

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
    useGeneralSettings,
  };
}
