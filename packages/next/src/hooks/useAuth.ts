import { ensureAuthorization, headlessConfig } from '@faustjs/core';
import { useEffect, useState } from 'react';
import type { RequiredSchema } from '@faustjs/react';
import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import trim from 'lodash/trim';
import type { NextClientHooks } from '.';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(): NextClientHooks<Schema, ObjectTypesNames, ObjectTypes>['useAuth'] {
  return () => {
    const { authType, loginPagePath } = headlessConfig();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
      undefined,
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [authResult, setAuthResult] = useState<
      | true
      | { redirect?: string | undefined; login?: string | undefined }
      | undefined
    >(undefined);

    // Check if a user is authenticated
    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      /* eslint-disable @typescript-eslint/no-floating-promises */
      (async () => {
        const auth = await ensureAuthorization({
          redirectUri: window.location.href,
          loginPageUri: `/${trim(
            loginPagePath,
            '/',
          )}/?redirect_uri=${encodeURIComponent(window.location.href)}`,
        });

        setAuthResult(auth);
        setIsAuthenticated(auth === true);
        setIsLoading(false);
      })();
    }, [loginPagePath]);

    // Redirect the user to the login page if they are not authenticated
    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      if (isUndefined(isAuthenticated) || isAuthenticated === true) {
        return;
      }

      // The user is not authenticated. Redirect them to the login page.
      setTimeout(() => {
        if (!isObject(authResult)) {
          return;
        }

        if (authType === 'local' && authResult.login) {
          window.location.replace(authResult.login);
        }

        if (authType === 'redirect' && authResult.redirect) {
          window.location.replace(authResult.redirect);
        }
      }, 200);
    }, [isAuthenticated, authResult, authType]);

    return { isAuthenticated, isLoading, authResult };
  };
}
