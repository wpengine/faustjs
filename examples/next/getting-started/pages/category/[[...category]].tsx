import {
  categoryOptions,
  getApolloClient,
  getPosts,
} from '@wpengine/headless-core';
import {
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless-next';
import { useGeneralSettings, usePosts } from '@wpengine/headless-react';
import { Footer, Header, Posts, Pagination } from 'components';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const POSTS_PER_PAGE = 10;

export default function Page() {
  const router = useRouter();

  const posts = usePosts(categoryOptions(router.asPath, POSTS_PER_PAGE));
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />

      <main className="content content-index">
        <Posts posts={posts?.nodes} />
        {posts?.pageInfo && <Pagination pageInfo={posts.pageInfo} />}
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

  let archiveDirectoryName = 'category';
  let categoryOptionsUrlParams = [
    archiveDirectoryName,
    ...Array.from(context?.params?.category),
  ];

  await getPosts(
    client,
    categoryOptions(categoryOptionsUrlParams, POSTS_PER_PAGE),
  );

  return getNextStaticProps(context);
}

export function getStaticPaths() {
  return getNextStaticPaths();
}
