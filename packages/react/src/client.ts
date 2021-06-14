import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient,
} from '@gqless/react';
import {
  client as createClient,
  GeneratedSchema,
} from '@wpengine/headless-core';
import isObject from 'lodash/isObject';

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/explicit-module-boundary-types */
export function client<
  Schema extends {
    query: {
      posts: unknown;
      post: unknown;
      page: unknown;
    };
    mutation: {};
    subscription: {};
  } = GeneratedSchema,
>(createReactClientOpts?: CreateReactClientOptions) {
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
    reactClientOpts = { ...reactClientOpts, ...createReactClientOpts };
  }

  const reactClient = createReactClient<Schema>(coreClient, reactClientOpts);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { useQuery } = reactClient as any as ReactClient<GeneratedSchema>;

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
  const usePosts: Schema['query']['posts'] | GeneratedSchema['query']['posts'] =
    (args) => {
      return useQuery().posts(args);
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
  const usePost: Schema['query']['post'] | GeneratedSchema['query']['post'] = (
    args,
  ) => {
    return useQuery().post(args);
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
  const useGeneralSettings = () => {
    return useQuery().generalSettings;
  };

  const useIsLoading = () => {
    return useQuery().$state.isLoading;
  };

  const usePage: Schema['query']['page'] | GeneratedSchema['query']['page'] = (
    args,
  ) => {
    return useQuery().page(args);
  };

  const usePostsFromCategory = (categorySlug: string) => {
    return useQuery().posts({
      where: {
        categoryIn: [categorySlug],
      },
    });
  };

  return {
    ...reactClient,
    usePosts,
    usePost,
    useGeneralSettings,
    useIsLoading,
    usePage,
    usePostsFromCategory,
  };
}
