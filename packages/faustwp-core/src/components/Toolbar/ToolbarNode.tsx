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
export function ToolbarNode({
  id = '',
  children,
  additionalClassNames = '',
  ...props
}: Props) {
  const [hover, setHover] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setHover(!hover); // Toggle hover state when "Enter" is pressed
    } else if (e.key === 'Escape') {
      setHover(false); // Close the dropdown
    }
  };

  return (
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
    <li
      id={wpAdminBar(id)}
      className={className('menupop', { hover }, additionalClassNames)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={handleKeyDown}
      {...props}>
      {children}
    </li>
  );
}
