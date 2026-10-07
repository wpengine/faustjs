import { gql } from '@apollo/client';
import { useFaustQuery } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import {
	Header,
	Footer,
	Main,
	Container,
	ContentWrapper,
	EntryHeader,
	FeaturedImage,
	SEO,
} from '../components';
import { GET_LAYOUT_QUERY } from '../fragments/LayoutQuery';

const GET_PAGE_QUERY = gql`
	${FeaturedImage.fragments.entry}
	query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			...FeaturedImageFragment
		}
	}
`;

export default function Component(props) {
	// Loading state for previews
	if (props?.loading) {
		return <>Loading...</>;
	}

	const { generalSettings, headerMenuItems, footerMenuItems } =
		useFaustQuery(GET_LAYOUT_QUERY) ?? {};
	const { page } = useFaustQuery(GET_PAGE_QUERY) ?? {};

	const { title: siteTitle, description: siteDescription } =
		generalSettings ?? {};
	const primaryMenu = headerMenuItems?.nodes ?? [];
	const footerMenu = footerMenuItems?.nodes ?? [];
	const { title, content, featuredImage } = page ?? { title: '' };

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
					<EntryHeader title={title} image={featuredImage?.node} />
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
		query: GET_PAGE_QUERY,
		variables: ({ databaseId }, ctx) => ({
			databaseId,
			asPreview: ctx?.asPreview,
		}),
	},
];
