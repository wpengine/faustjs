import { FaustProvider } from './components/FaustProvider.js';
import {
  WordPressTemplate,
  FaustTemplateProps,
} from './components/WordPressTemplate.js';
import { getWordPressProps } from './getWordPressProps.js';
import { getNextStaticProps } from './getProps.js';
import { getConfig, setConfig, FaustConfig } from './config/index.js';
import { ensureAuthorization } from './auth/index.js';
import { authorizeHandler, logoutHandler, apiRouter } from './server/index.js';
import { withFaust } from './config/withFaust.js';
import { getWpUrl } from './lib/getWpUrl.js';
import { getGraphqlEndpoint } from './lib/getGraphqlEndpoint.js';
import { getWpHostname } from './lib/getWpHostname.js';
import { getApolloClient, addApolloState } from './client.js';
import { hooks } from './hooks/index.js';

export {
  FaustProvider,
  WordPressTemplate,
  FaustTemplateProps,
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
  getWpUrl,
  getGraphqlEndpoint,
  getApolloClient,
  addApolloState,
  hooks,
};
