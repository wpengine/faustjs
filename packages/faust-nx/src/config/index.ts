import { WordPressTemplate } from '../getWordPressProps.js';
import { hooks, Plugin } from '../hooks/index.js';
import isEqual from 'lodash/isEqual';

export interface FaustNXConfig {
  templates: { [key: string]: WordPressTemplate };
  disableLogging: boolean;
  loginPagePath?: string;
  experimentalPlugins: Plugin[];
}

let config: FaustNXConfig;

export function setConfig(_config: FaustNXConfig) {
  // Prevent plugins from being re-initialized.
  if (isEqual(config, _config)) {
    return;
  }

  config = _config;

  const { experimentalPlugins: plugins } = _config;

  plugins?.forEach((plugin) => {
    plugin?.apply?.(hooks);
  });
}

export function getConfig(): Partial<FaustNXConfig> {
  return config;
}
