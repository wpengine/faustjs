# @faustjs/next

## 0.15.1

### Patch Changes

- c74ce4f: Introduced the `usePreviewNode` hook to get preview data from any post type. You can use it like so:

  ```tsx
  import type { Page, Post } from 'client';
  import { client } from 'client';

  export default function Preview() {
    const isLoading = client.useIsLoading();
    const { typeName, node } = client.auth.usePreviewNode();

    if (isLoading || node === undefined) {
      return <p>Loading...</p>;
    }

    if (node === null) {
      return <p>Post not found</p>;
    }

    switch (typeName) {
      case 'Page': {
        const page = node as Page;
        return (
          <>
            <h1>{page.title()}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content() }} />
          </>
        );
      }
      case 'Post': {
        const post = node as Post;
        return (
          <>
            <h1>{post.title()}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content() }} />
          </>
        );
      }
      // Add custom post types here as needed
      default: {
        throw new Error(`Unknown post type: ${typeName}`);
      }
    }
  }
  ```

  With `usePreviewNode`, we have deprecated the `usePreview` hook. It is still available, but it is recommended to use `usePreviewNode` instead.

- Updated dependencies [3c1280b]
- Updated dependencies [3c1280b]
  - @faustjs/react@0.15.1
  - @faustjs/core@0.15.1

## 0.15.0

### Minor Changes

- a044a07: Add file extensions to import statements to fully support ES Modules. Support for Next.js 12 🎉

### Patch Changes

- Updated dependencies [a044a07]
  - @faustjs/core@0.15.0
  - @faustjs/react@0.15.0

## 0.14.0

### Patch Changes

- Updated dependencies [dc936a5]
  - @faustjs/core@0.14.0
  - @faustjs/react@0.14.0

## 0.13.1

### Patch Changes

- a3b08d6: Fixed an intermittent error `TypeError: Cannot read property 'get' of undefined` when running in dev mode.
- a3b08d6: Updated dependencies
- Updated dependencies [a3b08d6]
  - @faustjs/core@0.13.1
  - @faustjs/react@0.13.1

## 0.13.0

### Minor Changes

- 8630834: **BREAKING**: Rename `HeadlessProvider` to `FaustProvider`

## 0.12.4

### Patch Changes

- 81d6162: Refactored core exports and naming to make root namespace cleaner
- Updated dependencies [81d6162]
  - @faustjs/core@0.12.4
  - @faustjs/react@0.12.4

## 0.12.3

### Patch Changes

- 068f3c3: Introduced the `useLogout` hook to facilitate logging out a user

  See https://faustjs.org/docs/next/reference/hooks/useLogout for more details.

- Updated dependencies [068f3c3]
  - @faustjs/core@0.12.3

## 0.12.2

### Patch Changes

- 1e32f81: Typeings for `getNextStaticProps` and `getNextServerSideProps` now allow and protect custom props.

## 0.12.1

### Patch Changes

- 7d30277: `logQueries` is can now be called and will log GraphQL queries if desired.

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
