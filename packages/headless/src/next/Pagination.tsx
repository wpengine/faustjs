import React from 'react';
import Link from 'next/link';
import { headlessConfig } from '../config';
import {
  Pagination as ReactPagination,
  PageNavigationProps,
  PaginationProps,
} from '../react';

export function NextPageNavigation({
  baseUrl,
  cursor,
  ariaLabel,
  label,
}: PageNavigationProps) {
  const { pagination } = headlessConfig();
  const href = `${baseUrl}/${pagination.after.replace('%cursor%', cursor)}`;
  return (
    <Link href={href}>
      <a href={href} aria-label={ariaLabel}>
        {label}
      </a>
    </Link>
  );
}

export function PreviousPageNavigation({
  baseUrl,
  cursor,
  ariaLabel,
  label,
}: PageNavigationProps) {
  const { pagination } = headlessConfig();
  const href = `${baseUrl}/${pagination.before.replace('%cursor%', cursor)}`;
  return (
    <Link href={href}>
      <a href={href} aria-label={ariaLabel}>
        {label}
      </a>
    </Link>
  );
}

/* eslint-disable react/destructuring-assignment,react/jsx-props-no-spreading */
/**
 * Pagination component to display a next and previous link on archives.
 *
 * @see https://github.com/wpengine/headless-framework/blob/canary/examples/getting-started/wp-templates/category.tsx.
 */
export function Pagination(props: PaginationProps): JSX.Element | null {
  const Next = props?.NextPage ?? NextPageNavigation;
  const Previous = props?.PreviousPage ?? PreviousPageNavigation;

  return <ReactPagination {...props} NextPage={Next} PreviousPage={Previous} />;
}
/* eslint-enable react/destructuring-assignment,react/jsx-props-no-spreading */
