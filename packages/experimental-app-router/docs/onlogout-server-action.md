# `onLogout` Server Action

The `onLogout` function performs a server action to log out a authenticated user. It is part of the `@faustwp/experimental-app-router` package.

## Usage

Here is an example action to log out an existing user that had previously been authenticated:

```js
'use client'
import { onLogout } from '@faustwp/experimental-app-router';

<form action={onLogout}>
  <button type="submit">Logout</button>
</form>;
```

## Technical Reference

`onLogout()` This function does not accept any arguments.

If the form submission is successful, the server will remove the session cookie that is used to maintain the authentication status.

## Additional Context

- [Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
