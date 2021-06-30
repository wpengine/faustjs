import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient as GQlessReactClient,
} from '@gqless/react';
import {
  CategoryIdType,
  ClientConfig,
  getClient as getCoreClient,
  PageIdType,
  PostIdType,
} from '@faustjs/core';
import { GQlessClient } from 'gqless';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';

export interface Node {
  id?: string | null;
}

export interface RequiredQuery {
  posts: (args?: {
    where?: {
      categoryId?: number;
      categoryName?: string;
    };
  }) => unknown;
  post: (args: { id: string; idType?: PostIdType }) => Node | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages: (args?: any) => unknown;
  page: (args: { id: string; idType?: PageIdType }) => Node | null | undefined;
  category: (args: {
    id: string;
    idType?: CategoryIdType;
  }) => Node | null | undefined;
  generalSettings?: unknown;
}

export interface RequiredSchema {
  query: RequiredQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscription: any;
}

export interface ReactClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
> extends GQlessReactClient<Schema> {
  client: GQlessClient<Schema>;

  useCategory(
    args: Parameters<Schema['query']['category']>[0],
  ): ReturnType<Schema['query']['category']>;

  usePosts(
    args: Parameters<Schema['query']['posts']>[0],
  ): ReturnType<Schema['query']['posts']>;

  usePost(
    args: Parameters<Schema['query']['post']>[0],
  ): ReturnType<Schema['query']['post']>;

  usePages(
    args: Parameters<Schema['query']['pages']>[0],
  ): ReturnType<Schema['query']['pages']>;

  usePage(
    args: Parameters<Schema['query']['page']>[0],
  ): ReturnType<Schema['query']['page']>;

  useGeneralSettings(): Schema['query']['generalSettings'];

  useIsLoading(): boolean;
}

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

  const { useQuery } = reactClient;

  /**
   * React Hook for retrieving a list of posts from your WordPress site
   *
   * @example
   * ```tsx
   * import { usePosts } from '../client'
   *
   * export function ListPosts() {
   *   const posts = usePosts();
   *
   *   if (!posts) {
   *     return <></>;
   *   }
   *
   *   return (
   *     <>
   *       {posts.map((post) => (
   *         <div key={post?.id} dangerouslySetInnerHTML={ { __html: post?.content() ?? '' } } />
   *       ))}
   *     </>
   *   );
   * }
   * }
   * ```
   */
  const usePosts = (args: Parameters<Schema['query']['posts']>[0]) => {
    return useQuery().posts(args) as ReturnType<Schema['query']['posts']>;
  };

  /**
   * React Hook for retrieving the post based on the current URI. Uses window.location if necessary
   *
   * @example
   * ```tsx
   * import { usePost } from '../client';
   *
   * export default function Post() {
   *   const post = usePost();
   *
   *   return (
   *     <div>
   *       {post && (
   *         <div>
   *           <div>
   *             <h5>{post?.title}</h5>
   *             <p dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} />
   *           </div>
   *         </div>
   *       )}
   *     </div>
   *   );
   * }
   * ```
   */
  const usePost = (args: Parameters<Schema['query']['post']>[0]) => {
    return useQuery().post(args) as ReturnType<Schema['query']['post']>;
  };

  /**
   * React Hook for retrieving a list of posts from your WordPress site
   *
   * @example
   * ```tsx
   * import { usePages } from '../client'
   *
   * export function ListPages() {
   *   const pages = usePages();
   *
   *   if (!pages) {
   *     return <></>;
   *   }
   *
   *   return (
   *     <>
   *       {pages.map((page) => (
   *         <div key={page?.id} dangerouslySetInnerHTML={ { __html: page?.content() ?? '' } } />
   *       ))}
   *     </>
   *   );
   * }
   * }
   * ```
   */
  const usePages = (args: Parameters<Schema['query']['pages']>[0]) => {
    return useQuery().pages(args) as ReturnType<Schema['query']['pages']>;
  };

  /**
   * React Hook for retrieving the page based on the current URI. Uses window.location if necessary
   *
   * @example
   * ```tsx
   * import { usePage } from '../client';
   *
   * export default function Page() {
   *   const page = usePage();
   *
   *   return (
   *     <div>
   *       {page && (
   *         <div>
   *           <div>
   *             <h5>{page?.title}</h5>
   *             <p dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
   *           </div>
   *         </div>
   *       )}
   *     </div>
   *   );
   * }
   * ```
   */
  const usePage = (args: Parameters<Schema['query']['page']>[0]) => {
    return useQuery().page(args) as ReturnType<Schema['query']['page']>;
  };

  const useCategory = (args: Parameters<Schema['query']['category']>[0]) => {
    return useQuery().category(args) as ReturnType<Schema['query']['category']>;
  };

  /**
   * React Hook for retrieving the general settings (title, description) form your WordPress site
   *
   * @example
   * ```tsx
   * import {useGeneralSettings} from '../client';
   *
   * export function Header() {
   *  const settings = useGeneralSettings();
   *
   *  return(
   *    <header>
   *      <h1>{settings?.title}</h1>
   *      <h2>{settings?.description}</h2>
   *    </header>
   *  )
   * }
   * ```
   */
  const useGeneralSettings: () => Schema['query']['generalSettings'] = () => {
    return useQuery().generalSettings;
  };

  const useIsLoading = () => {
    return useQuery().$state.isLoading;
  };

  const c: ReactClient<Schema, ObjectTypesNames, ObjectTypes> = {
    client: coreClient,
    ...reactClient,
    useCategory,
    usePosts,
    usePost,
    usePages,
    usePage,
    useGeneralSettings,
    useIsLoading,
  };

  return c;
}
