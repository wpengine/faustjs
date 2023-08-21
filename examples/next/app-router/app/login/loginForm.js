'use client';
import { useLogin } from '@faustwp/core';
import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, data, error } = useLogin();

  console.log(data);
  console.log(error);

  return (
    <form onSubmit={login(username, password)}>
      <fieldset>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </fieldset>

      <fieldset>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </fieldset>
    </form>
  );
}
