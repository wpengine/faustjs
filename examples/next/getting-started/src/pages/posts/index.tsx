import { getNextStaticProps, client } from '@wpengine/headless-next';
import { Footer, Header, Posts } from 'components';
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
  const isAfter = postSlug === 'after';
  const posts = usePosts({
    after: isAfter ? (postCursor as string) : undefined,
    before: !isAfter ? (postCursor as string) : undefined,
    first: isAfter ? 1 : undefined,
    last: !isAfter ? 1 : undefined,
  });
  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = posts.pageInfo;

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
        {hasPreviousPage === true && (
          <Link href={`/posts/before/${startCursor}`}>
            <a href={`/posts/before/${startCursor}`}>Previous</a>
          </Link>
        )}
        {hasNextPage === true && (
          <Link href={`/posts/after/${endCursor}`}>
            <a href={`/posts/after/${endCursor}`}>Next</a>
          </Link>
        )}
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
