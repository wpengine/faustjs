import { config } from '@faustjs/core';
// eslint-disable-next-line import/extensions
import { ensureAuthorization } from '@faustjs/core/auth';
import defaults from 'lodash/defaults.js';
import isObject from 'lodash/isObject.js';
import isUndefined from 'lodash/isUndefined.js';
import noop from 'lodash/noop.js';
import trim from 'lodash/trim.js';
import { useEffect, useState } from 'react';

export type UseAuthResponse = {
  isLoading: boolean;
  isAuthenticated: boolean | undefined;
  authResult:
    | true
    | { redirect?: string | undefined; login?: string | undefined }
    | undefined;
}

export interface UseAuthOptions {
  /**
   * Specify if the useAuth hook should facilitate the redirect to the appropriate url.
   *
   * @default true
   * @type {boolean}
   * @memberof UseAuthOptions
   */
  shouldRedirect?: boolean;
}

export function useAuth(useAuthOptions?: UseAuthOptions): UseAuthResponse {
  const options = defaults({}, useAuthOptions, {
    shouldRedirect: true,
  });

  const { shouldRedirect } = options;
  const { authType, loginPagePath } = config();
  const [{ isAuthenticated, isLoading, authResult }, setState] = useState<any>({
    isAuthenticated: undefined,
    isLoading: true,
    authResult: undefined,
  });

  // Check if a user is authenticated
  useEffect(() => {
    if (typeof window === 'undefined') {
      return noop;
    }
    let mounted = true;

    /* eslint-disable @typescript-eslint/no-floating-promises */
    (async () => {
      if (!mounted) {
        return;
      }

      const auth = await ensureAuthorization({
        redirectUri: window.location.href,
        loginPageUri: `/${trim(
          loginPagePath,
          '/',
        )}/?redirect_uri=${encodeURIComponent(window.location.href)}`,
      });

      if (!mounted) {
        return;
      }

      setState({
        authResult: auth,
        isAuthenticated: auth === true,
        isLoading: false,
      });
    })();

    return () => {
      mounted = false;
    };
  }, [loginPagePath]);

  // Redirect the user to the login page if they are not authenticated
  useEffect(() => {
    // Do not redirect if specified in UseAuthOptions.
    if (!shouldRedirect) {
      return noop;
    }

    if (typeof window === 'undefined') {
      return noop;
    }

    if (isUndefined(isAuthenticated) || isAuthenticated === true) {
      return noop;
    }

    // The user is not authenticated. Redirect them to the login page.
    const timeout = setTimeout(() => {
      if (!isObject(<UseAuthResponse>authResult)) {
        return;
      }

      if (authType === 'local' && authResult.login) {
        window.location.replace(authResult.login);
      }

      if (authType === 'redirect' && authResult.redirect) {
        window.location.replace(authResult.redirect);
      }
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [shouldRedirect, isAuthenticated, authResult, authType]);

  return { isAuthenticated, isLoading, authResult };
};
