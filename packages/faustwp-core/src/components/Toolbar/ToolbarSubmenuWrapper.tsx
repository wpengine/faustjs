import React from 'react';

export function ToolbarSubmenuWrapper(props: {
  children: React.ReactNode | undefined;
}) {
  const { children } = props;

  return <div className="ab-sub-wrapper">{children}</div>;
}
