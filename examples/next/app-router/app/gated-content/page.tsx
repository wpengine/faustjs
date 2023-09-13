import { gql } from '@apollo/client';
import { getAuthClient } from '@faustwp/experimental-app-router';

export default async function Page() {
  const client = await getAuthClient();

  if (!client) {
    return <>You must be authenticated</>;
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

      <ul>
        {data.viewer.posts.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
