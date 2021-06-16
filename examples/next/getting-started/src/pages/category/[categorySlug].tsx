import { client, getNextStaticProps } from '@wpengine/headless-next';
import Head from 'next/head';
import { Header, Footer, Posts } from 'components';
import { GetStaticPropsContext } from 'next';

export default function Page() {
  const { useGeneralSettings, usePosts } = client();
  const generalSettings = useGeneralSettings();
  const posts = usePosts();

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
        {/* {posts?.pageInfo && <Pagination pageInfo={posts.pageInfo} />} */}
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
