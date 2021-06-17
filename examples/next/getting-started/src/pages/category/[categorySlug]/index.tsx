import { client, getNextStaticProps } from '@wpengine/headless-next';
import Head from 'next/head';
import { Header, Footer, Posts, Pagination } from 'components';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const POSTS_PER_PAGE = 6;

export default function Page() {
  const { useGeneralSettings, usePosts } = client();
  const { query = {} } = useRouter();
  const { categorySlug, paginationTerm, categoryCursor } = query;
  const generalSettings = useGeneralSettings();
  const isBefore = paginationTerm === 'before';
  const posts = usePosts({
    after: !isBefore ? (categoryCursor as string) : undefined,
    before: isBefore ? (categoryCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
    where: {
      categoryName: categorySlug as string,
    },
  });

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Posts - {generalSettings?.title}</title>
      </Head>

      <main className="content content-index">
        <Posts posts={posts.nodes} />

        <Pagination
          pageInfo={posts.pageInfo}
          basePath={`/category/${categorySlug}`}
        />
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
