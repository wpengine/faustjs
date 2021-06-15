import {
  CategoryIdType,
  PageIdType,
  PostIdType,
} from '@wpengine/headless-core';
import { isObject } from 'lodash';
import isNil from 'lodash/isNil';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetServerSidePropsResult,
} from 'next';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import React, { FunctionComponent, ComponentClass } from 'react';
import { client } from './client';
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

export interface NextPropsConfig<Props = Record<string, unknown>> {
  Page?: FunctionComponent | ComponentClass;
  props?: Props;
}

export interface PageProps<Props> {
  props: Props & { [CLIENT_CACHE_PROP]: string | null };
}

export async function getProps<
  Context extends GetStaticPropsContext | GetServerSidePropsContext,
  Props,
>(
  context: Context,
  { Page, props }: NextPropsConfig = {},
): Promise<PageProps<Props>> {
  const c = client();
  let cacheSnapshot: string | undefined;

  if (!isNil(Page)) {
    const renderResult = await c.prepareReactRender(
      RouterContext.Provider({
        value: {
          query: context.params,
        } as any,
        children: React.createElement(Page, props),
      }),
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
>({ params }: Context): Promise<boolean> {
  if (!params) {
    return false;
  }

  const {
    client: { inlineResolved, query },
  } = client();
  let entityExists = false;

  try {
    if (hasPostId(params)) {
      const result = await inlineResolved(() => {
        return query.post({
          id: params.postId,
          idType: PostIdType.ID,
        })?.id;
      });

      entityExists = !isNil(result);
    } else if (hasPostSlug(params)) {
      const result = await inlineResolved(() => {
        return query.post({
          id: params.postSlug,
          idType: PostIdType.SLUG,
        })?.id;
      });

      entityExists = !isNil(result);
    } else if (hasPostUri(params)) {
      const result = await inlineResolved(() => {
        return query.post({
          id: params.postUri.join('/'),
          idType: PostIdType.URI,
        })?.id;
      });

      entityExists = !isNil(result);
    } else if (hasPageId(params)) {
      const result = await inlineResolved(() => {
        return query.page({
          id: params.pageId,
          idType: PageIdType.ID,
        })?.id;
      });

      entityExists = !isNil(result);
    } else if (hasPageUri(params)) {
      const result = await inlineResolved(() => {
        return query.page({
          id: params.pageUri.join('/'),
          idType: PageIdType.URI,
        })?.id;
      });

      entityExists = !isNil(result);
    } else if (hasCategoryId(params)) {
      const result = await inlineResolved(() => {
        return query.category({
          id: params.categoryId,
          idType: CategoryIdType.ID,
        })?.id;
      });

      entityExists = !isNil(result);
    } else if (hasCategorySlug(params)) {
      const result = await inlineResolved(() => {
        return query.category({
          id: params.categorySlug,
          idType: CategoryIdType.SLUG,
        })?.id;
      });

      entityExists = !isNil(result);
    }
  } catch (e) {
    return true;
  }

  return !entityExists;
}

export async function getNextServerSideProps<Props>(
  context: GetServerSidePropsContext,
  config: NextPropsConfig = {},
): Promise<GetServerSidePropsResult<Props>> {
  return getProps(context, config);
}

export async function getNextStaticProps<Props>(
  context: GetStaticPropsContext,
  config: NextPropsConfig = {},
): Promise<GetStaticPropsResult<Props>> {
  const pageProps: GetStaticPropsResult<Props> = await getProps(
    context,
    config,
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (isObject(pageProps.props)) {
    pageProps.revalidate = 1;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return pageProps;
}
