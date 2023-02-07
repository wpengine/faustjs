import React, { useState } from 'react';

export function ToolbarItem(props: {
  id: string;
  url?: string;
  children: React.ReactNode | undefined;
}) {
  const [hover, setHover] = useState(false);
  const { id, children } = props;

  return (
    <li
      key={id}
      id={id}
      className={`${hover ? 'hover' : ''} menupop`}
      onMouseEnter={() => {setHover(true)}}
      onMouseLeave={() => {setHover(false)}}
    >
      {children}
    </li>
  );
}
