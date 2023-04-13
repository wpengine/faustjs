import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
  Redirect,
} from 'next';
import type { DocumentNode } from 'graphql';
import isBoolean from 'lodash/isBoolean.js';
import isObject from 'lodash/isObject.js';
import { DEFAULT_ISR_REVALIDATE } from './getWordPressProps.js';
import { addApolloState, getApolloClient } from './client.js';

export interface GetNextServerSidePropsConfig<Props = Record<string, unknown>> {
  Page: {
    query?: DocumentNode;
    variables?: (
      context: GetStaticPropsContext | GetServerSidePropsContext,
    ) => {
      [key: string]: any;
    };
  };
  props?: Props;
  notFound?: true;
  redirect?: Redirect;
}

export interface GetNextStaticPropsConfig<Props = Record<string, unknown>>
  extends GetNextServerSidePropsConfig<Props> {
  revalidate?: number | boolean;
}

export interface FaustPage<Data, Props = void>
  extends React.FC<
    { data?: Data; __PAGE_VARIABLES__?: { [key: string]: any } } & Props
  > {
  query?: DocumentNode;
  variables?: (context: GetStaticPropsContext | GetServerSidePropsContext) => {
    [key: string]: any;
  };
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
): Promise<GetStaticPropsResult<Props>> {
  const { notFound, redirect, Page, revalidate, props } = cfg;
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

  const pageVariables = Page?.variables ? Page?.variables(context) : undefined;

  let pageQueryRes;
  if (Page.query) {
    pageQueryRes = await apolloClient.query({
      query: Page.query,
      variables: pageVariables,
    });
  }

  let returnedProps = { ...props };

  if (pageQueryRes?.data) {
    returnedProps = { ...returnedProps, data: pageQueryRes.data };
  }

  if (pageVariables) {
    returnedProps = { ...returnedProps, __PAGE_VARIABLES__: pageVariables };
  }

  const pageProps = addApolloState(apolloClient, { props: returnedProps });
  pageProps.revalidate = revalidate ?? DEFAULT_ISR_REVALIDATE;
  return pageProps as GetStaticPropsResult<Props>;
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
  const { notFound, redirect, Page, props } = cfg;
  const apolloClient = getApolloClient();

  res.setHeader('x-using', 'faust');

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

  const pageVariables = Page?.variables ? Page?.variables(context) : undefined;

  let pageQueryRes;
  if (Page.query) {
    pageQueryRes = await apolloClient.query({
      query: Page.query,
      variables: pageVariables,
    });
  }

  let returnedProps = { ...props };

  if (pageQueryRes?.data) {
    returnedProps = { ...returnedProps, data: pageQueryRes.data };
  }

  if (pageVariables) {
    returnedProps = { ...returnedProps, __PAGE_VARIABLES__: pageVariables };
  }

  return addApolloState(apolloClient, {
    props: returnedProps,
  }) as GetServerSidePropsResult<Props>;
}
