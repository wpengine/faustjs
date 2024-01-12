import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../components';
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
      <Main>
        <Container>
          <Hero title={'Custom Toolbar Example'} />
          <div className="text-center">
            <p>
              Welcome {data?.viewer?.name}! Look up! ^ Say hello to the
              customized toolbar.
            </p>
            <p>
              As long as you are authenticated you will see the toolbar. To
              customize me further, go to <code>plugins/CustomPlugin.tsx</code>.
              To log out and go back to the unauthenticated page, click on the{' '}
              <code>Log Out</code> button.
            </p>
            <code>wp-templates/front-page.js</code>
          </div>
          <div className="text-center">
            <button onClick={() => logout()}>Log Out</button>
          </div>
        </Container>
      </Main>
    </>
  );
}

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });
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

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={'Custom Toolbar Example'} />
          <div className="text-center">
            <p>
              This page is utilizing the "front-page" WordPress template. To
              authenticate and view the custom toolbar, click on the{' '}
              <code>Login</code> button.
            </p>
            <code>wp-templates/front-page.js</code>
          </div>
          <div className="text-center">
            <button onClick={loginHandler}>Login</button>
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
