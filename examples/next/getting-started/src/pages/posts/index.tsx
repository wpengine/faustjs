import { getNextStaticProps, client } from '@wpengine/headless-next';
import { Footer, Header, Posts } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from 'scss/pages/home.module.scss';

export default function Page() {
  const { usePosts, useGeneralSettings, useQuery } = client();
  const generalSettings = useGeneralSettings();
  const posts = usePosts();

  if (useQuery().$state.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content">
        <Posts
          posts={posts.nodes}
          heading="Blog Posts"
          intro="The Posts component in pages/index.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context);
}
