import { useState } from 'react';
import { client } from 'client';

export default function Login() {
  const { useLogin } = client;
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, data, error } = useLogin();

  console.log('isLoading', isLoading);
  console.log('data', data);
  console.log('error', error);

  return (
    <form>
      <label>Username</label>
      <input
        value={usernameEmail}
        onChange={(e) => setUsernameEmail(e.target.value)}
      />

      <label>Password</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      <button
        type="submit"
        disabled={isLoading}
        onClick={async (e) => {
          e.preventDefault();
          await login(usernameEmail, password);
        }}>
        Login
      </button>
    </form>
  );
}
