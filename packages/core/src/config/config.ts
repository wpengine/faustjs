import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
import trimEnd from 'lodash/trimEnd';
import extend from 'lodash/extend';
import isObject from 'lodash/isObject';
import type { RequestContext } from '../api';
import isNil from 'lodash/isNil';
import trim from 'lodash/trim';
import { isValidUrl } from '../utils';

/* eslint-disable @typescript-eslint/ban-types */
/**
 * The configuration for your headless site
 *
 * @export
 * @interface HeadlessConfig
 */
export interface HeadlessConfig extends Record<string, unknown> {
  /**
   * Set this value to the base URL of your WordPress site. This will be used in order to
   * make queries to your WordPress site.
   *
   * @type {string}
   * @memberof HeadlessConfig
   */
  wpUrl: string;

  /**
   * Set this value to the URL of your GraphQL endpoint.
   *
   * @example https://my-site.graphql-cdn.com
   * @example /my-graphql-endpoint
   *
   * @default wpUrl + /graphql
   * @type {string}
   * @memberof HeadlessConfig
   */
  gqlUrl?: string;

  /**
   * Set this value to the URL of your api that you want to use for this application.
   *
   * @example api.mysite.com
   *
   * @default wpUrl
   * @type {string}
   * @memberof HeadlessConfig
   */
  apiUrl?: string;

  /**
   * This is a prefix URL path that we will use as the base URL for your WordPress posts.
   * By default we will assume that your site is configured with no blog-specific URL.
   *
   * @example /blog
   *
   * @default ''
   * @type {string}
   * @memberof HeadlessConfig
   */
  blogUrlPrefix?: string;

  /**
   * Set this value to be the path to your API endpoint that you want to use for this application
   *
   * @example /api/auth/wordpress
   *
   * @default /api/auth/wpe-headless
   * @type {string}
   * @memberof HeadlessConfig
   */
  apiEndpoint?: string;

  /**
   * Set this to the secret provided by the Headless WordPress plugin to be used for authentication
   *
   * @type {string}
   * @memberof HeadlessConfig
   */
  apiClientSecret?: string;

  /**
   * Set this to the type of authentication you wan to use.
   *
   * Redirect authentication redirects users to the WordPress login page to authenticate,
   * where local assumes that you have setup a login page on your frontend site.
   *
   * @default redirect
   * @memberof HeadlessConfig
   */
  authType?: 'redirect' | 'local';

  /**
   * Set this to the relative URL path of your frontend login page.
   *
   * @example /login
   *
   * @default /login
   * @type {string}
   * @memberof HeadlessConfig
   */
  loginPagePath?: string;

  /**
   * Set to true if you want to disable internal console.log statements
   *
   * @type {string}
   * @memberof HeadlessConfig
   */
  disableLogging?: boolean;

  /**
   * Called before every request, use this to apply any headers you might
   * need to for your requests or adjust the request to suite your needs.
   *
   * @param {string} url
   * @param {RequestInit} init
   * @returns {RequestContext}
   * @memberof HeadlessConfig
   */
  applyRequestContext?(
    url: string,
    init: RequestInit,
  ): Promise<RequestContext> | RequestContext;
}
/* eslint-enable @typescript-eslint/ban-types */

let wpeConfig: HeadlessConfig = {
  wpUrl: '/',
};
let configSet = false;

/**
 * Takes a HeadlessConfig and ensures the properties that need to be normalized
 * (e.g. URL slashes trimmed, etc) are handled.
 *
 * @export
 * @param {HeadlessConfig} config
 * @returns {HeadlessConfig}
 */
export function normalizeConfig(config: HeadlessConfig): HeadlessConfig {
  const cfg = defaults({}, config, {
    blogUrlPrefix: '',
    apiUrl: '',
    apiEndpoint: '/api/auth/wpe-headless',
    authType: 'redirect',
    loginPagePath: '/login',
    disableLogging: false,
  });

  Object.keys(cfg).forEach((key) => {
    const keyValue: keyof HeadlessConfig = key as any;
    const value = cfg[keyValue];

    if (isString(value)) {
      (cfg as any)[keyValue] = value.trim();
    }
  });

  let { wpUrl, blogUrlPrefix, apiUrl, apiEndpoint } = cfg;

  wpUrl = trimEnd(wpUrl, '/');
  blogUrlPrefix = trimEnd(blogUrlPrefix, '/');
  apiUrl = trimEnd(apiUrl, '/');
  apiEndpoint = trimEnd(apiEndpoint, '/');

  return extend(cfg, {
    wpUrl,
    blogUrlPrefix,
    apiUrl,
    apiEndpoint,
  });
}

/**
 * A setter/getter for the HeadlessConfig
 *
 * @export
 * @param {HeadlessConfig} [config]
 * @returns {HeadlessConfig}
 */
export function headlessConfig(config?: HeadlessConfig): HeadlessConfig {
  if (!configSet && !isObject(config)) {
    throw new Error(
      'You must set your headless configuration at the highest level in your application. `headlessConfig` was called prior to setting the configuration.',
    );
  }

  if (!isObject(config)) {
    return wpeConfig;
  }

  configSet = true;
  wpeConfig = normalizeConfig(config);

  return wpeConfig;
}

/**
 * Get the full URL to the GraphQL endpoint
 *
 * @export
 * @returns
 */
export function getGqlUrl(): string {
  const { wpUrl, gqlUrl } = headlessConfig();

  if (isNil(gqlUrl) || !isString(gqlUrl)) {
    return `${wpUrl}/graphql`;
  }

  if (isValidUrl(gqlUrl)) {
    return trimEnd(gqlUrl, '/');
  } else {
    return `${wpUrl}/${trim(gqlUrl, '/')}`;
  }
}
