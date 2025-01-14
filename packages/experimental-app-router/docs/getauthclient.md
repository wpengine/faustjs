# `getAuthClient`

`getAuthClient` is a function that returns the `ApolloClient` making it available for use. It is used for making authenticated server side requests in the Next.js App Router to the WordPress backend and is part of the `@faustwp/experimental-app-router` package.

## Usage

Here is an example layout that imports `getAuthClient` and uses `query` to query WPGraphQL:

```js
import { getAuthClient } from "@faustwp/experimental-app-router";

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

  return (
    <>
      <h2>My posts</h2>
      <ul>
        {data.viewer.posts.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
```

## Technical Reference

`getAuthClient(): ApolloClient | null`

The `getAuthClient` function returns the `ApolloClient`, making it available for use.

You can use the `ApolloClient` to perform authenticated queries for data using the `query` function.

The function will return `null` when it fails to retrieve the access token for making authenticated requests. If this happens, you want to check that your user becomes authenticated using the `onLogin` server action.
