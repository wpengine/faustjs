import {
  getNextStaticPaths,
  getNextStaticProps,
  usePost,
} from '@wpengine/headless-next';
import { useGeneralSettings } from '@wpengine/headless-react';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

export default function Page() {
  const settings = useGeneralSettings();
  const post = usePost();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />

      <Head>
        <title>
          {post?.title} - {settings?.title}
        </title>
      </Head>

      <Hero title={post?.title} bgImage={post?.featuredImageId} />

      <main className="content content-single">
        <div className="wrap">
          {post && (
            <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
          )}
        </div>
      </main>

      <Footer copyrightHolder={settings?.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context);
}

export function getStaticPaths() {
  return getNextStaticPaths();
}
