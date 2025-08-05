import { gql, useQuery } from "@apollo/client";
import style from "../styles/front-page.module.css";
import { getApolloAuthClient, useAuth } from '@faustwp/core';
import { useLogout } from '@faustwp/core';
import { useRouter } from 'next/router';

function AuthenticatedView() {
  const client = getApolloAuthClient();
  const { logout } = useLogout();

  const { data, loading } = useQuery(
    gql`
      {
        viewer {
          name
        }
      }
    `,
    { client },
  );

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="container">
        <h2 style={{color: "#7e5cef"}}>Custom Toolbar Example</h2>
        <div className="text-center">
          <p>
            Welcome {data?.viewer?.name}! Look up! ^ Say hello to the
            customized toolbar.
          </p>

          <p>
            As long as you are authenticated you will see the toolbar. To
            customize me further, go to <code>plugins/CustomPlugin.js</code>.
            To log out and go back to the unauthenticated page, click on the{' '}
            <code>Log Out</code> button.
          </p>
          <code>wp-templates/front-page.js</code>
        </div>
        <div className="text-center">
          <button style={{cursor: "pointer", padding: "10px 20px", color: "white", backgroundColor: "#7e5cef", border: "none", marginTop: "20px"}} onClick={() => logout()}>Log Out</button>
        </div>
      </div>
    </>
  );
}

export default function Component(props) {
  const router = useRouter();

  const { isAuthenticated, isReady, loginUrl } = useAuth({
    strategy: 'redirect',
    shouldRedirect: false,
  });

  if (!isReady) {
    return <>Loading...</>;
  }

  if (isAuthenticated === true) {
    return <AuthenticatedView />;
  }

  const loginHandler = (e) => {
    e.preventDefault();
    router.push(loginUrl);
  };

  return (
    <>
      <div className="container">
        <h2 style={{color: "#7e5cef"}}>Custom Toolbar Example</h2>
        <div className="text-center">
          <p>
            This page is utilizing the "front-page" WordPress template. To
            authenticate and view the custom toolbar, click on the{' '}
            <code>Log In</code> button.
          </p>
          <code>wp-templates/front-page.js</code>
        </div>
        <div className="text-center">
          <button style={{cursor: "pointer", padding: "10px 20px", color: "white", backgroundColor: "#7e5cef", border: "none", marginTop: "20px"}} onClick={loginHandler}>Log In</button>
        </div>
      </div>
    </>
  );
}
