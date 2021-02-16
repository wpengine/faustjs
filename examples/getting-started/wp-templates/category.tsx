import React from 'react';
import { useGeneralSettings, usePosts } from '@wpengine/headless/react';
import { getApolloClient, getPosts } from '@wpengine/headless';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { Footer, Header, Posts } from '../components';

export default function Category(): JSX.Element {
  const router = useRouter();
  const urlParts = router.asPath.split('/').filter(Boolean);
  const category = urlParts[1];
  const posts = usePosts({
    variables: {
      where: { categoryName: category },
    },
  });
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <Posts posts={posts?.nodes} />
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  let urlParts: Array<string> = [];
  if (Array.isArray(context?.params?.page) && context?.params?.page) {
    urlParts = context?.params?.page;
  }
  const category = urlParts[1];
  const client = getApolloClient(context);
  await getPosts(client, {
    variables: {
      where: { categoryName: category },
    },
  });
}
