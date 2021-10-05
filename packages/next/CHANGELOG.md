# @faustjs/next

## 0.12.0

### Minor Changes

- 8243e9f: `headlessConfig` from `@faustjs/core` is now just `config`, and `@faustjs/next` has its own `config` with a global revalidate option.

  Your `faust.config.js` needs to change to look like this:

  ```ts
  import { config as coreConfig } from '@faustjs/core';

  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    console.error(
      'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env.local file?',
    );
  }

  /**
   * @type {import("@faustjs/core").Config}
   */
  export default coreConfig({
    wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    apiClientSecret: process.env.WP_HEADLESS_SECRET,
  });
  ```

  Or, to configure the global `revalidate` option in `@faustjs/next`:

  ```ts
  import { config as coreConfig } from '@faustjs/core';
  import { config as nextConfig } from '@faustjs/next';

  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    console.error(
      'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env.local file?',
    );
  }

  nextConfig({
    revalidate: 60, // 1 minute
  });

  /**
   * @type {import("@faustjs/core").Config}
   */
  export default coreConfig({
    wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    apiClientSecret: process.env.WP_HEADLESS_SECRET,
  });
  ```

  > **NOTE**: `@faustjs/next` defaults to `revalidate: 900` (15 minutes).

- 5c7f662: Introduced an argument to the `useAuth` hook, `UseAuthOptions`, to provide users the ability to disable automatic redirect from the `useAuth` hook upon an unauthenticated user.

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

### Patch Changes

- c4b205a: Implemented `changesets` 🦋
- Updated dependencies [4ded997]
- Updated dependencies [8243e9f]
- Updated dependencies [f0f2706]
- Updated dependencies [c4b205a]
- Updated dependencies [5c7f662]
  - @faustjs/core@0.12.0
  - @faustjs/react@0.12.0
