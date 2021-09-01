import {
  fetchAccessToken,
  getQueryParam,
  isValidEmail,
  Mutation,
} from '@faustjs/core';
import type { RequiredSchema } from '@faustjs/react';
import { UseMutationOptions } from '@gqty/react';
import { useEffect } from 'react';
import type { NextClient } from '../client';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  useMutation: NextClient<Schema, ObjectTypesNames, ObjectTypes>['useMutation'],
): NextClient<Schema, ObjectTypesNames, ObjectTypes>['useLogin'] {
  return (options?: {
    useMutationOptions?: UseMutationOptions<{
      code?: string | null | undefined;
      error?: string | null | undefined;
    }>;
  }) => {
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
        return;
      }

      if (!data || !data.code) {
        return;
      }

      void (async () => {
        await fetchAccessToken(data.code as string | undefined);

        const redirectUri = getQueryParam(window.location.href, 'redirect_uri');

        if (redirectUri) {
          window.location.replace(redirectUri);
        }
      })();
    }, [data]);

    return { login, isLoading, data, error };
  };
}
