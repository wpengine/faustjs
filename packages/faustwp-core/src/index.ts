import { FaustProvider } from './components/FaustProvider.js';
import { WordPressTemplate } from './components/WordPressTemplate.js';
import { getWordPressProps } from './getWordPressProps.js';
import { getNextStaticProps } from './getProps.js';
import { getConfig, setConfig, FaustConfig } from './config/index.js';
import { ensureAuthorization } from './auth/index.js';
import { authorizeHandler, logoutHandler, apiRouter } from './server/index.js';
import { withFaust } from './config/withFaust.js';
import { getWpHostname } from './lib/getWpHostname.js';

export {
  FaustProvider,
  WordPressTemplate,
  getWordPressProps,
  getNextStaticProps,
  getConfig,
  setConfig,
  FaustConfig,
  ensureAuthorization,
  authorizeHandler,
  logoutHandler,
  apiRouter,
  withFaust,
  getWpHostname,
};
