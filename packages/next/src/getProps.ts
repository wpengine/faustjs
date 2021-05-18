import { getApolloClient } from '@wpengine/headless-core';
import { stringifyGql } from '@wpengine/headless-core/utils';
import { addApolloState, QueriesConfig } from '@wpengine/headless-react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { fetchData } from './serverSide';

export interface NextPropsConfig {
  queries?: QueriesConfig;
}

export interface PagePropsWithApollo extends Record<string, unknown> {
  props: Record<string, unknown>;
}

/* eslint-disable consistent-return */
function stringifyQueries(queries?: QueriesConfig): QueriesConfig | undefined {
  if (!queries) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let toStr: any = {};

  if (queries.post) {
    toStr = {
      post: {
        variables: queries.post.variables ?? null,
      },
      ...toStr,
    };

    if (queries.post.fragments) {
      toStr.post.fragments = {
        postData: stringifyGql(queries.post.fragments.postData) ?? null,
        pageData: stringifyGql(queries.post.fragments.pageData) ?? null,
      };
    }
  }

  if (queries.posts) {
    toStr = {
      posts: {
        variables: queries.posts.variables ?? null,
      },
      ...toStr,
    };

    if (queries.posts.fragments) {
      toStr.posts.fragments = {
        listPostData:
          stringifyGql(queries.posts.fragments.listPostData) ?? null,
      };
    }
  }

  return toStr as QueriesConfig;
}
/* eslint-enable consistent-return */

async function getProps<
  Context extends GetStaticPropsContext | GetStaticPropsContext,
>(
  context: Context,
  config: NextPropsConfig = {},
): Promise<PagePropsWithApollo> {
  const client = getApolloClient(context);

  await fetchData(context, config.queries);

  return addApolloState(client, {
    props: {
      queries: stringifyQueries(config.queries) ?? null,
    },
  });
}

export async function getNextServerSideProps(
  context: GetServerSidePropsContext,
  config: NextPropsConfig = {},
): Promise<PagePropsWithApollo> {
  return getProps(context, config);
}

export async function getNextStaticProps(
  context: GetStaticPropsContext,
  config: NextPropsConfig = {},
): Promise<PagePropsWithApollo> {
  const pageProps = await getProps(context, config);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (
    (pageProps as Record<string, any> & { props: Record<string, unknown> })
      ?.props
  ) {
    (
      pageProps as Record<string, any> & {
        props: Record<string, unknown>;
      }
    ).revalidate = 1;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return pageProps;
}
