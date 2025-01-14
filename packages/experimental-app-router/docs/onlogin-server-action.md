# `onLogin` Server Action

The `onLogin` is function that performs a server action to login a user. It is part of the `@faustwp/experimental-app-router` package.

## Usage

Here is an example action to login the user by providing credentials to login to the WordPress backend:

```js
'use client'
import { onLogin } from '@faustwp/experimental-app-router';

<form action={onLogin}>
  <fieldset>
    <label htmlFor="usernameEmail">Username or Email</label>
    <input type="name" name="usernameEmail" />
  </fieldset>

  <fieldset>
    <label htmlFor="password">Password</label>
    <input type="password" name="password" />
  </fieldset>

  <button type="submit">Login</button>
</form>;
```

## Technical Reference

`onLogin(formData: FormData)`

The `onLogin` server action accepts an instance of HTML [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) class that is automatically provided when you use a `<form>` action field.

If the form submission is successful, the server will populate the session with a cookie that is used to maintain the authentication status on. Users will logout by submitting an onLogout action or when their authentication token expires.

## Additional Context

- [Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
