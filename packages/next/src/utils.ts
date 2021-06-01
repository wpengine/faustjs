import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { headlessConfig } from '@wpengine/headless-core';
import { resolvePrefixedUrlPath } from '@wpengine/headless-core/utils';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
export function isServerSidePropsContext(
  context: any,
): context is GetServerSidePropsContext {
  const ctx: GetServerSidePropsContext = context;

  return !!ctx.req && !!ctx.res && !!ctx.resolvedUrl;
}

export function isStaticPropsContext(
  context: any,
): context is GetStaticPropsContext {
  return !isServerSidePropsContext(context);
}
/* eslint-enable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */

export function getCurrentPath(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  if (isServerSidePropsContext(context)) {
    return context.resolvedUrl ?? '';
  }

  let url: string;

  if (context.params?.page && Array.isArray(context.params?.page)) {
    const pagePath: string[] = context.params?.page;

    url = `/${pagePath.join('/')}`;
  } else {
    url = `/${(context.params?.page as string) ?? ''}`;
  }

  return url;
}

export function getCurrentUrlPath(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  const wpeConfig = headlessConfig();
  return resolvePrefixedUrlPath(
    getCurrentPath(context),
    wpeConfig.blogUrlPrefix,
  );
}

/**
 * Determine from the static props context if the url is for posts
 * @param context GetStaticPropsContext
 */
export function isPostStaticContext(context: GetStaticPropsContext): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (!post) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!isString(post)) {
    throw new Error('Expected [post] param to be a string');
  }

  if (preview || category || page || pageUri) {
    throw new Error(
      'There were conflicting params! Expected to see a [post] param',
    );
  }

  return true;
}

/**
 * Determine from the static props context if the url is for pages
 * @param context GetStaticPropsContext
 */
export function isPageStaticContext(context: GetStaticPropsContext): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (!page) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!isString(page)) {
    throw new Error('Expected [page] param to be a string');
  }

  if (pageUri && !isObject(pageUri)) {
    throw new Error('Expected [[...pageUri]] to be an object');
  }

  if (preview || category || post) {
    throw new Error(
      'There were conflicting params! Expected to see [page] and [pageUri] params.',
    );
  }

  return true;
}

/**
 * Determine from the static props context if the url is for categories
 * @param context GetStaticPropsContext
 */
export function isCategoryStaticContext(
  context: GetStaticPropsContext,
): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (!category) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!isString(category)) {
    throw new Error('Expected [category] param to be a string');
  }

  if (preview || post || page || pageUri) {
    throw new Error(
      'There were conflicting params! Expected to see [category] param.',
    );
  }

  return true;
}

/**
 * Determine from the static props context if the url is for previews
 * @param context GetStaticPropsContext
 */
export function isPreviewStaticContext(
  context: GetStaticPropsContext,
): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (!preview) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!isString(preview) || (preview !== 'page' && preview !== 'post')) {
    throw new Error(
      'There were conflicting params! Expected to see [preview] param.',
    );
  }

  if (post || category || page || pageUri) {
    throw new Error(
      'There were conflicting params! Expected to see [preview] param.',
    );
  }

  return true;
}

/**
 * Construct an inferred url based on the static props context params.
 * @param context GetStaticPropsContext
 * @returns String if URL can be resolved/inferred, undefined if not.
 */
export function getUrlPathFromContext(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string | undefined {
  if (isServerSidePropsContext(context)) {
    return context.resolvedUrl;
  }

  const { preview, post, category, page, pageUri } = context?.params || {};

  if (isPostStaticContext(context)) {
    return `/posts/${post as string}`;
  }

  if (isPageStaticContext(context)) {
    const pageUriPart = pageUri ? `/${(pageUri as string[]).join('/')}` : '';
    return `/${page as string}${pageUriPart}`;
  }

  if (isCategoryStaticContext(context)) {
    return `/category/${category as string}`;
  }

  if (isPreviewStaticContext(context)) {
    return `/preview/${preview as string}`;
  }

  return undefined;
}
