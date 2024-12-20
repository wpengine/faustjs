# @faustwp/experimental-app-router

## 0.6.0

### Minor Changes

- 5457479: ---

  ## '@faustwp/experimental-app-router': minor

  Update @faustwp/experimental-app-router to account for next 15 changes to cookies and update NextResponse import

  Notable changes:

  - Adding await to all cookies requests as per Next documentation: https://nextjs.org/docs/app/api-reference/functions/cookies

  ```
  import { cookies } from 'next/headers'

  export default async function Page() {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')
    return '...'
  }
  ```

  - Files changed:

    - packages/experimental-app-router/src/server-actions/logoutAction.ts
    - packages/experimental-app-router/src/server-actions/utils/setRefreshToken.ts
    - packages/experimental-app-router/src/server/auth/fetchTokens.ts
    - packages/experimental-app-router/src/server/routeHandler/tokenHandler.ts

  - Updated Next App Router example to use latest next version and React 19 RC.
  - Updated Example Login form using React 19s useActionState
  - Updated Awaiting of params for Next 15
  - Files Changed:
    - examples/next/app-router/app/login/page.tsx
    - examples/next/app-router/package.json
    - examples/next/app-router/[slug]hasPreviewProps.ts (made async)
    - examples/next/app-router/[slug]page.tsx

## 0.5.0

### Minor Changes

- e22b87d: **@faustwp/cli**: Migrates `glob-promise` dependency to Promise support.

  **@faustwp/experimental-app-router**: Update peer dependency of `@apollo/experimental-nextjs-app-support >=0.11.5`.

## 0.4.0

### Minor Changes

- 53bb9a6d: Updated dependencies, peerDependencies and devDependencies to better support local development and debugging.

## 0.3.1

### Patch Changes

- aee31a5: Fixed issue where Faust's route handler failed to retrieve a token when trailingSlash is set to true in next.config.js.

## 0.3.0

### Minor Changes

- 4cba024: Changed the `sameSite` property on the refresh token cookie from `strict` to `lax` for requests originating from WordPress.

## 0.2.2

### Patch Changes

- 626207b: Added: New util for fetching data on the client side. In a client component (`use client`), you can now use Apollo's `useQuery` to fetch data once your application is wrapped with the `<FaustProvider>` component. This new component is available via:

  ```tsx
  import { FaustProvider } from '@faustwp/experimental-app-router/ssr';
  ```

## 0.2.1

### Patch Changes

- 6276c80: Fix broken build from 0.2.0

## 0.2.0

### Minor Changes

- 6e43598: **BREAKING**: Updated the following peer dependencies to new required minimums:

  - `@apollo/experimental-nextjs-app-support`: `0.4.1` -> `0.5.0`
  - `next`: `12.1.6` -> `14.0.0`
  - `react`: `17.0.2` -> `18.0.0`
  - `react-dom`: `17.0.2` -> `18.0.0`

- 6e43598: **BREAKING**: This package now requires **Node 18+**

## 0.1.0

### Minor Changes

- 77c5d4f: **BREAKING**: Removed `cjs` support. The experimental app router package now is ESM only.

### Patch Changes

- 77c5d4f: Fixed an issue where the Apollo Client was being shipped to the browser client bundle resulting in large bundle sizes (150kb+). For more context: https://github.com/apollographql/apollo-client-nextjs/issues/95

## 0.0.4

### Patch Changes

- b2ad517: Added the `onLogin` server action to login a user:

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

- Updated dependencies [b201ba2]
  - @faustwp/cli@1.1.3

## 0.0.3

### Patch Changes

- a1b6fc0: Introduced a new API handler for App router projects called `faustRouteHandler`. It can be used by creating a file `/app/api/faust/[route]/route.js` with the following contents:

  ```js
  // /app/api/faust/[route]/route.js
  import { faustRouteHandler } from '@faustwp/experimental-app-router';

  const { GET, POST } = faustRouteHandler;

  export { GET, POST };
  ```

- a1b6fc0: Created `getAuthClient` for making authenticated server side requests in the Next.js App Router. It can be used like:

  ```js
  import { getAuthClient } from '@faustwp/experimental-app-router';

  // app/my-account/posts/page.js
  export default async function Page() {
    const client = await getAuthClient();

    if (!client) {
      return <>You must be authenticated to view this page!</>;
    }

    const { data } = await client.query({
      query: gql`
        query GetMyPosts {
          viewer {
            posts {
              nodes {
                id
                title
              }
            }
          }
        }
      `,
    });

    return(
      <>
        <h2>My posts</h2>
         <ul>
          {data.viewer.posts.nodes.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </>
    )
  ```

  **Note:** Our login/logout utils are still in the works.

- Updated dependencies [a419252]
- Updated dependencies [cf887d3]
- Updated dependencies [795d956]
  - @faustwp/core@1.1.2

## 0.0.2

### Patch Changes

- 3267c87: Added the `getClient` export that can be used to fetch data from your WordPress site
- Updated dependencies [176bc82]
- Updated dependencies [3f5cee8]
- Updated dependencies [176bc82]
- Updated dependencies [3810bbb]
  - @faustwp/core@1.1.1
  - @faustwp/cli@1.1.1
