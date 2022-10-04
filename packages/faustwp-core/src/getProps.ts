import {
  GetStaticPropsContext,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
  Redirect,
} from 'next';
import type { DocumentNode } from 'graphql';
import isBoolean from 'lodash/isBoolean.js';
import isObject from 'lodash/isObject.js';
import { addApolloState, getApolloClient } from './client.js';

export interface GetNextServerSidePropsConfig<Props = Record<string, unknown>> {
  Page: {
    query?: DocumentNode;
    variables?: (
      context: GetStaticPropsContext | GetServerSidePropsContext,
    ) => { [key: string]: any };
  };
  props?: Props;
  notFound?: boolean;
  redirect?: Redirect;
}

export interface GetNextStaticPropsConfig<Props = Record<string, unknown>>
  extends GetNextServerSidePropsConfig<Props> {
  revalidate?: number | boolean;
}

/**
 * This helper function lets you build a static site with your WordPress data
 *
 * @param {GetStaticPropsContext} context
 * @param {GetNextStaticPropsConfig} cfg
 */
export async function getNextStaticProps<Props>(
  context: GetStaticPropsContext,
  cfg: GetNextStaticPropsConfig<Props>,
) {
  const { notFound, redirect, Page } = cfg;
  const apolloClient = getApolloClient();

  if (isBoolean(notFound) && notFound === true) {
    return {
      notFound,
    };
  }

  if (isObject(redirect)) {
    return {
      redirect,
    };
  }

  if (Page.query) {
    await apolloClient.query({
      query: Page.query,
      variables: Page?.variables ? Page?.variables(context) : undefined,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return addApolloState(apolloClient, { props: {} });
}

/**
 * This helper function lets you server side render your page with WordPress data
 *
 * @param {GetServerSidePropsContext} context
 * @param {GetNextServerSidePropsConfig} cfg
 */
export async function getNextServerSideProps<Props>(
  context: GetServerSidePropsContext,
  cfg: GetNextServerSidePropsConfig<Props>,
): Promise<GetServerSidePropsResult<Props>> {
  const { res } = context;
  const { notFound, redirect, Page } = cfg;
  const apolloClient = getApolloClient();

  res.setHeader('x-powered-by', 'Faust');

  if (isBoolean(notFound) && notFound === true) {
    return {
      notFound,
    };
  }

  if (isObject(redirect)) {
    return {
      redirect,
    };
  }

  if (Page.query) {
    await apolloClient.query({
      query: Page.query,
      variables: Page?.variables ? Page?.variables(context) : undefined,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return addApolloState(apolloClient, {
    props: {},
  }) as GetServerSidePropsResult<Props>;
}
