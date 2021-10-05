import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
import trimEnd from 'lodash/trimEnd';
import extend from 'lodash/extend';
import isObject from 'lodash/isObject';
import type { RequestContext } from '../api';
import isNil from 'lodash/isNil';
import trim from 'lodash/trim';
import { isValidUrl } from '../utils';

export const TOKEN_ENDPOINT_PARTIAL_PATH = 'auth/token';
export const LOGOUT_ENDPOINT_PARTIAL_PATH = 'auth/logout';

/* eslint-disable @typescript-eslint/ban-types */
/**
 * The configuration for your faustjs site
 *
 * @export
 * @interface Config
 */
export interface Config extends Record<string, unknown> {
  /**
   * Set this value to the base URL of your WordPress site. This will be used in order to
   * make queries to your WordPress site.
   *
   * @type {string}
   * @memberof Config
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
   * @memberof Config
   */
  gqlUrl?: string;

  /**
   * Set this value to the relative base path of your API endpoints for this application.
   *
   * @example /api/faust
   *
   * @default /api/faust
   * @type {string}
   * @memberof HeadlessConfig
   */
  apiBasePath?: string;

  /**
   * This is a prefix URL path that we will use as the base URL for your WordPress posts.
   * By default we will assume that your site is configured with no blog-specific URL.
   *
   * @example /blog
   *
   * @default ''
   * @type {string}
   * @memberof Config
   */
  blogUrlPrefix?: string;

  /**
   * Set this to the secret provided by the Headless WordPress plugin to be used for authentication
   *
   * @type {string}
   * @memberof Config
   */
  apiClientSecret?: string;

  /**
   * Set this to the type of authentication you wan to use.
   *
   * Redirect authentication redirects users to the WordPress login page to authenticate,
   * where local assumes that you have setup a login page on your frontend site.
   *
   * @default redirect
   * @memberof Config
   */
  authType?: 'redirect' | 'local';

  /**
   * Set this to the relative URL path of your frontend login page.
   *
   * @example /login
   *
   * @default /login
   * @type {string}
   * @memberof Config
   */
  loginPagePath?: string;

  /**
   * Set to true if you want to disable internal console.log statements
   *
   * @type {string}
   * @memberof Config
   */
  disableLogging?: boolean;

  /**
   * Called before every request, use this to apply any headers you might
   * need to for your requests or adjust the request to suite your needs.
   *
   * @param {string} url
   * @param {RequestInit} init
   * @returns {RequestContext}
   * @memberof Config
   */
  applyRequestContext?(
    url: string,
    init: RequestInit,
  ): Promise<RequestContext> | RequestContext;
}
/* eslint-enable @typescript-eslint/ban-types */

let faustConfig: Config = {
  wpUrl: '/',
};
let configSet = false;

/**
 * Takes a Config and ensures the properties that need to be normalized
 * (e.g. URL slashes trimmed, etc) are handled.
 *
 * @export
 * @param {Config} config
 * @returns {Config}
 */
export function normalizeConfig(config: Config): Config {
  const cfg = defaults({}, config, {
    blogUrlPrefix: '',
    apiBasePath: '/api/faust',
    authType: 'redirect',
    loginPagePath: '/login',
    disableLogging: false,
  });

  Object.keys(cfg).forEach((key) => {
    const keyValue: keyof Config = key as any;
    const value = cfg[keyValue];

    if (isString(value)) {
      (cfg as any)[keyValue] = value.trim();
    }
  });

  let { wpUrl, blogUrlPrefix, apiBasePath } = cfg;

  wpUrl = trimEnd(wpUrl, '/');
  blogUrlPrefix = trimEnd(blogUrlPrefix, '/');
  apiBasePath = `/${trim(apiBasePath, '/')}`;

  return extend(cfg, {
    wpUrl,
    blogUrlPrefix,
    apiBasePath,
  });
}

/**
 * A setter/getter for the Config
 *
 * @export
 * @param {Config} [cfg]
 * @returns {Config}
 */
export function config(cfg?: Config): Config {
  if (!configSet && !isObject(cfg)) {
    throw new Error(
      'You must set your faustjs configuration at the highest level in your application. `config` was called with no arguments prior to setting the configuration.',
    );
  }

  if (!isObject(cfg)) {
    return faustConfig;
  }

  configSet = true;
  faustConfig = normalizeConfig(cfg);

  return faustConfig;
}

/**
 * Get the full URL to the GraphQL endpoint
 *
 * @export
 * @returns
 */
export function getGqlUrl(): string {
  const { wpUrl, gqlUrl } = config();

  if (isNil(gqlUrl) || !isString(gqlUrl)) {
    return `${wpUrl}/graphql`;
  }

  if (isValidUrl(gqlUrl)) {
    return trimEnd(gqlUrl, '/');
  } else {
    return `${wpUrl}/${trim(gqlUrl, '/')}`;
  }
}
