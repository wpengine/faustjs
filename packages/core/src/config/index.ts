import { PossibleTypesMap } from '@apollo/client';
import defaults from 'lodash/defaults.js';
import extend from 'lodash/extend.js';
import isString from 'lodash/isString.js';
import once from 'lodash/once.js';
import { WordPressTemplate } from '../getWordPressProps.js';
import { hooks, Plugin } from '../hooks/index.js';

export interface FaustConfig {
  templates: { [key: string]: WordPressTemplate };
  disableLogging: boolean;
  loginPagePath?: string;
  experimentalPlugins: Plugin[];
  possibleTypes: PossibleTypesMap;
}

let config: FaustConfig;

export function setConfig(_config: FaustConfig) {
  return once(() => {
    config = _config;

    const { experimentalPlugins: plugins } = _config;

    plugins?.forEach((plugin) => {
      plugin?.apply?.(hooks);
    });
  })();
}

export function normalizeConfig(_config: FaustConfig): FaustConfig {
  const cfg = defaults({}, _config, {
    loginPagePath: '/login',
    disableLogging: false,
  });

  Object.keys(cfg).forEach((key) => {
    const keyValue: keyof FaustConfig = key as any;
    const value = cfg[keyValue];

    if (isString(value)) {
      (cfg as any)[keyValue] = value.trim();
    }
  });

  return extend(cfg, {});
}

export function getConfig(): Partial<FaustConfig> {
  return normalizeConfig(config);
}
