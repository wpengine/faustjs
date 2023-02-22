import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<Record<string, never>>;

export function ToolbarSubmenuWrapper({ children, ...props }: Props) {
  return (
    <div className="ab-sub-wrapper" {...props}>
      {children}
    </div>
  );
}
