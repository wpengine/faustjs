import { PossibleTypesMap } from '@apollo/client';
import defaults from 'lodash/defaults.js';
import extend from 'lodash/extend.js';
import isString from 'lodash/isString.js';
import once from 'lodash/once.js';
import { WordPressTemplate } from '../getWordPressProps.js';
import { hooks, Plugin } from '../hooks/index.js';

export interface FaustNXConfig {
  templates: { [key: string]: WordPressTemplate };
  disableLogging: boolean;
  loginPagePath?: string;
  experimentalPlugins: Plugin[];
  possibleTypes: PossibleTypesMap;
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

export function normalizeConfig(_config: FaustNXConfig): FaustNXConfig {
  const cfg = defaults({}, _config, {
    loginPagePath: '/login',
    disableLogging: false,
  });

  Object.keys(cfg).forEach((key) => {
    const keyValue: keyof FaustNXConfig = key as any;
    const value = cfg[keyValue];

    if (isString(value)) {
      (cfg as any)[keyValue] = value.trim();
    }
  });

  return extend(cfg, {});
}

export function getConfig(): FaustNXConfig {
  return normalizeConfig(config);
}
