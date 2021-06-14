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
import merge from 'lodash/merge';

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
  const usePosts: Schema['query']['posts'] = (args) => {
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
  const usePost: Schema['query']['post'] = (args) => {
    return useQuery().post(args);
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
  const usePages: Schema['query']['pages'] = (args) => {
    return useQuery().pages(args);
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
  const usePage: Schema['query']['page'] = (args) => {
    return useQuery().page(args);
  };

  const useCategory: Schema['query']['category'] = (args) => {
    return useQuery().category(args);
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
