import React from 'react';

export function Heading({ level = 'h1', children, className }) {
  const Tag = ({ ...props }) => React.createElement(level, props, children);

  return <Tag className={className}>{children}</Tag>;
}
