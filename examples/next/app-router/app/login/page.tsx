import { onLogin } from '@faustwp/experimental-app-router';
import { redirect } from 'next/navigation';

export default async function Page() {
  async function loginAction(formData: FormData) {
    'use server';

    const res = await onLogin(formData);

    if (res.error) {
      /**
       * @TODO Next.js is still working on ways persisting error messages from
       * server actions to the client.
       *
       * "Displaying loading or error states currently requires using
       * Client Components. We are exploring options for server-side functions
       * to retrieve these values as we move forward in stability for Server Actions."
       *
       * @link https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#error-handling
       */
      console.error(res.error);
    } else {
      redirect('/gated-content');
    }
  }

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
