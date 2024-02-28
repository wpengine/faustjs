# @faustwp/experimental-app-router

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
