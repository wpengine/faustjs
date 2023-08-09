import { getConfig } from '../config/index.js';

export function getGlobalBasePath() {
  const { basePath } = getConfig();

  return basePath ?? '';
}
