---
'@faustwp/experimental-app-router': patch
---

Added the `onLogin` server action to login a user:

```tsx
import { onLogin } from '@faustwp/experimental-app-router';

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
</form>;
```
