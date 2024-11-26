'use client';

import { loginAction } from './action';
import { useActionState } from 'react';

export default function Page() {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <>
      <h2>Login</h2>

      <form action={formAction}>
        <fieldset>
          <label htmlFor="usernameEmail">Username or Email</label>
          <input type="name" name="usernameEmail" />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </fieldset>

        <button disabled={isPending}>
          {isPending ? 'Loading...' : 'Login'}
        </button>

        {state.error && (
          <p dangerouslySetInnerHTML={{ __html: state.error }}></p>
        )}
      </form>
    </>
  );
}
