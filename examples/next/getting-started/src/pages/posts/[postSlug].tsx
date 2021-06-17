import { getNextStaticProps, client, is404 } from '@wpengine/headless-next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

export default function Page() {
  const { usePost, useGeneralSettings } = client();
  const generalSettings = useGeneralSettings();
  const post = usePost();

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {post.title()} - {generalSettings.title}
        </title>
      </Head>

      <Hero title={post.title()} bgImage={post.featuredImageId} />

      <main className="content content-single">
        <div className="wrap">
          {post && (
            <div dangerouslySetInnerHTML={{ __html: post.content() ?? '' }} />
          )}
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (await is404(context)) {
    return {
      notFound: true,
    };
  }

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
