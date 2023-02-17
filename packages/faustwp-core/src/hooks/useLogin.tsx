import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { fetchAccessToken } from '../auth/client/accessToken.js';
import { isValidEmail } from '../utils/index.js';

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

type GenerateAuthCodeMutationRes =
  | {
      code: string;
      error: null;
    }
  | {
      code: null;
      error: string;
    };

export function useLogin() {
  /**
   * Use our own data state value here instead of the data value from
   * the useMutation because we only want to return the data after the
   * access token has been fetched, as this is truly when a user is "logged in"
   */
  const [data, setData] = useState<
    GenerateAuthCodeMutationRes | null | undefined
  >(undefined);

  const [loginMutation, { data: mutationData, loading, error }] =
    useMutation<GenerateAuthCodeMutationRes>(GENERATE_AUTHORIZATION_CODE);

  /**
   * Callable function to login a user from your Faust frontend.
   *
   * @param usernameEmail The user's username or email
   * @param password The user's password
   * @param redirectUrl An optional URL to redirect to after successful login.
   */
  async function login(
    usernameEmail: string,
    password: string,
    redirectUrl?: string,
  ) {
    const mutationArgs: {
      username?: string;
      email?: string;
      password: string;
    } = { password };

    if (isValidEmail(usernameEmail)) {
      mutationArgs.email = usernameEmail;
    } else {
      mutationArgs.username = usernameEmail;
    }

    await loginMutation({ variables: mutationArgs });

    if (!mutationData) {
      return;
    }

    if (mutationData.error !== null) {
      setData(mutationData);
      return;
    }

    await fetchAccessToken(mutationData.code);

    setData(mutationData);

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  return {
    login,
    loading,
    data,
    error,
  };
}
