import { getNextStaticProps } from 'faust-nx';
import client from '../client';
import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero
} from '../components';

export default function Page() {
  const { data } = useQuery(Page.query, {
    variables: Page.variables()
  });

  const { title: siteTitle, description: siteDescription } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={'Home'} />
          <div className='text-center'>
            <p>This is a Next.js file-system based page located at <code>./pages/index.js</code></p>
          </div>
        </Container>
      </Main>
      <Footer
        title={siteTitle}
        menuItems={footerMenu}
      />
    </>
  );
};

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData($headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
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

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    client,
    Page
  });
}
