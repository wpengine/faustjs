---
'@faustjs/core': patch
---

Created `getAuthClient` for making authenticated server side requests in the Next.js App Router. It can be used like:

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
