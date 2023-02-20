import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import flatListToHierarchical from '../utilities/flatListToHierarchical';
import {WordPressBlocksViewer} from '@faustwp/blocks';

import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';
import blocks from '../wp-blocks';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, contentBlocks, featuredImage, date, author } = props.data.post;
  const blocks = flatListToHierarchical(contentBlocks);

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
            <WordPressBlocksViewer contentBlocks={blocks} />
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
  ${FeaturedImage.fragments.entry}
  ${blocks.CoreCode.fragments.entry}
  ${blocks.CoreCode.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
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
      contentBlocks {
        name
        __typename
        renderedHtml
        id: nodeId
        parentId
        ...${blocks.CoreCode.fragments.key}
        ...${blocks.UbCallToActionBlock.fragments.key}
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

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};
