import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
import trimEnd from 'lodash/trimEnd';
import extend from 'lodash/extend';
import isObject from 'lodash/isObject';

import { GQlessClient } from 'gqless';
import type { RequestContext } from '../api';

/* eslint-disable @typescript-eslint/ban-types */
/**
 * The configuration for your headless site
 *
 * @export
 * @interface HeadlessConfig
 */
export interface HeadlessConfig<
  GeneratedSchema extends {
    query: {};
    mutation: {};
    subscription: {};
  } = { query: {}; mutation: {}; subscription: {} },
> {
  /**
   * Set this value to the base URL of your WordPress site. This will be used in order to
   * make queries to your WordPress site.
   *
   * @type {string}
   * @memberof HeadlessConfig
   */
  wpUrl: string;

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
   * An optional gqless client used to make calls to the WP API
   *
   * @type {GQlessClient<GeneratedSchema>}
   * @memberof HeadlessConfig
   */
  apiClient?: GQlessClient<GeneratedSchema>;

  /**
   * Called before every request, use this to apply any headers you might
   * need to for your requests or adjust the request to suite your needs.
   *
   * @param {string} url
   * @param {RequestInit} init
   * @returns {RequestContext}
   * @memberof HeadlessConfig
   */
  applyRequestContext?(url: string, init: RequestInit): RequestContext;
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
  });

  Object.keys(cfg).forEach((key) => {
    const value = cfg[key as keyof HeadlessConfig];

    if (!isString(value)) {
      return;
    }

    cfg[key as keyof HeadlessConfig] = value.trim() as any;
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
