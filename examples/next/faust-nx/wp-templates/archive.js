import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu
} from '../components';

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } = props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { name, __typename: archiveType } = props.data.nodeByUri;

  console.log({props});

  return (
    <>
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={`${archiveType}: ${name}`} />
          <Container>
            <>...</>
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
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

Component.variables = ({ uri }) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};
