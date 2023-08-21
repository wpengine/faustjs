export default function Page() {
  return (
    <form>
      <fieldset>
        <label htmlFor="username">Username</label>
        <input name="username" type="text" />
      </fieldset>

      <fieldset>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
      </fieldset>

      <button type="submit">Login</button>
    </form>
  );
}
