import { WordPressTemplate } from '../getWordPressProps.js';
import { hooks, Plugin } from '../hooks/index.js';
import once from 'lodash/once.js';

export interface FaustNXConfig {
  templates: { [key: string]: WordPressTemplate };
  disableLogging: boolean;
  loginPagePath?: string;
  experimentalPlugins: Plugin[];
}

let config: FaustNXConfig;

export function setConfig(_config: FaustNXConfig) {
  return once(() => {
    config = _config;

    const { experimentalPlugins: plugins } = _config;

    plugins?.forEach((plugin) => {
      plugin?.apply?.(hooks);
    });
  })();
}

export function getConfig(): Partial<FaustNXConfig> {
  return config;
}
