import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import trim from 'lodash/trim';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { isServerSidePropsContext } from './utils';

/**
 * TODO: Determine if we want to allow these values to be modified
 * or if this directory structure should be a permanent convention.
 */
const POSTS_PATH_PREFIX = '/posts';
const PAGE_PATH_PREFIX = '/';
const CATEGORY_PATH_PREFIX = '/category';
const PREVIEW_PATH_PREFIX = '/preview';

/**
 * Determine from the static props context params if is post URL
 * @param context GetStaticPropsContext
 */
export function isPostParams(context: GetStaticPropsContext): boolean {
  const { preview, post, category, categoryUri, page, pageUri } =
    context?.params || {};

  if (isUndefined(post)) {
    return false;
  }

  if (!isString(post)) {
    throw new Error('Expected [post] param to be a string');
  }

  if (
    !isUndefined(preview) ||
    !isUndefined(category) ||
    !isUndefined(categoryUri) ||
    !isUndefined(page) ||
    !isUndefined(pageUri)
  ) {
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
  const { preview, post, category, categoryUri, page, pageUri } =
    context?.params || {};

  if (isUndefined(page)) {
    return false;
  }

  if (!isString(page)) {
    throw new Error('Expected [page] param to be a string');
  }

  if (!isUndefined(pageUri) && !isObject(pageUri)) {
    throw new Error('Expected [[...pageUri]] to be an object');
  }

  if (
    !isUndefined(preview) ||
    !isUndefined(category) ||
    !isUndefined(categoryUri) ||
    !isUndefined(post)
  ) {
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
  const { preview, post, category, categoryUri, page, pageUri } =
    context?.params || {};

  if (isUndefined(category)) {
    return false;
  }

  if (!isString(category)) {
    throw new Error('Expected [category] param to be a string');
  }

  if (!isUndefined(categoryUri) && !isObject(categoryUri)) {
    throw new Error('Expected [[[...categoryUri]] to be an object');
  }

  if (
    !isUndefined(preview) ||
    !isUndefined(post) ||
    !isUndefined(page) ||
    !isUndefined(pageUri)
  ) {
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
  const { preview, post, category, categoryUri, page, pageUri } =
    context?.params || {};

  if (isUndefined(preview)) {
    return false;
  }

  if (!isString(preview) || (preview !== 'page' && preview !== 'post')) {
    throw new Error(
      'There were conflicting params! Expected to see [preview] param.',
    );
  }

  if (
    !isUndefined(post) ||
    !isUndefined(category) ||
    !isUndefined(categoryUri) ||
    !isUndefined(page) ||
    !isUndefined(pageUri)
  ) {
    throw new Error(
      'There were conflicting params! Expected to see [preview] param.',
    );
  }

  return true;
}

export function formatUrlPrefix(pathPrefix: string): string {
  if (pathPrefix.length === 1 && pathPrefix === '/') {
    return '';
  }

  const prefix: string = trim(pathPrefix, '/');

  return `/${prefix}`;
}

/**
 * Construct an inferred url based on the static props context params or the resolved URL if server side
 * @param context GetServerSidePropsContext | GetStaticPropsContext
 * @returns Resolved/inferred URL based on the context
 */
export function getUrlFromContext(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  if (isServerSidePropsContext(context)) {
    return context.resolvedUrl;
  }

  const { preview, post, category, categoryUri, page, pageUri } =
    context?.params || {};

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
    const categoryUriPart = categoryUri
      ? `/${(categoryUri as string[]).join('/')}`
      : '';

    return `${formatUrlPrefix(CATEGORY_PATH_PREFIX)}/${
      category as string
    }${categoryUriPart}`;
  }

  if (isPreviewParams(context)) {
    return `${formatUrlPrefix(PREVIEW_PATH_PREFIX)}/${preview as string}`;
  }

  throw new Error('Could not infer URL based on context in getUrlFromContext');
}
