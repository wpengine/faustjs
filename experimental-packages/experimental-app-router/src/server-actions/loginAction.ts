import { gql } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { print } from '@apollo/client/utilities';
import { fetchTokens } from '../server/auth/fetchTokens.js';
import { setRefreshToken } from './utils/setRefreshToken.js';
import { isValidEmail, getGraphqlEndpoint } from '../faust-core-utils.js';

export const GENERATE_AUTHORIZATION_CODE = gql`
  mutation GenerateAuthorizationCode(
    $email: String
    $username: String
    $password: String!
  ) {
    generateAuthorizationCode(
      input: { email: $email, username: $username, password: $password }
    ) {
      code
      error
    }
  }
`;

export type GenerateAuthCodeMutationRes = {
  data?:
    | {
        generateAuthorizationCode: {
          code: string;
          error: null;
        };
      }
    | {
        generateAuthorizationCode: {
          code: null;
          error: string;
        };
      };
};

function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String;
}

export const validationError = {
  error:
    'There were validation errors. Please ensure your login action has two inputs, "usernameEmail" and "password"',
};

export async function onLogin(formData: FormData) {
  'use server';

  try {
    const usernameEmail = formData.get('usernameEmail');
    const password = formData.get('password');

    if (
      !usernameEmail ||
      !isString(usernameEmail) ||
      !password ||
      !isString(password)
    ) {
      return validationError;
    }

    const mutationVariables: {
      username?: string;
      email?: string;
      password: string;
    } = { password };

    if (isValidEmail(usernameEmail)) {
      mutationVariables.email = usernameEmail;
    } else {
      mutationVariables.username = usernameEmail;
    }

    /**
     * Using standard fetch here so we don't muddy the waters with Next caching
     * and Apollo.
     */
    const mutationRes = await fetch(`${getGraphqlEndpoint()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: print(GENERATE_AUTHORIZATION_CODE),
        variables: mutationVariables,
      }),
      // We do not want Next caching the generate auth code response.
      cache: 'no-store',
    });

    const { data } = (await mutationRes.json()) as GenerateAuthCodeMutationRes;

    if (data?.generateAuthorizationCode.error !== null) {
      return {
        error: data?.generateAuthorizationCode.error,
      };
    }

    const { code } = data.generateAuthorizationCode;

    const tokens = await fetchTokens(code);

    if (tokens === null) {
      throw new Error('Could not fetch tokens');
    }

    await setRefreshToken(
      tokens.refreshToken,
      tokens.refreshTokenExpiration * 1000,
    );

    return {
      message: 'User was successfully logged in',
    };
  } catch (err) {
    console.error('User could not be logged in:', err);

    return {
      error: 'There was an error logging in the user',
    };
  }
}
