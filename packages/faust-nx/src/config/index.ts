import { WordPressTemplate } from '../getWordPressProps.js';

export interface FaustNXConfig {
  templates: { [key: string]: WordPressTemplate };
  disableLogging: boolean;
  loginPagePath?: string;
  authType?: 'redirect' | 'local';
}

let config = {};

export function setConfig(_config: FaustNXConfig) {
  config = _config;
}

export function getConfig(): Partial<FaustNXConfig> {
  return config;
}
