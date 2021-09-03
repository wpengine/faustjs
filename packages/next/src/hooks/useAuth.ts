import { ensureAuthorization, headlessConfig } from '@faustjs/core';
import { useEffect, useState } from 'react';
import type { RequiredSchema } from '@faustjs/react';
import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import trim from 'lodash/trim';
import type { NextClient } from '../client';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(): NextClient<Schema, ObjectTypesNames, ObjectTypes>['auth']['useAuth'] {
  return () => {
    const { authType, loginPagePath } = headlessConfig();
    const [{ isAuthenticated, isLoading, authResult }, setState] = useState<
      ReturnType<
        NextClient<Schema, ObjectTypesNames, ObjectTypes>['auth']['useAuth']
      >
    >({
      isAuthenticated: undefined,
      isLoading: true,
      authResult: undefined,
    });

    // Check if a user is authenticated
    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
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
      if (typeof window === 'undefined') {
        return;
      }

      if (isUndefined(isAuthenticated) || isAuthenticated === true) {
        return;
      }

      // The user is not authenticated. Redirect them to the login page.
      const timeout = setTimeout(() => {
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

      return () => {
        clearTimeout(timeout);
      };
    }, [isAuthenticated, authResult, authType]);

    return { isAuthenticated, isLoading, authResult };
  };
}
