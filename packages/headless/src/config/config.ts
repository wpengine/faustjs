import { HeadlessConfig } from '../types';
import { trimSlashes } from '../utils';

let wpeConfig: HeadlessConfig = {};

/**
 * Takes a HeadlessConfig and ensures the properties that need to be normalized
 * (e.g. URL slashes trimmed, etc) are handled.
 *
 * @export
 * @param {HeadlessConfig} config
 * @returns {HeadlessConfig}
 */
function normalizeConfig(config: HeadlessConfig): Required<HeadlessConfig> {
  let { uriPrefix, pagination } = config;

  if (!uriPrefix) {
    uriPrefix = '';
  }

  uriPrefix = uriPrefix.trim();

  if (/\/$/.test(uriPrefix)) {
    uriPrefix = uriPrefix.slice(0, -1);
  }

  if (!pagination) {
    pagination = {
      after: 'after/%cursor%',
      before: 'before/%cursor%',
      replace(url: string) {
        return url.replace(/\/?(after|before)\/[^/]+/, '');
      },
    };
  }

  pagination.after = trimSlashes(pagination.after) as string;
  pagination.before = trimSlashes(pagination.before) as string;

  return { ...config, uriPrefix, pagination } as Required<HeadlessConfig>;
}

/**
 * A setter/getter for the HeadlessConfig
 *
 * @export
 * @param {HeadlessConfig} [config]
 * @returns {HeadlessConfig}
 */
export function headlessConfig(
  config?: HeadlessConfig,
): Required<HeadlessConfig> {
  if (config) {
    wpeConfig = config;
  }

  wpeConfig = normalizeConfig(wpeConfig);

  return wpeConfig as Required<HeadlessConfig>;
}
