import {useQuery, gql} from '@apollo/client';
import styles from './menu.module.css'
import {getMenuLocation} from '../lib/menu';

const menuList = (items) => items.map((item, key) => {
    return (
        <li key={key}>
            <a href={item.url}>{item.title}</a>
            {Array.isArray(item.children) && item.children.length > 0 && (
                <ul className="submenu">
                    {menuList(item.children)}
                </ul>
            )}
        </li>
    );
})

export const MENU_QUERY = gql`{
    menuItems {
        nodes {
            key: id
            parentId
            title: label
            url
            locations
            order
        }
    }
}`;

const Menu = ({location = "PRIMARY"}) => {
    const {loading, error, data} = useQuery(MENU_QUERY);
    if (loading) return <p className={styles.menu}>Loading menu...</p>;
    if (error) return <p className={styles.menu}>Could not load menu</p>;

    const menuData = data?.menuItems?.nodes || [];
    const menuItems = getMenuLocation(location, menuData);

    return (
        <nav className={styles.menu} aria-label="Main">
            <div className="wrap">
                <ul>
                    {menuList(menuItems)}
                </ul>
            </div>
        </nav>
    )
};

export default Menu;
