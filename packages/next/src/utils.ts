import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import trim from 'lodash/trim';
import { headlessConfig } from '@wpengine/headless-core';
import { resolvePrefixedUrlPath } from '@wpengine/headless-core/utils';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

/**
 *  Determine if the context provided is server side props context
 * @param context
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
export function isServerSidePropsContext(
  context: any,
): context is GetServerSidePropsContext {
  const ctx: GetServerSidePropsContext = context;

  return !!ctx.req && !!ctx.res && !!ctx.resolvedUrl;
}

/**
 * Determine if the context provided is static props context
 * @param context
 */
export function isStaticPropsContext(
  context: any,
): context is GetStaticPropsContext {
  return !isServerSidePropsContext(context);
}

/**
 * Determine from the static props context params if is post URL
 * @param context GetStaticPropsContext
 */
export function isPostParams(context: GetStaticPropsContext): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (isUndefined(post)) {
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
 * Determine from the static props context params if is page URL
 * @param context GetStaticPropsContext
 */
export function isPageParams(context: GetStaticPropsContext): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (isUndefined(page)) {
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
 * Determine from the static props context params if is category URL
 * @param context GetStaticPropsContext
 */
export function isCategoryParams(context: GetStaticPropsContext): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (isUndefined(category)) {
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
 * Determine from the static props context params if is preview URL
 * @param context GetStaticPropsContext
 */
export function isPreviewParams(context: GetStaticPropsContext): boolean {
  const { preview, post, category, page, pageUri } = context?.params || {};

  if (isUndefined(preview)) {
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
 * TODO: Determine if we want to allow these values to be modified via the config
 * or if we want to have this directory structure be a permanent convention.
 */
const POSTS_PATH_PREFIX = '/posts';
const PAGE_PATH_PREFIX = '/';
const CATEGORY_PATH_PREFIX = '/category';
const PREVIEW_PATH_PREFIX = '/preview';

export function formatUrlPrefix(pathPrefix: string): string {
  if (pathPrefix.length === 1 && pathPrefix === '/') {
    return '';
  }

  const prefix = trim(pathPrefix, '/');

  return `/${prefix}`;
}

/**
 * Construct an inferred url based on the static props context params or the resolved URL if server side
 * @param context GetServerSidePropsContext | GetStaticPropsContext
 * @returns String if URL can be resolved/inferred, undefined if not.
 */
export function getUrlFromContext(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  if (isServerSidePropsContext(context)) {
    return context.resolvedUrl;
  }

  const { preview, post, category, page, pageUri } = context?.params || {};

  if (isPostParams(context)) {
    return `${formatUrlPrefix(POSTS_PATH_PREFIX)}/${post as string}`;
  }

  if (isPageParams(context)) {
    const pageUriPart = pageUri ? `/${(pageUri as string[]).join('/')}` : '';
    return `${formatUrlPrefix(PAGE_PATH_PREFIX)}/${
      page as string
    }${pageUriPart}`;
  }

  if (isCategoryParams(context)) {
    return `${formatUrlPrefix(CATEGORY_PATH_PREFIX)}/${category as string}`;
  }

  if (isPreviewParams(context)) {
    return `${formatUrlPrefix(PREVIEW_PATH_PREFIX)}/${preview as string}`;
  }

  throw new Error('Could not infer URL based on context in getUrlFromContext');
}

/**
 * Get the current URL path without the blog url prefix.
 *
 * @param context GetServerSidePropsContext | GetStaticPropsContext
 * @returns a URL path like /posts/hello-world without the blog URL prefix.
 */
export function getCurrentUrlPath(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  const wpeConfig = headlessConfig();
  return resolvePrefixedUrlPath(
    getUrlFromContext(context),
    wpeConfig.blogUrlPrefix,
  );
}
