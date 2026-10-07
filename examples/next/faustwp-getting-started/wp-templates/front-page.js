import { gql } from '@apollo/client';
import { useFaustQuery } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { Header, Footer, Main, Container, Hero, SEO } from '../components';
import { GET_LAYOUT_QUERY } from '../fragments/LayoutQuery';

export default function Component() {
	const { generalSettings, headerMenuItems, footerMenuItems } =
		useFaustQuery(GET_LAYOUT_QUERY) ?? {};

	const { title: siteTitle, description: siteDescription } =
		generalSettings ?? {};
	const primaryMenu = headerMenuItems?.nodes ?? [];
	const footerMenu = footerMenuItems?.nodes ?? [];

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} />
			<Header
				title={siteTitle}
				description={siteDescription}
				menuItems={primaryMenu}
			/>
			<Main>
				<Container>
					<Hero title={'Front Page'} />
					<div className="text-center">
						<p>This page is utilizing the "front-page" WordPress template.</p>
						<code>wp-templates/front-page.js</code>
					</div>
				</Container>
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
];
