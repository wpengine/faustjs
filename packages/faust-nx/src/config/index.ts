import { WordPressTemplate } from '../getWordPressProps.js';
import { hooks, Plugin } from '../hooks/index.js';

export interface FaustNXConfig {
  templates: { [key: string]: WordPressTemplate };
  disableLogging: boolean;
  loginPagePath?: string;
  experimentalPlugins: Plugin[];
}

let config = {};

let serializedConfigObject: string | undefined;

export function setConfig(_config: FaustNXConfig) {
  config = _config;

  if (serializedConfigObject === JSON.stringify(_config)) {
    return;
  }
  serializedConfigObject = JSON.stringify(_config);

  const { experimentalPlugins: plugins } = _config;

  plugins?.forEach((plugin) => {
    plugin?.apply?.(hooks);
  });
}

export function getConfig(): Partial<FaustNXConfig> {
  return config;
}
