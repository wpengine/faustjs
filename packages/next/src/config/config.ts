import defaults from 'lodash/defaults.js';

export interface Config {
  revalidate: number | boolean;
}

let nextConfig: Config = {
  revalidate: 900,
};

export function config(cfg?: Partial<Config>): Config {
  nextConfig = defaults({}, cfg, nextConfig, {
    revalidate: 900,
  });

  return nextConfig;
}
