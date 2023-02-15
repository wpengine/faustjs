import { gql } from '@apollo/client';
import trim from 'lodash/trim.js';
import { useEffect, useState } from 'react';
import {
  ensureAuthorization,
  EnsureAuthorizationOptions,
} from '../auth/index.js';
import {
  FAUST_API_BASE_PATH,
  LOGOUT_ENDPOINT_PARTIAL_PATH,
} from '../lib/constants.js';
import { getApolloAuthClient } from '../client.js';

type RedirectStrategyConfig = {
  strategy: 'redirect';
  shouldRedirect?: boolean;
};

type LocalStrategyConfig = {
  strategy: 'local';
  loginPageUri: string;
  shouldRedirect?: boolean;
};

export type UseAuthConfig = RedirectStrategyConfig | LocalStrategyConfig;

export type User = {
  id: string;
  name: string;
  roles: {
    edges: [
      {
        node: {
          id: string;
          name: string;
        };
      }[],
    ];
  };
};

export function useAuth(config?: RedirectStrategyConfig | LocalStrategyConfig) {
  const { strategy = 'redirect', shouldRedirect = false } = config ?? {};
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const ensureAuthorizationConfig: EnsureAuthorizationOptions = {
      redirectUri: window.location.href,
    };

    if (config?.strategy === 'local' && config.loginPageUri) {
      ensureAuthorizationConfig.loginPageUri = `/${trim(
        config.loginPageUri,
        '/',
      )}?redirect_uri=${encodeURIComponent(window.location.href)}`;
    }

    /* eslint-disable @typescript-eslint/no-floating-promises */
    (async () => {
      const authResult = await ensureAuthorization(ensureAuthorizationConfig);

      setIsAuthenticated(authResult === true);

      if (authResult !== true && authResult?.login && strategy === 'local') {
        setRedirectUrl(authResult.login);
      }

      if (
        authResult !== true &&
        authResult?.redirect &&
        strategy === 'redirect'
      ) {
        setRedirectUrl(authResult.redirect);
      }

      setIsReady(true);
    })();
  }, [strategy, config]);

  useEffect(() => {
    if (
      !shouldRedirect ||
      !isReady ||
      isAuthenticated !== false ||
      !redirectUrl
    ) {
      return;
    }

    setTimeout(() => {
      window.location.replace(redirectUrl);
    }, 200);
  }, [isReady, isAuthenticated, redirectUrl, shouldRedirect]);

  useEffect(() => {
    if (isAuthenticated !== true) {
      return;
    }

    const client = getApolloAuthClient();

    (async () => {
      const { data } = await client.query({
        query: gql`
          {
            viewer {
              id
              name
              roles {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        `,
      });

      setUser(data?.viewer as User);
    })();
  }, [isAuthenticated]);

  async function logout() {
    const logoutUrl = `${FAUST_API_BASE_PATH}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`;

    const res = await fetch(logoutUrl, {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error('There was an error logging out the user');
    }

    window.location.reload();
  }

  async function login(usernameEmail: string, password: string) {}

  return {
    isAuthenticated,
    isReady,
    user,
    redirectUrl,
    logout,
    login,
  };
}
