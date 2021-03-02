import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { addApolloState, QueriesConfig } from '../react/provider';
import { getApolloClient } from '../api';
import * as templateLoader from './NextTemplateLoader';
import { fetchData } from './serverSide';
import { Templates } from '../react';
import { stringifyGql } from '../utils';

export interface NextPropsConfig {
  templates?: Templates<templateLoader.NextTemplate>;
  queries?: QueriesConfig;
}

/* eslint-disable consistent-return */
function stringifyQueries(queries?: QueriesConfig): QueriesConfig | undefined {
  if (!queries) {
    return;
  }

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
  Context extends GetStaticPropsContext | GetStaticPropsContext
>(
  loadTemplates: (
    context: Context,
    templates: Templates<templateLoader.NextTemplate>,
  ) => Promise<unknown>,
  context: Context,
  config: NextPropsConfig = {},
) {
  const client = getApolloClient(context);

  if (config.templates) {
    await loadTemplates(context, config.templates);
  }

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
) {
  return getProps(
    async (ctx, templates) => {
      return templateLoader.getServerSideProps(ctx, templates);
    },
    context,
    config,
  );
}

export async function getNextStaticProps(
  context: GetStaticPropsContext,
  config: NextPropsConfig = {},
) {
  const pageProps = await getProps(
    async (ctx, templates) => {
      return templateLoader.getStaticProps(ctx, templates);
    },
    context,
    config,
  );

  if (
    (pageProps as Record<string, any> & { props: Record<string, unknown> })
      ?.props
  ) {
    (pageProps as Record<string, any> & {
      props: Record<string, unknown>;
    }).revalidate = 1;
  }

  return pageProps;
}
