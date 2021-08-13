/* eslint-disable react/no-children-prop */
import { CategoryIdType, PageIdType, PostIdType } from '@faustjs/core';
import { isBoolean, isNumber, isObject } from 'lodash';
import isNil from 'lodash/isNil';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetServerSidePropsResult,
  Redirect,
} from 'next';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import React, { FunctionComponent, ComponentClass } from 'react';
import { getClient, HeadlessContext } from './client';

import {
  hasCategoryId,
  hasCategorySlug,
  hasPageId,
  hasPageUri,
  hasPostId,
  hasPostSlug,
  hasPostUri,
} from './utils';

export const CLIENT_CACHE_PROP = '__CLIENT_CACHE_PROP';

export interface GetNextServerSidePropsConfig<Props = Record<string, unknown>> {
  client: ReturnType<typeof getClient>;
  Page?: FunctionComponent | ComponentClass;
  props?: Props;
  notFound?: boolean;
  redirect?: Redirect;
}

export interface GetNextStaticPropsConfig<Props = Record<string, unknown>> {
  client: ReturnType<typeof getClient>;
  Page?: FunctionComponent | ComponentClass;
  props?: Props;
  revalidate?: number | boolean;
  notFound?: boolean;
  redirect?: Redirect;
}

export interface PageProps<Props> {
  props: Props & { [CLIENT_CACHE_PROP]: string | null };
}

export interface Is404Config {
  client: ReturnType<typeof getClient>;
}

export async function getProps<
  Context extends GetStaticPropsContext | GetServerSidePropsContext,
  Props,
>(
  context: Context,
  {
    client,
    Page,
    props,
  }: GetNextServerSidePropsConfig | GetNextStaticPropsConfig,
): Promise<PageProps<Props>> {
  let cacheSnapshot: string | undefined;
  client.setAsRoot();

  if (!isNil(Page)) {
    let renderResult = await client.prepareReactRender(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <RouterContext.Provider value={{ query: { ...context.params } } as any}>
        <HeadlessContext.Provider value={{ client }}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Page {...props} />
        </HeadlessContext.Provider>
      </RouterContext.Provider>,
    );

    renderResult = await client.prepareReactRender(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <RouterContext.Provider value={{ query: { ...context.params } } as any}>
        <HeadlessContext.Provider value={{ client }}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Page {...props} />
        </HeadlessContext.Provider>
      </RouterContext.Provider>,
    );

    cacheSnapshot = renderResult.cacheSnapshot;
  }

  return {
    props: {
      [CLIENT_CACHE_PROP]: cacheSnapshot ?? null,
      ...props,
    },
  } as PageProps<Props>;
}

export async function is404<
  Context extends GetStaticPropsContext | GetServerSidePropsContext,
>({ params }: Context, { client }: Is404Config): Promise<boolean> {
  if (!params) {
    return false;
  }

  const {
    client: { inlineResolved, query },
  } = client;
  let entityExists = false;
  let result: Promise<string | null | undefined> | string | null | undefined;

  try {
    if (hasPostId(params)) {
      result = inlineResolved(
        () => {
          return query.post({
            id: params.postId,
            idType: PostIdType.ID,
          })?.id;
        },
        { refetch: true },
      );
    } else if (hasPostSlug(params)) {
      result = inlineResolved(
        () => {
          return query.post({
            id: params.postSlug,
            idType: PostIdType.SLUG,
          })?.id;
        },
        { refetch: true },
      );
    } else if (hasPostUri(params)) {
      result = inlineResolved(
        () => {
          return query.post({
            id: params.postUri.join('/'),
            idType: PostIdType.URI,
          })?.id;
        },
        { refetch: true },
      );
    } else if (hasPageId(params)) {
      result = inlineResolved(
        () => {
          return query.page({
            id: params.pageId,
            idType: PageIdType.ID,
          })?.id;
        },
        { refetch: true },
      );
    } else if (hasPageUri(params)) {
      result = inlineResolved(
        () => {
          return query.page({
            id: params.pageUri.join('/'),
            idType: PageIdType.URI,
          })?.id;
        },
        { refetch: true },
      );
    } else if (hasCategoryId(params)) {
      result = inlineResolved(
        () => {
          return query.category({
            id: params.categoryId,
            idType: CategoryIdType.ID,
          })?.id;
        },
        { refetch: true },
      );
    } else if (hasCategorySlug(params)) {
      result = inlineResolved(
        () => {
          return query.category({
            id: params.categorySlug,
            idType: CategoryIdType.SLUG,
          })?.id;
        },
        { refetch: true },
      );
    }
  } catch (e) {
    return true;
  }

  if (result instanceof Promise) {
    entityExists = !isNil(await result);
  } else {
    entityExists = !isNil(result);
  }

  return !entityExists;
}

export async function getNextServerSideProps<Props>(
  context: GetServerSidePropsContext,
  config: GetNextServerSidePropsConfig,
): Promise<GetServerSidePropsResult<Props>> {
  const { notFound, redirect } = config;

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

  return getProps(context, config);
}

export async function getNextStaticProps<Props>(
  context: GetStaticPropsContext,
  config: GetNextStaticPropsConfig,
): Promise<GetStaticPropsResult<Props>> {
  const { notFound, redirect, revalidate } = config;

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

  const pageProps: GetStaticPropsResult<Props> = await getProps(
    context,
    config,
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (isObject(pageProps.props)) {
    pageProps.revalidate = isNumber(revalidate) ? revalidate : 1;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return pageProps;
}
