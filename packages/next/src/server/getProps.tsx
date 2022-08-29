/* eslint-disable react/no-children-prop */
// eslint-disable-next-line import/extensions
import { CategoryIdType, PageIdType, PostIdType } from '@faustjs/core/client';
import isObject from 'lodash/isObject.js';
import isBoolean from 'lodash/isBoolean.js';
import isNil from 'lodash/isNil.js';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetServerSidePropsResult,
  Redirect,
} from 'next';
import { RouterContext } from 'next/dist/shared/lib/router-context.js';

import React, { FunctionComponent, ComponentClass } from 'react';
import { config } from '../config/config.js';
import { getClient, FaustContext } from '../gqty/client.js';

import {
  hasCategoryId,
  hasCategorySlug,
  hasPageId,
  hasPageUri,
  hasPostId,
  hasPostSlug,
  hasPostUri,
} from '../utils/index.js';

export const CLIENT_CACHE_PROP = '__CLIENT_CACHE_PROP';
export const AUTH_CLIENT_CACHE_PROP = '__AUTH_CLIENT_CACHE_PROP';

export interface GetNextServerSidePropsConfig<Props = Record<string, unknown>> {
  client: ReturnType<typeof getClient>;
  Page?:
    | FunctionComponent<Props>
    | ComponentClass<Props>
    | ((props: Props) => JSX.Element);
  props?: Props;
  notFound?: boolean;
  redirect?: Redirect;
}

export interface GetNextStaticPropsConfig<Props = Record<string, unknown>>
  extends GetNextServerSidePropsConfig<Props> {
  revalidate?: number | boolean;
}

export interface PageProps<Props> {
  props: Props & {
    [CLIENT_CACHE_PROP]: string | null;
    [AUTH_CLIENT_CACHE_PROP]: string | null;
  };
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
  }: GetNextServerSidePropsConfig<Props> | GetNextStaticPropsConfig<Props>,
): Promise<PageProps<Props>> {
  let cacheSnapshot: string | undefined;
  let authSnapshot: string | undefined;
  client.setAsRoot();

  if (!isNil(Page)) {
    const authClient = client.auth.client;

    const { cacheSnapshot: coreAuthSnapshot } = await authClient.prepareRender(
      async () => {
        const { cacheSnapshot: coreSnapshot } = await client.prepareReactRender(
          <RouterContext.Provider
            // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/jsx-no-constructed-context-values
            value={{ query: { ...context.params } } as any}>
            {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
            <FaustContext.Provider value={{ client }}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Page {...(props as any)} />
            </FaustContext.Provider>
          </RouterContext.Provider>,
        );

        cacheSnapshot = coreSnapshot;
      },
    );

    authSnapshot = coreAuthSnapshot;
  }

  return {
    props: {
      [CLIENT_CACHE_PROP]: cacheSnapshot ?? null,
      [AUTH_CLIENT_CACHE_PROP]: authSnapshot ?? null,
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

/**
 * This helper function lets you server side render your page with WordPress data
 *
 * @param {GetServerSidePropsContext} context
 * @param {GetNextServerSidePropsConfig} cfg
 * @see https://faustjs.org/docs/next/guides/ssr-ssg#ssr-using-getnextserversideprops
 */
export async function getNextServerSideProps<Props>(
  context: GetServerSidePropsContext,
  cfg: GetNextServerSidePropsConfig<Props>,
): Promise<GetServerSidePropsResult<Props>> {
  const { notFound, redirect } = cfg;

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

  return getProps(context, cfg);
}

/**
 * This helper function lets you build a static site with your WordPress data
 *
 * @param {GetStaticPropsContext} context
 * @param {GetNextStaticPropsConfig} cfg
 * @see https://faustjs.org/docs/next/guides/ssr-ssg#ssg-using-getnextstaticprops
 */
export async function getNextStaticProps<Props>(
  context: GetStaticPropsContext,
  cfg: GetNextStaticPropsConfig<Props>,
): Promise<GetStaticPropsResult<Props>> {
  const { notFound, redirect, revalidate } = cfg;
  const nextConfig = config();

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

  const pageProps: GetStaticPropsResult<Props> = await getProps(context, cfg);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (isObject(pageProps.props)) {
    pageProps.revalidate = !isNil(revalidate)
      ? revalidate
      : nextConfig.revalidate;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return pageProps;
}
