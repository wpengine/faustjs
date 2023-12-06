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

type Props = Record<string, unknown>;

export interface GetNextServerSidePropsConfig<TProps = Props> {
  Page: {
    query?: DocumentNode;
    variables?: (
      context: GetStaticPropsContext | GetServerSidePropsContext,
      extra?: TProps,
    ) => {
      [key: string]: any;
    };
  };
  props?: TProps;
  notFound?: true;
  redirect?: Redirect;
  /**
   * Provide extra parameters for the Page.variables function call.
   */
  extra?: TProps;
}

export interface GetNextStaticPropsConfig<TProps = Props>
  extends GetNextServerSidePropsConfig<TProps> {
  revalidate?: number | boolean;
}

export interface FaustPage<Data, TProps = void>
  extends React.FC<
    { data?: Data; __PAGE_VARIABLES__?: { [key: string]: any } } & TProps
  > {
  query?: DocumentNode;
  variables?: (
    context: GetStaticPropsContext | GetServerSidePropsContext,
    extra?: Props,
  ) => {
    [key: string]: any;
  };
}

/**
 * This helper function lets you build a static site with your WordPress data
 *
 * @param {GetStaticPropsContext} context
 * @param {GetNextStaticPropsConfig} cfg
 */
export async function getNextStaticProps<TProps>(
  context: GetStaticPropsContext,
  cfg: GetNextStaticPropsConfig<TProps>,
): Promise<GetStaticPropsResult<TProps>> {
  const { notFound, redirect, Page, revalidate, props, extra } = cfg;
  const apolloClient = getApolloClient();
  if (isBoolean(notFound) && notFound === true) {
    return {
      notFound,
      revalidate: DEFAULT_ISR_REVALIDATE,
    };
  }

  if (isObject(redirect)) {
    return {
      redirect,
    };
  }

  const pageVariables = Page?.variables
    ? Page?.variables(context, extra)
    : undefined;

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
  return pageProps as GetStaticPropsResult<TProps>;
}

/**
 * This helper function lets you server side render your page with WordPress data
 *
 * @param {GetServerSidePropsContext} context
 * @param {GetNextServerSidePropsConfig} cfg
 */
export async function getNextServerSideProps<TProps>(
  context: GetServerSidePropsContext,
  cfg: GetNextServerSidePropsConfig<TProps>,
): Promise<GetServerSidePropsResult<TProps>> {
  const { res } = context;
  const { notFound, redirect, Page, props, extra } = cfg;
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

  const pageVariables = Page?.variables
    ? Page?.variables(context, extra)
    : undefined;

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
  }) as GetServerSidePropsResult<TProps>;
}
