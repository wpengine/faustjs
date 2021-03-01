import React from 'react';
import { headlessConfig } from '../../config';

export interface PaginationProps {
  pageInfo: WPGraphQL.WpPageInfo;
  baseURL: string;
  nextLabel?: string;
  nextAriaLabel?: string;
  previousLabel?: string;
  previousAriaLabel?: string;
  ariaLabel?: string;
  NextPage?: React.ComponentType<PageNavigationProps>;
  PreviousPage?: React.ComponentType<PageNavigationProps>;
}

export interface PageNavigationProps {
  baseUrl: string;
  cursor: string;
  ariaLabel: string;
  label: string;
}

export function NextPageNavigation({
  baseUrl,
  cursor,
  ariaLabel,
  label,
}: PageNavigationProps) {
  const { pagination } = headlessConfig();
  const href = `${baseUrl}/${pagination.after.replace('%cursor%', cursor)}`;
  return (
    <a href={href} aria-label={ariaLabel}>
      {label}
    </a>
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
    <a href={href} aria-label={ariaLabel}>
      {label}
    </a>
  );
}

/**
 * Pagination component to display a next and previous link on archives.
 *
 * @see https://github.com/wpengine/headless-framework/blob/canary/examples/getting-started/wp-templates/category.tsx.
 */
export function Pagination({
  nextLabel = 'Next Page →',
  nextAriaLabel = 'Next page.',
  previousLabel = '← Previous Page',
  previousAriaLabel = 'Previous page.',
  ariaLabel = 'Pagination',
  pageInfo,
  baseURL,
  NextPage,
  PreviousPage,
}: PaginationProps): JSX.Element | null {
  if (!pageInfo.hasNextPage && !pageInfo.hasPreviousPage) {
    return null;
  }

  let classes = 'pagination';
  if (pageInfo.hasNextPage) classes += ' has-next';
  if (pageInfo.hasPreviousPage) classes += ' has-previous';
  const Next = NextPage ?? NextPageNavigation;
  const Previous = PreviousPage ?? PreviousPageNavigation;

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <div className="wrap">
        <ul>
          {pageInfo.hasPreviousPage && (
            <li className="pagination-previous">
              <Previous
                baseUrl={baseURL}
                cursor={pageInfo?.startCursor ?? ''}
                ariaLabel={previousAriaLabel}
                label={previousLabel}
              />
            </li>
          )}
          {pageInfo.hasNextPage && (
            <li className="pagination-next">
              <Next
                baseUrl={baseURL}
                cursor={pageInfo?.endCursor ?? ''}
                ariaLabel={nextAriaLabel}
                label={nextLabel}
              />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
