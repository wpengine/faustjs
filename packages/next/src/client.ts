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

  const usePosts: Schema['query']['posts'] = (args) => {
    return useQuery().posts(args);
  };

  const usePost: Schema['query']['post'] = (args) => {
    const router = useRouter();
    const { post } = useQuery();

    if (!isObject(args)) {
      const { query } = router;

      if (hasPostId(query)) {
        return post({
          id: query.postId,
          idType: PostIdType.ID,
        });
      }
      if (hasPostSlug(query)) {
        return post({
          id: query.postSlug,
          idType: PostIdType.SLUG,
        });
      }
      if (hasPostUri(query)) {
        return post({
          id: query.postUri.join('/'),
          idType: PostIdType.URI,
        });
      }
      if (hasPostPreviewUri(query)) {
        return post({
          id: query.postPreviewUri.join('/'),
          idType: PostIdType.URI,
          asPreview: true,
        });
      }
    }

    return post(args);
  };

  const usePages: Schema['query']['pages'] = (args) => {
    return useQuery().pages(args);
  };

  const usePage: Schema['query']['page'] = (args) => {
    const router = useRouter();
    const { page } = useQuery();

    if (!isObject(args)) {
      const { query } = router;

      if (hasPageId(query)) {
        return page({
          id: query.pageId,
          idType: PageIdType.ID,
        });
      }
      if (hasPageUri(query)) {
        return page({
          id: query.pageUri.join('/'),
          idType: PageIdType.URI,
        });
      }
      if (hasPagePreviewUri(query)) {
        return page({
          id: query.pagePreviewUri.join('/'),
          idType: PageIdType.URI,
          asPreview: true,
        });
      }
    }

    return page(args);
  };

  const useCategory: Schema['query']['category'] = (args) => {
    const router = useRouter();
    const { category } = useQuery();

    if (!isObject(args)) {
      const { query } = router;

      if (hasCategoryId(query)) {
        return category({
          id: query.categoryId,
          idType: CategoryIdType.ID,
        });
      }
      if (hasCategorySlug(query)) {
        return category({
          id: query.categorySlug,
          idType: CategoryIdType.SLUG,
        });
      }
    }

    return category(args);
  };

  const useGeneralSettings: () => Schema['query']['generalSettings'] = () => {
    return useQuery().generalSettings;
  };

  return {
    ...reactClient,
    useCategory,
    usePosts,
    usePost,
    usePages,
    usePage,
    useGeneralSettings,
  };
}
