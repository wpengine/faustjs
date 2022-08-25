import { gql } from '@apollo/client';
import * as MENUS from 'constants/menus';
import {
  Header,
  Footer,
  Main,
  Container,
  ContentWrapper,
  EntryHeader
} from "components";

const Component = (props: any) => {
  const { title, content } = props.data.page;

  return (
    <>
      <Header />
      <Main>
        <>
          <EntryHeader title={title} />
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer />
    </>
  );
};

const query = gql`
  ${GeneralSettingsFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  query GetPageData($first: Int, $headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    posts(first: $first) {
      nodes {
        ...PostFragment
      }
    }
    generalSettings {
      ...GeneralSettingsFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

const variables = ({ uri }) => {
  return { first: postsPerPage, headerLocation: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};


export default { Component, variables, query };
