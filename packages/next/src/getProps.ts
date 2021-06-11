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
