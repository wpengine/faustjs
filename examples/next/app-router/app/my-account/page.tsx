import { PleaseLogin } from '@/components/please-login';
import { gql } from '@apollo/client';
import { getAuthClient, onLogout } from '@faustwp/experimental-app-router';

export default async function Page() {
  const client = await getAuthClient();

  if (!client) {
    return <PleaseLogin />;
  }

  const { data } = await client.query({
    query: gql`
      query GetViewer {
        viewer {
          name
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
      <h2>Welcome {data.viewer.name}</h2>

      <h3>My Posts</h3>
      <ul>
        {data.viewer.posts.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <form action={onLogout}>
        <button type="submit">Logout</button>
      </form>
    </>
  );
}
