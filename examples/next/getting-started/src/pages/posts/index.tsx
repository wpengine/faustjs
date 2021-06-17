import { getNextStaticProps, client } from '@wpengine/headless-next';
import { Footer, Header, Pagination, Posts } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from 'scss/pages/home.module.scss';

export default function Page() {
  const {
    query = {},
  } = useRouter();
  const { postSlug, postCursor } = query;
  const { usePosts, useGeneralSettings, useQuery } = client();
  const generalSettings = useGeneralSettings();
  const isBefore = postSlug === 'before';
  const posts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
    first: !isBefore ? 6 : undefined,
    last: isBefore ? 6 : undefined,
  });

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

      <main className="content content-index">
        <Posts
          posts={posts.nodes}
          heading="Blog Posts"
          intro="The Posts component in pages/index.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
        <Pagination pageInfo={posts.pageInfo} basePath="/posts" />
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
