# @faustjs/core

## 0.15.13

### Patch Changes

- 6b71e32: Add deprecation notices

## 0.15.10

### Patch Changes

- d52fcdb: Added notice for preference towards the new faust.js version.

## 0.15.7

### Patch Changes

- 6ab4e1d: Added support for older versions of iOS

## 0.15.6

### Patch Changes

- a03fae1: Adds @deprecated flag in core/config `applyRequestContext`
- 59241bb: build: Updates eslint to v8

## 0.15.4

### Patch Changes

- d2b2b39: Fixed previews when trailingSlash is enabled in Next.js config

## 0.15.2

### Patch Changes

- c004310: Fixed a bug where expired refresh tokens were not being cleared from the browser cookie, possibly resulting in infinite loops during authentication, or an inability to request authenticated content.

## 0.15.1

### Patch Changes

- 3c1280b: Updated `schema.generated.ts` to support `contentNode` for `usePreviewNode` usage.

## 0.15.0

### Minor Changes

- a044a07: Add file extensions to import statements to fully support ES Modules. Support for Next.js 12 🎉

## 0.14.1

### Patch Changes

- 844df61: Fixed an issue that caused an `Internal Server Error` when fetching access/refresh tokens when permalinks are not set

## 0.14.0

### Minor Changes

- dc936a5: Updated internal auth endpoints and headers for WPE Headless plugin rename.

  The FaustWP plugin has deprecated the REST endpoint that `@faustjs/core` uses for authorization.
  Both the plugin and the `@faustjs/core` package will continue to work with the deprecated endpoint
  until it is removed in a future version. Make sure to always update your FaustWP plugin and `@faustjs`
  packages together to avoid any issues that may arise from incompatible versions.

## 0.13.1

### Patch Changes

- a3b08d6: Updated dependencies

## 0.12.4

### Patch Changes

- 81d6162: Refactored core exports and naming to make root namespace cleaner

## 0.12.3

### Patch Changes

- 068f3c3: Fixed an issue that caused the API Router to not route requests with an authorization code

## 0.12.0

### Minor Changes

- 4ded997: Implement `logoutHandler` middleware
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

- f0f2706: Introduced the `apiRouter` that will handle all of the Faust.js related endpoints for you.

  ## Breaking Changes

  With the introduction of `apiRouter` we have introduced a breaking change. You will need to remove your `pages/api/auth/wpe-headless.ts` file, and create a new file, `pages/api/faust/[[...route]].ts` with the following content:

  ```ts
  import 'faust.config';
  import { apiRouter } from '@faustjs/core/api';

  export default apiRouter;
  ```

  **Note**: The `[[...route]]` naming convention is a [Next.js convention for a catch-all route.](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes)

  ### Config changes

  The `apiEndpoint` and `apiUrl` config options have been removed in exchange for the `apiBasePath` option. This option specifies the base path for all of the Faust.js endpoints. The `blogUrlPrefix` is no longer necessary and has been removed from the config interface.

### Patch Changes

- c4b205a: Implemented `changesets` 🦋
- 5c7f662: Added the appropriate `Content-Type` response header to the `authorizeHandler` middleware
