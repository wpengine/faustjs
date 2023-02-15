import { gql, useQuery } from '@apollo/client';
import { getApolloAuthClient, useAuth } from '@faustwp/core';

function AuthenticatedView() {
  const client = getApolloAuthClient();
  const { user, logout } = useAuth();

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
        }
      }
    `,
    { client },
  );

  console.log(data);

  return (
    <>
      <p>Welcome {user?.name}!</p>

      <p>My posts</p>

      <ul>
        {data?.viewer?.posts?.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </>
  );
}

export default function Page(props) {
  const useAuthConfig = {
    strategy: 'redirect',
  };

  const {
    isAuthenticated,
    isReady: loading,
    redirectUrl: loginUri,
  } = useAuth(useAuthConfig);

  if (!loading) {
    return <>Loading...</>;
  }

  if (isAuthenticated === true) {
    return <AuthenticatedView />;
  }

  return (
    <>
      <p>Welcome anonymous!</p>
      <a href={loginUri}>Login</a>
    </>
  );
}
