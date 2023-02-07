import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren<any> {
  id: string;
  children: React.ReactNode | undefined;
  secondary?: boolean;
}

export function ToolbarSubmenu({ id, secondary = false, children }: Props) {
  return (
    <ul
      className={`ab-submenu ${secondary ? 'ab-sub-secondary' : ''}`}
      id={id}
    >
      {children}
    </ul>
  );
}
