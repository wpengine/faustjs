# @faustwp/core

## 0.2.11

### Patch Changes

- 4a4ef79: Add `resolvedUrl` filter for modifying the resolved URL in the Faust template system

## 0.2.10

### Patch Changes

- d8b76ef: flatListToHierarchical is now in core instead of the projects.
- 0ad4567: - Requests to the connected WordPress site's GraphQL endpoint will now use `/index.php?graphql`.

## 0.2.9

### Patch Changes

- eddf4e2: Expose `hooks` in `@faustwp/core` so other packages can register their own filters and actions

## 0.2.8

### Patch Changes

- 67ae4fd: Return `data` in props from Next.js pages that use the `getNextStaticProps`/`getNextServerSideProps` Faust helper functions
- 67ae4fd: Create `FaustPage<Data, Props>` TypeScript type for Next.js pages that use Faust helpers:

  ```tsx
  import { FaustPage } from '@faustwp/core';

  type GetPageData = {
    generalSettings: {
      title: string;
    };
  };

  type PageProps = {
    myProp: string;
  };

  const Page: FaustPage<GetPageData, PageProps> = (props) => {
    const { myProp, data } = props;
    return <></>;
  };
  ```

## 0.2.7

### Patch Changes

- 1c8f79b: Type Definition fixes+improvements for Blocks and Core
- d775f47: Rectifies return type of getWordPressProps and getNextStaticProps for TypeScript

## 0.2.6

### Patch Changes

- 64e4227: Fixed issue "Cannot find module"

## 0.2.5

### Patch Changes

- 8c48faa: Remove `disableLogging` property from `FaustConfig` TypeScript type, as this was only a property in old Faust.
- 681197e: Added an experimental toolbar in order to create a familiar experience for WordPress publishers & developers. Faust users can opt-in to displaying the Toolbar by defining `experimentalToolbar: true` within their project's faust.config.js.
- fcc4c49: Introduced the `useLogin` hook to handle logging into your Faust app without being redirected to WordPress:

  ```js
  import { useLogin } from '@faustwp/core';

  const { login, loading, data, error } = useLogin();
  ```

  Please visit the [reference docs](https://faustjs.org/docs/reference/useLogin) for more information on the API.

- 8ad77cb: Bug fix: Fixes Hot Module Reload (HMR) issue within wp-templates
- 56b7a8f: Added a new skeleton component for toolbar nodes. Users can leverage this new component to handle loading states within custom toolbar nodes.
- f28f912: Exports `getNextServerSideProps` in `core` index.
- fcc4c49: Introduced the `useLogout` hook to handle logging out in your Faust app:

  ```js
  import { useLogout } from '@faustwp/core';

  const { error, logout, loading } = useLogin();
  ```

  Please visit the [reference docs](https://faustjs.org/docs/reference/useLogout) for more information on the API.

- fcc4c49: Re-introduced the `useAuth` hook to handle authentication in your Faust app:

  ```js
  import {useAuth} from '@faustwp/core'

  const {isAuthenticated, isReady, loginUrl} = useAuth(options?);
  ```

  Please visit the [reference docs](https://faustjs.org/docs/reference/useAuth) for more information on the API.

## 0.2.4

### Patch Changes

- 0da4e04: Add locale to context that is passed to template variables
- 9caf4dd: Implemented `getSitemapProps` from old Faust for sitemap supported! `getSitemapProps` in new Faust has less config that is required. To get started, create `pages/sitemap.xml.js` with the following content:

  ```jsx
  import { getSitemapProps } from '@faustwp/core';

  export default function Sitemap() {}

  export function getServerSideProps(context) {
    return getSitemapProps(context, {
      frontendUrl: process.env.FRONTEND_URL, // Set the FRONTEND_URL as an env var
    });
  }
  ```

  For more information, visit the [sitemaps guide](https://faustjs.org/docs/guides/sitemaps) or the [`getSitemapProps` reference doc](https://faustjs.org/docs/reference/getSitemapProps)

## 0.2.3

### Patch Changes

- f3a2d9e: Bug Fix: Propagate `revalidate` property in getNextStaticProps.

## 0.2.2

### Patch Changes

- 0fa846a: Added new header, `x-using: faust`. This replaces the previous header, `x-powered-by: Faust`, as it was being overwritten by various server hosts.
- c545b11: Added a debug mode by setting the `FAUST_DEBUG` environment variable to either `true` or `1`
- 4dce6dc: Added support for FAUST_SECRET_KEY in addition to the pre-existing FAUSTWP_SECRET_KEY.

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
