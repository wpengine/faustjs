# @faustjs/react

## 0.15.13

### Patch Changes

- 6b71e32: Add deprecation notices
- Updated dependencies [6b71e32]
  - @faustjs/core@0.15.13

## 0.15.10

### Patch Changes

- d52fcdb: Added notice for preference towards the new faust.js version.
- Updated dependencies [d52fcdb]
  - @faustjs/core@0.15.10

## 0.15.7

### Patch Changes

- 6ab4e1d: Added support for older versions of iOS
- Updated dependencies [6ab4e1d]
  - @faustjs/core@0.15.7

## 0.15.6

### Patch Changes

- 59241bb: build: Updates eslint to v8
- Updated dependencies [a03fae1]
- Updated dependencies [59241bb]
  - @faustjs/core@0.15.6

## 0.15.1

### Patch Changes

- 3c1280b: Updated client to support `contentNode` for `usePreviewNode` usage.
- Updated dependencies [3c1280b]
  - @faustjs/core@0.15.1

## 0.15.0

### Minor Changes

- a044a07: Add file extensions to import statements to fully support ES Modules. Support for Next.js 12 🎉

### Patch Changes

- Updated dependencies [a044a07]
  - @faustjs/core@0.15.0

## 0.14.0

### Patch Changes

- Updated dependencies [dc936a5]
  - @faustjs/core@0.14.0

## 0.13.1

### Patch Changes

- a3b08d6: Updated dependencies
- Updated dependencies [a3b08d6]
  - @faustjs/core@0.13.1

## 0.12.4

### Patch Changes

- 81d6162: Refactored core exports and naming to make root namespace cleaner
- Updated dependencies [81d6162]
  - @faustjs/core@0.12.4

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

### Patch Changes

- c4b205a: Implemented `changesets` 🦋
- Updated dependencies [4ded997]
- Updated dependencies [8243e9f]
- Updated dependencies [f0f2706]
- Updated dependencies [c4b205a]
- Updated dependencies [5c7f662]
  - @faustjs/core@0.12.0
