import { HeadlessConfig } from '../types';
import { normalizeConfig } from '../utils';

let wpeConfig: HeadlessConfig = {};

export function headlessConfig(config?: HeadlessConfig): HeadlessConfig {
  if (config) {
    wpeConfig = normalizeConfig(config);
  }

  return wpeConfig;
}
