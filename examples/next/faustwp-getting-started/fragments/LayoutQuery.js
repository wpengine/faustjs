import { gql } from '@apollo/client';
import { BlogInfoFragment } from './GeneralSettings';
import { NavigationMenu } from '../components';

export const GET_LAYOUT_QUERY = gql`
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
