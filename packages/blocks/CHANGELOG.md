# @faustwp/blocks

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
