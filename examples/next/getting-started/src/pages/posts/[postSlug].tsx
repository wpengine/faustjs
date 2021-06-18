import { getNextStaticProps, client, is404 } from '@wpengine/headless-next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import type { Post } from '@wpengine/headless-core';

export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
  preview?: boolean;
}

export function PostComponent({ post, preview }: PostProps) {
  const { useGeneralSettings, useQuery } = client();
  const generalSettings = useGeneralSettings();
  const { isLoading } = useQuery().$state;

  if (preview && (typeof window === 'undefined' || isLoading)) {
    return (
      <>
        <Header
          title={generalSettings.title}
          description={generalSettings.description}
        />

        <Hero title={'Loading...'} />

        <main className="content content-single">
          <div className="wrap">
            <div>Loading...</div>
          </div>
        </main>

        <Footer copyrightHolder={generalSettings.title} />
      </>
    );
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {post?.title()} - {generalSettings.title}
        </title>
      </Head>

      <Hero title={post?.title()} bgImage={post?.featuredImageId} />

      <main
        className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePost } = client();
  const post = usePost();

  return <PostComponent post={post} />;
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
