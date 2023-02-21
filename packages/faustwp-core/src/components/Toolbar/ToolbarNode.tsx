import React, { PropsWithChildren, useState } from 'react';
import className from 'classnames';

type Props = PropsWithChildren<{
  id?: string;
  additionalClassNames?: string;
}>;

/**
 * Prefixes a given string with `wp-admin-bar-`.
 * This is needed in order for the WordPress core icons (Dashicons) to display.
 */
export function wpAdminBar(id?: string): string {
  return id ? `wp-admin-bar-${id}` : '';
}

/**
 * The outermost element for a FaustToolbarNode.
 */
export function ToolbarNode({ id = '', children, additionalClassNames = '', ...props }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <li
      id={wpAdminBar(id)}
      className={className('menupop', { hover }, additionalClassNames)}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      {...props}>
      {children}
    </li>
  );
}
