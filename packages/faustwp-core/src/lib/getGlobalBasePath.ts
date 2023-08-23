import { getConfig, FaustConfig } from '../config/index.js';

export function getGlobalBasePath(): string {
  const { basePath } = getConfig() as FaustConfig;

  return basePath ?? '';
}
