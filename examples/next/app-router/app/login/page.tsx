import react from 'react';
import { loginAction } from '@faustwp/experimental-app-router';

export default async function Page() {
  return (
    <>
      <h2>Login</h2>

      {/* @ts-ignore */}
      <form action={loginAction}>
        <fieldset>
          <label htmlFor="usernameEmail">Username or Email</label>
          <input type="name" name="usernameEmail" />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </fieldset>

        <button type="submit">Login</button>
      </form>
    </>
  );
}
