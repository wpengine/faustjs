import React from 'react';

export function ToolbarLink(props: {
  url: string;
  children: React.ReactNode | string;
}) {
  const { url, children } = props;

  return (
    <a className="ab-item" href={url}>
      {children}
    </a>
  );
}
