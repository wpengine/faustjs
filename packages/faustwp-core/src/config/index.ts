import getNextConfig from 'next/config.js';
import { PossibleTypesMap } from '@apollo/client';
import defaults from 'lodash/defaults.js';
import extend from 'lodash/extend.js';
import isString from 'lodash/isString.js';
import once from 'lodash/once.js';
import { WordPressTemplate } from '../getWordPressProps.js';
import { hooks, FaustPlugin } from '../wpHooks/index.js';

export interface FaustConfig {
  templates: { [key: string]: WordPressTemplate };
  experimentalToolbar?: boolean;
  loginPagePath: string;
  experimentalPlugins: FaustPlugin[];
  possibleTypes: PossibleTypesMap;
  apiBasePath: string;
  basePath: string;
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
    basePath: getNextConfig()?.basePath,
    apiBasePath: '/api/faust',
    loginPagePath: '/login',
    experimentalToolbar: false,
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

export function getConfig(): FaustConfig {
  return normalizeConfig(config);
}
