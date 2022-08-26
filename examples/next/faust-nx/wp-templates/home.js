import { gql } from '@apollo/client';
import * as MENUS from 'constants/menus';
import {
  Header,
  Footer,
  Main,
  Container,
  ContentWrapper,
  EntryHeader,
  NavigationMenu
} from 'components';

const Component = (props) => {
  const { title: siteTitle, description: siteDescription } = props?.data?.generalSettings;
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={title} image={featuredImage} />
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
};

const query = gql`
  ${NavigationMenu.fragments.entry}
  query GetPageData($headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    generalSettings {
      title
      description
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

const variables = () => {
  return { headerLocation: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};

export default { Component, variables, query };
