import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
import trimEnd from 'lodash/trimEnd';
import extend from 'lodash/extend';
import isObject from 'lodash/isObject';

/**
 * The configuration for your headless site
 *
 * @export
 * @interface HeadlessConfig
 */
export interface HeadlessConfig {
  /**
   * Set this value to the base URL of your WordPress site. This will be used in order to
   * make queries to your WordPress site.
   *
   * @type {string}
   * @memberof HeadlessConfig
   */
  wpUrl: string;

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
}

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
function normalizeConfig(config: HeadlessConfig): HeadlessConfig {
  const cfg = defaults(config, {
    blogUrlPrefix: '',
    apiEndpoint: '/api/auth/wpe-headless',
  });

  Object.keys(cfg).forEach((key) => {
    const value = cfg[key as keyof HeadlessConfig];

    if (!isString(value)) {
      return;
    }

    cfg[key as keyof HeadlessConfig] = value.trim();
  });

  let { wpUrl, blogUrlPrefix, apiEndpoint } = cfg;

  wpUrl = trimEnd(wpUrl, '/');
  blogUrlPrefix = trimEnd(blogUrlPrefix, '/');
  apiEndpoint = trimEnd(apiEndpoint, '/');

  return extend(cfg, {
    wpUrl,
    blogUrlPrefix,
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
  if (isObject(config)) {
    wpeConfig = config;
  } else if (!configSet) {
    throw new Error(
      'You must set your headless configuration at the highest level in your application. `headlessConfig` was called prior to setting the configuration.',
    );
  }

  configSet = true;

  return normalizeConfig(wpeConfig);
}
