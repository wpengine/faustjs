import { useState } from 'react';
import { client } from 'client';
import { fetchToken } from '../../../../../packages/core/dist/auth/newAuth';
import { redirect } from 'next/dist/server/api-utils';
import { getQueryParam } from '@faustjs/core/utils';

export default function Login() {
  const { useMutation } = client;

  const [login, { isLoading, data, error }] = useMutation(
    (mutation, input: { username: string; password: string }) => {
      return (async () => {
        const { code, error } = mutation.generateAuthorizationCode({ input });

        if (error) {
          return error;
        }

        const token = await fetchToken(code);

        if (!token) {
          return new Error('Could not fetch token');
        }

        const redirectUri = getQueryParam(window.location.href, 'redirect_uri');

        if (redirectUri) {
          window.location.replace(redirectUri);
        }

        return 'success';
      })();
    },
  );

  const [formData, setFormData] = useState(() => ({
    username: '',
    password: '',
  }));

  const errorMessage = data?.error || error?.message;

  return (
    <form>
      <label>Username</label>
      <input
        value={formData.username}
        onChange={(ev) => {
          setFormData({
            ...formData,
            username: ev.target.value,
          });
        }}
      />

      <label>Password</label>
      <input
        value={formData.password}
        onChange={(ev) => {
          setFormData({
            ...formData,
            password: ev.target.value,
          });
        }}
      />

      <button
        type="submit"
        disabled={isLoading}
        onClick={(ev) => {
          ev.preventDefault();
          login({ args: formData }).catch(console.error);
        }}>
        Login
      </button>

      {errorMessage ? <p>Error: {errorMessage}</p> : null}
    </form>
  );
}
