import { gql, useQuery } from '@apollo/client';
import { useLogin } from '@faustwp/core';
import { getApolloAuthClient, useAuth } from '@faustwp/core';
import { useLogout } from '@faustwp/core/dist/mjs';

function AuthenticatedView() {
  const client = getApolloAuthClient();
  const { logout } = useLogout();

  const { data } = useQuery(
    gql`
      {
        viewer {
          posts {
            nodes {
              id
              title
            }
          }
          name
        }
      }
    `,
    { client },
  );

  return (
    <>
      <p>Welcome {data?.viewer?.name}!</p>

      <p>My posts</p>

      <ul>
        {data?.viewer?.posts?.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={() => logout()}>Logout</button>
    </>
  );
}

export default function Page(props) {
  const { isAuthenticated, isReady, loginUrl } = useAuth({
    shouldRedirect: false,
  });
  const { login } = useLogin();

  if (!isReady) {
    return <>Loading...</>;
  }

  if (isAuthenticated === true) {
    return <AuthenticatedView />;
  }

  return (
    <>
      <p>Welcome anonymous!</p>
      <a href={loginUrl}>Login</a>
    </>
  );
}
