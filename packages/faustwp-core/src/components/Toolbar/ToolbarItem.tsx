import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  href?: string;
  tabIndex?: number;
}> & { [key: string]: unknown };

export function ToolbarItem({ href, children, ...props }: Props) {
  return (
    <a role="menuitem" tabIndex={0} className="ab-item" href={href} {...props}>
      {children}
    </a>
  );
}
