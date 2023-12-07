import { gql } from '@apollo/client';
import { useFaustQuery } from '@faustwp/core';
import {
  Container,
  ContentWrapper,
  EntryHeader,
  FeaturedImage,
  Footer,
  Header,
  Main,
  NavigationMenu,
  SEO,
} from '../components';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';

const GET_LAYOUT_QUERY = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetLayout(
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

const GET_POST_QUERY = gql`
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      ...FeaturedImageFragment
    }
  }
`;

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { post } = useFaustQuery(GET_POST_QUERY);
  const { generalSettings, headerMenuItems, footerMenuItems } =
    useFaustQuery(GET_LAYOUT_QUERY);

  const { title: siteTitle, description: siteDescription } = generalSettings;
  const primaryMenu = headerMenuItems?.nodes ?? [];
  const footerMenu = footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage, date, author } = post ?? {};

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader
            title={title}
            image={featuredImage?.node}
            date={date}
            author={author?.node?.name}
          />
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.queries = [
  {
    query: GET_LAYOUT_QUERY,
    variables: (seedNode, ctx) => ({
      headerLocation: MENUS.PRIMARY_LOCATION,
      footerLocation: MENUS.FOOTER_LOCATION,
    }),
  },
  {
    query: GET_POST_QUERY,
    variables: ({ databaseId }, ctx) => ({
      databaseId,
      asPreview: ctx?.asPreview,
    }),
  },
];
