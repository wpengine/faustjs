# @faustwp/core

## 0.2.1

### Patch Changes

- d0c1395: Created two new TypeScript types (`FaustPlugin` and `FaustHooks`) which can be used to type check Faust plugins:

  ```tsx
  import { FaustHooks, FaustPlugin } from '@faustwp/core';

  export class MyPlugin implements FaustPlugin {
    apply(hooks: FaustHooks) {}
  }
  ```

## 0.2.0

### Patch Changes

- be61b71: Added: Template variables are now being returned to the client via the `__TEMPLATE_VARIABLES__` prop.
- d1f5cc4: Added: `FaustTemplateProps<TemplateDataType, AdditionalProps>` TypeScript type so you can type your incoming props from Faust Templates
- be61b71: `getWordPressProps` now sets a smart default `revalidate` of `900` (15 minutes) when using `getStaticProps`
- be61b71: `getWordPressProps()` now accepts `props` and `revalidate` as apart of its `options` object parameter.

## 0.1.5

### Patch Changes

- 5990bb7: Added the following exports to `@faustwp/core`:

  - `getWpUrl()`
  - `getGraphqlEndpoint()`
  - `getApolloClient()`
  - `addApolloState()`

## 0.1.3

### Patch Changes

- c103fde: Pass props to getNextServerSideProps and getNextStaticProps
- 48a0715: Trim any leading/ending backslashes in `NEXT_PUBLIC_WORDPRESS_URL`

## 0.1.2

### Patch Changes

- 30b59d6: Reduce bundle size by using proper lodash import
- a17d980: Fixes incomplete Apollo Client Data merge

## 0.1.1

### Patch Changes

- 401ba91: Excluded unnecessary files in production release (src, config files, etc.)

## 0.1.0

### Minor Changes

- ddbd104: Initial Release
