import { HeadlessConfig } from '../types';
import { normalizeConfig } from '../utils';

let wpeConfig: HeadlessConfig = {};

/**
 * A setter/getter for the HeadlessConfig
 *
 * @export
 * @param {HeadlessConfig} [config]
 * @returns {HeadlessConfig}
 */
export function headlessConfig(config?: HeadlessConfig): HeadlessConfig {
  if (config) {
    wpeConfig = normalizeConfig(config);
  }

  return wpeConfig;
}
