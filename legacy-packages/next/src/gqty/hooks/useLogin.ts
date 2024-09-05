// eslint-disable-next-line import/extensions
import type { Mutation } from '@faustjs/core/client';
// eslint-disable-next-line import/extensions
import { fetchAccessToken } from '@faustjs/core/auth';
// eslint-disable-next-line import/extensions
import { getQueryParam, isValidEmail } from '@faustjs/core/utils';
import type { RequiredSchema } from '@faustjs/react';
import { UseMutationOptions } from '@gqty/react';
import noop from 'lodash/noop.js';
import { useEffect } from 'react';
import type { NextClientHooks, NextClientHooksWithAuth } from '.';

export interface UseLoginOptions {
  useMutationOptions?: UseMutationOptions<{
    code?: string | null | undefined;
    error?: string | null | undefined;
  }>;
}

export function create<Schema extends RequiredSchema>(
  useMutation: NextClientHooks<Schema>['useMutation'],
): NextClientHooksWithAuth<Schema>['useLogin'] {
  return (options?: UseLoginOptions) => {
    const { useMutationOptions } = options || {};

    const [loginMutation, { isLoading, data, error }] = useMutation(
      (
        mutation: Mutation,
        args: {
          username: string | undefined;
          email: string | undefined;
          password: string;
        },
      ) => {
        const { username, email, password } = args;

        const { code, error: mutationError } =
          mutation.generateAuthorizationCode({
            input: {
              username,
              email,
              password,
            },
          }) || {};

        if (mutationError) {
          return { error: mutationError };
        }

        return { code };
      },
      useMutationOptions,
    );

    /**
     * Exchange a username/email and password for an authorization code
     *
     * @param {string} usernameEmail A WordPress username or email
     * @param {string} password The password for the username/email
     *
     * @returns Promise<void>
     */
    async function login(
      usernameEmail: string,
      password: string,
    ): Promise<void> {
      await loginMutation({
        args: {
          username: isValidEmail(usernameEmail) ? undefined : usernameEmail,
          email: isValidEmail(usernameEmail) ? usernameEmail : undefined,
          password,
        },
      });
    }

    // If there is a successful login, and a redirect_uri query param present in the
    // url, then redirect the user to the redirect_uri.
    useEffect(() => {
      if (typeof window === 'undefined') {
        return noop;
      }

      if (!data || !data.code) {
        return noop;
      }

      let mounted = true;

      void (async () => {
        if (!mounted) {
          return;
        }

        await fetchAccessToken(data.code as string | undefined);

        if (!mounted) {
          return;
        }

        const redirectUri = getQueryParam(window.location.href, 'redirect_uri');

        if (redirectUri) {
          window.location.replace(redirectUri);
        }
      })();

      return () => {
        mounted = false;
      };
    }, [data]);

    return { login, isLoading, data, error };
  };
}
