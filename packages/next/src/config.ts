import { headlessConfig as coreConfig, HeadlessConfig } from '@faustjs/core';
import { isNil } from 'lodash';
import defaults from 'lodash/defaults';

export interface NextConfigProperties {
  revalidate: number | boolean;
}

export interface NextConfig extends HeadlessConfig {
  next: NextConfigProperties;
}

export interface OptionalNextConfig extends HeadlessConfig {
  next?: Partial<NextConfigProperties>;
}

export function headlessConfig(config?: OptionalNextConfig): NextConfig {
  let coreCfg: NextConfig | undefined;

  if (isNil(config)) {
    coreCfg = coreConfig(config) as NextConfig;
  }

  const nextConfig = defaults({}, config, coreCfg, {
    next: defaults({}, config?.next, coreCfg?.next, {
      revalidate: 900, // 15 minutes,
    }),
  });

  return coreConfig(nextConfig) as NextConfig;
}
