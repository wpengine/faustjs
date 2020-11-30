import React from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './styles.module.css'
import { getMenuLocation } from './utils'

console.log(styles)

const menuList = (items) =>
  items.map((item, key) => {
    return (
      <li key={key}>
        <a href={item.url}>{item.title}</a>
        {Array.isArray(item.children) && item.children.length > 0 && (
          <ul className='submenu'>{menuList(item.children)}</ul>
        )}
      </li>
    )
  })

/**
 * GraphQL query to fetch all menu items from WPGraphQL.
 * Exported so that Next.js pages can prefetch menu data in `getStaticProps()`.
 *
 * @see https://www.wpgraphql.com/docs/menus/.
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation.
 */
export const WP_MENU_QUERY = gql`
  {
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
  }
`

/**
 * WPMenu component to display menu items added in the WordPress admin area.
 *
 * @param {string} location Menu area to display items from. Default: PRIMARY.
 * @returns {JSX.Element} WPMenu component.
 */
export const WPMenu = ({ location = 'PRIMARY' }) => {
  const menuClasses = 'menu ' + location.toLowerCase() + ' ' + styles.menu
  const { loading, error, data } = useQuery(WP_MENU_QUERY)
  if (loading) return <p className={menuClasses}>Loading menu...</p>
  if (error) return <p className={menuClasses}>Could not load menu</p>

  const menuData = data.menuItems.nodes || []
  const menuItems = getMenuLocation(location, menuData)

  return (
    menuItems.length > 0 && (
      <nav className={menuClasses} aria-label='Main'>
        <div className='wrap'>
          <ul>{menuList(menuItems)}</ul>
        </div>
      </nav>
    )
  )
}
