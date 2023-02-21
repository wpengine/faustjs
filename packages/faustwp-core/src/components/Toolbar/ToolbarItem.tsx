import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  href?: string;
  tabIndex?: number;
  handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>;

export function ToolbarItem({ children, handleClick, ...props }: Props) {
  return (
    <a className="ab-item" onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
