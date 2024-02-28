# @faustwp/blocks

## 4.0.0

### Major Changes

- aad3bbc: BREAKING CHANGE: With the deprecation of node version 16.x and it no longer being maintained we have updated our engines and workflows to only use 18+. Please update to use node version 18+.

## 3.0.0

### Major Changes

- f6c6b0c: **BREAKING**: Make `attributes` field on core blocks optional to comply with the `WordPressBlock` type interface. Thanks @traed!

## 2.0.0

### Patch Changes

- Updated dependencies [f308cc5]
  - @faustwp/core@1.1.0

## 1.2.0

### Minor Changes

- 240a47b: Introduced the `CoreList` block. It can be used like:

  `wp-blocks/index.js`:

  ```jsx
  import { CoreBlocks } from '@faustwp/blocks';

  export default {
    // Your other blocks...
    CoreList: CoreBlocks.CoreList,
  };
  ```

- 19c7395: Added CoreHeading block implementation.

### Patch Changes

- 0cf14d4: Provide reference implementation of core image
- Updated dependencies [790b485]
  - @faustwp/core@1.0.3

## 1.1.0

### Minor Changes

- f087feb: Feat: Add CoreButton and CoreButtons blocks

### Patch Changes

- Updated dependencies [80e5605]
  - @faustwp/core@1.0.2

## 1.0.0

### Major Changes

- 7952ebe: Transitioned to [Semantic Versioning](https://semver.org).

### Minor Changes

- ba51e7b: Refactor: Cleanup, Remove Lodash, added Block display names, removed useBlockData

### Patch Changes

- 2cd74c4: Add CoreSeparator
- 3fd30c5: Add reference implementation of CoreCode block
- 49e797e: Add reference implementation of CoreColumns and CoreColumn block
- daa5c9a: Add reference implementation of CoreParagraph block
- Updated dependencies [442c834]
- Updated dependencies [7952ebe]
- Updated dependencies [442c834]
- Updated dependencies [2934310]
- Updated dependencies [4cae3d9]
- Updated dependencies [f5dac42]
  - @faustwp/core@1.0.0

## 0.3.1

### Patch Changes

- 66ecbb3: Adds getStyles helper that generates inline styles from block attributes.
- 8a74237: Feat: Add fromThemeJson helper
- 200bdb8: Add min engines declaration in package.json
- Updated dependencies [8eec554]
- Updated dependencies [200bdb8]
- Updated dependencies [0521fd3]
  - @faustwp/core@0.2.13

## 0.3.0

### Minor Changes

- cce2828: **BREAKING** added a new peer dependency of `@faustwp/core` at a version of 0.2.9 or higher

### Patch Changes

- cce2828: `WordPressBlocksViewer` now accepts a new prop `fallbackBlock` that can be used to override the default fallback block. This prop also takes precedence over the Faust filter.
- cce2828: Add a Faust filter to modify the `resolveBlockTemplate` logic
- cce2828: Added a Faust filter to modify the fallback block shown in `WordPressBlocksViewer` when there is no React component to resolve
- Updated dependencies [d8b76ef]
- Updated dependencies [0ad4567]
  - @faustwp/core@0.2.10

## 0.2.1

### Patch Changes

- fed67a4: Added: Throw an error if the `blocks` prop was not set on the `<WordPressBlocksViewer>` component

## 0.2.0

### Minor Changes

- 9f4c23d: **[BREAKING]** Renamed `contentBlocks` field to `blocks` in WordpressBlocksViewer

### Patch Changes

- 7be7dfc: Properly exports `cjs` dist build for CommonJS support
- 1253e86: Bug: Reference correct type definitions in package.json
- 1c8f79b: Type Definition fixes+improvements for Blocks and Core

## 0.1.1

### Patch Changes

- ef9ebdc: Change DefaultBlock to use `div` instead of `span`

## 0.1.0

### Minor Changes

- a700651: Initial Blocks package
