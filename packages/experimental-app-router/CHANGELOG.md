# @faustwp/experimental-app-router

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
