import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  href?: string;
  tabIndex?: number;
  handleClick?: () => Promise<void>;
}> & { [key: string]: unknown };

export function ToolbarItem({ href, handleClick, children, ...props }: Props) {
  return (
    <a
      role="menuitem"
      tabIndex={0}
      className="ab-item"
      onClick={handleClick}
      onKeyDown={handleClick}
      href={href}
      {...props}>
      {children}
    </a>
  );
}
