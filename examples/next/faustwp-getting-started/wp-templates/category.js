import { gql } from '@apollo/client';
import { useFaustQuery } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import {
	Header,
	Footer,
	Main,
	Container,
	EntryHeader,
	Post,
	FeaturedImage,
	SEO,
} from '../components';
import { GET_LAYOUT_QUERY } from '../fragments/LayoutQuery';

const GET_CATEGORY_QUERY = gql`
	${FeaturedImage.fragments.entry}
	query GetCategory($uri: String!) {
		nodeByUri(uri: $uri) {
			... on Category {
				name
				posts {
					edges {
						node {
							id
							title
							content
							date
							uri
							...FeaturedImageFragment
							author {
								node {
									name
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default function Component(props) {
	const { generalSettings, headerMenuItems, footerMenuItems } =
		useFaustQuery(GET_LAYOUT_QUERY) ?? {};
	const { nodeByUri } = useFaustQuery(GET_CATEGORY_QUERY) ?? {};

	const { title: siteTitle, description: siteDescription } =
		generalSettings ?? {};
	const primaryMenu = headerMenuItems?.nodes ?? [];
	const footerMenu = footerMenuItems?.nodes ?? [];
	const { name, posts } = nodeByUri ?? {};

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} />
			<Header
				title={siteTitle}
				description={siteDescription}
				menuItems={primaryMenu}
			/>
			<Main>
				<>
					<EntryHeader title={`Category: ${name}`} />
					<Container>
						{posts?.edges?.map((post) => (
							<Post
								title={post.node.title}
								content={post.node.content}
								date={post.node.date}
								author={post.node.author?.node.name}
								uri={post.node.uri}
								featuredImage={post.node.featuredImage?.node}
							/>
						))}
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
		query: GET_CATEGORY_QUERY,
		variables: ({ uri }, ctx) => ({
			uri,
		}),
	},
];
