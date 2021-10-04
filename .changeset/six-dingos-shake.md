---
'@faustjs/next': minor
---

Introduced an argument to the `useAuth` hook, `UseAuthOptions`, to provide users the ability to disable automatic redirect from the `useAuth` hook upon an unauthenticated user.

```tsx
import { client } from 'client';

export default function Page() {
  const { isLoading, isAuthenticated, authResult } = client.auth.useAuth({
    shouldRedirect: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return (
      <p>You need to be authenticated to see this content. Please login.</p>
    );
  }

  return <p>Authenticated content</p>;
}
```
