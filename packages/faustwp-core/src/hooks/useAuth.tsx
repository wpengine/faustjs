import trim from 'lodash/trim.js';
import defaults from 'lodash/defaults.js';
import { useEffect, useState } from 'react';
import {
  ensureAuthorization,
  EnsureAuthorizationOptions,
} from '../auth/index.js';

type RedirectStrategyConfig = {
  strategy: 'redirect';
  shouldRedirect?: boolean;
  skip?: boolean;
};

type LocalStrategyConfig = {
  strategy: 'local';
  loginPageUrl: string;
  shouldRedirect?: boolean;
  skip?: boolean;
};

export type UseAuthConfig = RedirectStrategyConfig | LocalStrategyConfig;

export function useAuth(_config?: UseAuthConfig) {
  const config = defaults(_config, {
    strategy: 'redirect',
    shouldRedirect: false,
    skip: false,
  }) as UseAuthConfig;

  if (config.strategy === 'local' && !config.loginPageUrl) {
    throw new Error(
      'useAuth: Local strategies must specify the "loginPageUrl"',
    );
  }

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const [called, setCalled] = useState<boolean>(false);

  useEffect(() => {
    if (config.skip === true) {
      return;
    }

    if (called) {
      return;
    }

    setCalled(true);

    const ensureAuthorizationConfig: EnsureAuthorizationOptions = {
      redirectUri: window.location.href,
    };

    if (config.strategy === 'local') {
      ensureAuthorizationConfig.loginPageUri = `/${trim(
        config.loginPageUrl,
        '/',
      )}?redirect_uri=${encodeURIComponent(window.location.href)}`;
    }

    /* eslint-disable @typescript-eslint/no-floating-promises */
    (async () => {
      const authResult = await ensureAuthorization(ensureAuthorizationConfig);

      setIsAuthenticated(authResult === true);

      if (
        authResult !== true &&
        authResult?.login &&
        config.strategy === 'local'
      ) {
        setLoginUrl(authResult.login);
      }

      if (
        authResult !== true &&
        authResult?.redirect &&
        config.strategy === 'redirect'
      ) {
        setLoginUrl(authResult.redirect);
      }

      setIsReady(true);
    })();
  }, [called, config]);

  /**
   * Automatically redirect the user to the login page if the
   * shouldRedirect option is set to true.
   */
  useEffect(() => {
    if (config.skip === true) {
      return;
    }

    if (
      !config.shouldRedirect ||
      !isReady ||
      isAuthenticated !== false ||
      !loginUrl
    ) {
      return;
    }

    /**
     * Using a setTimeout here because the page transition
     * is a little too fast and makes for bad UX.
     */
    setTimeout(() => {
      window.location.assign(loginUrl);
    }, 200);
  }, [isReady, isAuthenticated, loginUrl, config]);

  return {
    isAuthenticated,
    isReady,
    loginUrl,
  };
}
