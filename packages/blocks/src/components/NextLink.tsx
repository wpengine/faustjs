import { gql } from '@apollo/client';
import React from 'react';
import Link from 'next/link.js';
import { useBlocksTheme } from './WordPressBlocksProvider.js';
import { getStyles } from '../utils/index.js';

type NextLinkProps = {
  linkTarget?: string;
  linkDestination?: string;
  linkClass?: string;
  href: string;
};

export function NextLink(props: React.PropsWithChildren<NextLinkProps>) {
  const { linkDestination, linkClass, href, linkTarget, children } = props;
  const target = linkTarget ? '_blank' : undefined;

  // TODO: Determine what linkDestination property represents and if it is needed here.
  return (
    <Link href={href} target={target} className={linkClass}>
      {children}
    </Link>
  );
}
