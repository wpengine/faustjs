import { gql } from '@apollo/client';
import { getApolloClient } from '@faustwp/core/dist/cjs/client.js';
import { isValidEmail } from '@faustwp/core/dist/cjs/utils/assert.js';
import { fetchAccessToken } from '../server/auth/fetchAccessToken.js';
import { getUrl } from '../lib/getUrl.js';

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

export type GenerateAuthCodeMutationRes =
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

function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String;
}

export async function loginAction(formData: FormData) {
  'use server';

  const usernameEmail = formData.get('usernameEmail');
  const password = formData.get('password');

  if (!usernameEmail) {
    throw new Error('The usernameEmail field is required');
  }

  if (!isString(usernameEmail)) {
    throw new Error('The usernameEmail field should be a string');
  }

  if (!password) {
    throw new Error('The password field is required');
  }

  if (!isString(password)) {
    throw new Error('The password field should be a string');
  }

  const client = getApolloClient();

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

  const mutationRes = await client.mutate<GenerateAuthCodeMutationRes>({
    mutation: GENERATE_AUTHORIZATION_CODE,
    variables: mutationVariables,
  });

  if (mutationRes.data?.generateAuthorizationCode.error !== null) {
    return {
      error: mutationRes.data?.generateAuthorizationCode.error,
    };
  }

  const { code } = mutationRes.data.generateAuthorizationCode;

  console.log(await tokenRes.json());

  return {
    message: 'success',
  };
}
