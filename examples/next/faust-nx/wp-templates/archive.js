import { gql } from "@apollo/client";
import * as MENUS from 'constants/menus';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu
} from "components";

function Component(props) {
  const { title: siteTitle, description: siteDescription } = props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { name } = props.data.nodeByUri;

  return (
    <>
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={`Category: ${name}`} />
          <Container>
            <>...</>
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

const query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetArchivePage($uri: String!, $headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
      }
    }
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

const variables = ({ uri }) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

export default { Component, variables, query };
