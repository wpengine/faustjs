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
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems.nodes ?? [];

  return (
    <>
      <Header menuItems={primaryMenu} />
      <Main>
        <>
          <EntryHeader title={title} image={featuredImage} />
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer menuItems={footerMenu} />
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
  const postsPerPage = 3;
  return { first: postsPerPage, headerLocation: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};


export default { Component, variables, query };
