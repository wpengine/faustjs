import React from 'react';
import { useGeneralSettings, usePosts } from '@wpengine/headless/react';
import { getApolloClient, getPosts } from '@wpengine/headless';
import { GetStaticPropsContext } from 'next';
import { Footer, Header, Posts } from '../components';

export default function Category(): JSX.Element {
  const posts = usePosts({
    variables: {
      where: { categoryName: 'uncategorized' }, // TODO: Extract the category slug from the URL.
      // TODO: add pagination vars.
    },
  });

  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <section className="wrap">
          <p>TODO: remove me – checking that category.tsx is loading.</p>
        </section>
        <Posts posts={posts?.nodes} />
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  await getPosts(client, {
    variables: {
      where: { categoryName: 'uncategorized' }, // TODO: extract the category slug from the URL.
      // TODO: add pagination vars.
    },
  });
}
