import React from "react";
import { MenuItem } from "./MenuItemInterface";

interface Props {
    items: MenuItem[];
    anchor?(
        item: MenuItem,
        attributes?: React.AnchorHTMLAttributes<HTMLAnchorElement>
    ): React.ReactNode;
}

const defaultAnchor = (
    item: MenuItem,
    attributes: React.AnchorHTMLAttributes<HTMLAnchorElement>
) => (
    <a href={item.href} {...attributes}>
        {item.title}
    </a>
);

/**
 * MenuList component to recursively build menu items and submenus.
 */
const MenuList = ({ items, anchor = defaultAnchor }: Props) =>
    items.map( item => {
        return (
            <li key={item.title}>
                {anchor(item)}
                {item?.children?.length > 0 && (
                    <ul className="submenu">{MenuList({ items: item.children, anchor })}</ul>
                )}
            </li>
        );
    });

export default MenuList;
