import React from 'react';

// HeadingProps constrains headings to levels h1-h6.
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// Heading allows components to pass a heading level via props.
function Heading({
  level = 'h1',
  children,
  className,
}: HeadingProps): JSX.Element {
  const H = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(level, props, children);

  return <H className={className}>{children}</H>;
}

export default Heading;
export type { HeadingProps };
