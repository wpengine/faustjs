import { gql } from "@apollo/client";
import * as MENUS from 'constants/menus';
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  ContentWrapper
} from "components";

const Component = (props) => {
  const { title, content } = props.data.post;
  const { title: siteTitle, description: siteDescription } = props?.data?.generalSettings;
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
          <EntryHeader title={title} />
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
  query GetPost($uri: ID!, $headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    post(id: $uri, idType: URI) {
      title
      content
    }
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

const variables = ({ uri }) => {
  return { uri, headerLocation: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};

export default { Component, variables, query };
