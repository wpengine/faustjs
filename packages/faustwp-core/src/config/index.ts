import { PossibleTypesMap } from '@apollo/client';
import defaults from 'lodash/defaults.js';
import extend from 'lodash/extend.js';
import isString from 'lodash/isString.js';
import once from 'lodash/once.js';
import { WordPressTemplate } from '../getWordPressProps.js';
import { hooks, FaustPlugin } from '../wpHooks/index.js';
import { warnLog } from '../utils/log.js';

export interface FaustConfig {
  templates: { [key: string]: WordPressTemplate };
  experimentalToolbar?: boolean;
  loginPagePath?: string;
  experimentalPlugins: FaustPlugin[];
  plugins: FaustPlugin[];
  possibleTypes: PossibleTypesMap;
  basePath?: string;
  /**
   * Instruct the Apollo Client to use Persisted Queries
   *
   * @link https://www.apollographql.com/docs/apollo-server/performance/apq/#apollo-client-setup
   */
  usePersistedQueries?: boolean;
  /**
   * Instruct the Apollo Client to send applicable requests as GET instead of POST.
   *
   * @link https://www.apollographql.com/docs/react/networking/advanced-http-networking/#the-httplink-object
   */
  useGETForQueries?: boolean;
}

let config: FaustConfig;

export function setConfig(_config: FaustConfig) {
  return once(() => {
    config = _config;

    const { experimentalPlugins, plugins } = _config;
    // combine both sets of plugins until experimentalPlugins is fully deprecated
    const allSupportedPlugins = [
      ...(experimentalPlugins || []),
      ...(plugins || []),
    ];

    allSupportedPlugins?.forEach((plugin) => {
      plugin?.apply?.(hooks);
    });

    if (experimentalPlugins?.length) {
      // log to cli if experimentalPlugins is used since it's being deprecated
      warnLog(
        'Plugin System: The "experimentalPlugins" configuration option will be deprecated in the near future. Please use "plugins" instead in the faust.config.js.',
      );
    }
  })();
}

export function normalizeConfig(_config: FaustConfig): FaustConfig {
  const cfg = defaults({}, _config, {
    loginPagePath: '/login',
    experimentalToolbar: false,
    usePersistedQueries: false,
    useGETForQueries: true,
    basePath: '',
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
