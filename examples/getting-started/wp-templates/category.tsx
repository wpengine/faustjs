import React from 'react';
import { useGeneralSettings, usePosts } from '@wpengine/headless/react';
import { Pagination } from '@wpengine/headless/next';
import { getApolloClient, getPosts, categoryOptions } from '@wpengine/headless';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { Footer, Header, Posts } from '../components';

const POSTS_PER_PAGE = 10;

/**
 * The component to display on category archives.
 */
export default function Category(): JSX.Element {
  const router = useRouter();
  const posts = usePosts(categoryOptions(router.asPath, POSTS_PER_PAGE));
  const settings = useGeneralSettings();
  const basePath = router.asPath.split('/').slice(0, 3).join('/');

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <Posts posts={posts?.nodes} />
        {posts?.pageInfo && (
          <Pagination baseURL={basePath} pageInfo={posts.pageInfo} />
        )}
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}

/**
 * Fetch posts for the current category from WordPress. The query options in
 * `getPosts()` here must match those from `usePosts()` in the component above.
 *
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  await getPosts(
    client,
    categoryOptions(context?.params?.page ?? '', POSTS_PER_PAGE),
  );
}
