import { FaustProvider } from './components/FaustProvider.js';
import {
  WordPressTemplate,
  FaustTemplateProps,
} from './components/WordPressTemplate.js';
import { getWordPressProps, FaustTemplate } from './getWordPressProps.js';
import {
  getNextStaticProps,
  getNextServerSideProps,
  FaustPage,
} from './getProps.js';
import { getConfig, setConfig, FaustConfig } from './config/index.js';
import { ensureAuthorization } from './auth/index.js';
import { authorizeHandler, logoutHandler, apiRouter } from './server/index.js';
import { withFaust } from './config/withFaust.js';
import { getWpUrl } from './lib/getWpUrl.js';
import { getAdminUrl } from './lib/getAdminUrl.js';
import { getGraphqlEndpoint } from './lib/getGraphqlEndpoint.js';
import { getWpHostname } from './lib/getWpHostname.js';
import {
  getApolloClient,
  getApolloAuthClient,
  addApolloState,
} from './client.js';
import { FaustPlugin, hooks } from './wpHooks/index.js';
import { FaustHooks } from './wpHooks/overloads.js';
import {
  getSitemapProps,
  GetSitemapPropsConfig,
} from './server/sitemaps/getSitemapProps.js';
import { useAuth } from './hooks/useAuth.js';
import { useLogin } from './hooks/useLogin.js';
import { useLogout } from './hooks/useLogout.js';
import { useFaustQuery } from './hooks/useFaustContext.js';
import { FaustContext } from './store/FaustContext.js';

import {
  FaustToolbarNodes,
  FaustToolbarContext,
  ToolbarNode,
  ToolbarItem,
  ToolbarNodeSkeleton,
  ToolbarSubmenu,
  ToolbarSubmenuWrapper,
} from './components/Toolbar/index.js';
import { flatListToHierarchical } from './utils/flatListToHierarchical.js';

export {
  flatListToHierarchical,
  FaustProvider,
  WordPressTemplate,
  FaustTemplateProps,
  getWordPressProps,
  getNextStaticProps,
  getNextServerSideProps,
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
  getAdminUrl,
  getGraphqlEndpoint,
  getApolloClient,
  getApolloAuthClient,
  addApolloState,
  FaustPlugin,
  FaustHooks,
  getSitemapProps,
  GetSitemapPropsConfig,
  useAuth,
  useLogin,
  useLogout,
  FaustToolbarNodes,
  FaustToolbarContext,
  ToolbarNode,
  ToolbarItem,
  ToolbarNodeSkeleton,
  ToolbarSubmenu,
  ToolbarSubmenuWrapper,
  FaustTemplate,
  FaustPage,
  hooks,
  useFaustQuery,
  FaustContext,
};
