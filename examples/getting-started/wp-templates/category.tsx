import React from 'react';
import { useGeneralSettings, usePosts } from '@wpengine/headless/react';
import { Pagination } from '@wpengine/headless/next';
import { getApolloClient, getPosts } from '@wpengine/headless';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { Footer, Header, Posts } from '../components';

const POSTS_PER_PAGE = 10;

/**
 * Parts of an optionally paginated category URL path such as
 * /category/uncategorized/[before|after]/[abc123].
 */
interface CategoryUrlParts {
  basePath: string; // '/category/uncategorized'
  category: string; // 'uncategorized'
  keyword?: string; // 'before'
  id?: string; // 'abc123'
}

/**
 * Converts a string or array into category URL parts assuming the
 * form /category/uncategorized/[before|after]/[abc123].
 */
const getCategoryUrlParts = (path: string | string[]): CategoryUrlParts => {
  const parts = Array.isArray(path) ? path : path.split('/').filter(Boolean);
  return {
    basePath: parts.slice(0, 2).join('/'),
    category: parts[1],
    keyword: parts[2],
    id: parts[3],
  };
};

/**
 * Determines WPGraphQL query options from URL info.
 *
 * @see https://www.wpgraphql.com/2020/03/26/forward-and-backward-pagination-with-wpgraphql/.
 */
const getQueryOptions = (url: CategoryUrlParts, postsPerPage: number) => {
  return {
    variables: {
      first: url.keyword === 'after' || !url.keyword ? postsPerPage : undefined,
      last: url.keyword === 'before' ? postsPerPage : undefined,
      after: url.keyword === 'after' ? url.id : undefined,
      before: url.keyword === 'before' ? url.id : undefined,
      where: {
        categoryName: url.category,
      },
    },
  };
};

/**
 * The component to display on category archives.
 */
export default function Category(): JSX.Element {
  const router = useRouter();
  const settings = useGeneralSettings();
  const url = getCategoryUrlParts(router.asPath);
  const options = getQueryOptions(url, POSTS_PER_PAGE);
  const posts = usePosts(options);

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <Posts posts={posts?.nodes} />
        {posts?.pageInfo && (
          <Pagination baseURL={url.basePath} pageInfo={posts.pageInfo} />
        )}
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}

/**
 * Fetch posts from WordPress. The query options in `getPosts()` here must match
 * those from `usePosts()` in the component above.
 *
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const url = getCategoryUrlParts(context?.params?.page || []);
  const client = getApolloClient(context);
  const options = getQueryOptions(url, POSTS_PER_PAGE);
  await getPosts(client, options);
}
