export default function Page() {
  async function loginUser(data) {
    'use server';

    console.log(data.get('username'));
  }

  return (
    <form action={loginUser}>
      <fieldset>
        <label htmlFor="username">Username</label>
        <input name="username" type="text" />
      </fieldset>

      <fieldset>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
      </fieldset>
    </form>
  );
}
