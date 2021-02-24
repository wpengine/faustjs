import React from 'react';
import Link from 'next/link';

interface Props {
  pageInfo: WPGraphQL.WpPageInfo;
  baseURL: string;
  nextLabel?: string;
  nextAriaLabel?: string;
  previousLabel?: string;
  previousAriaLabel?: string;
  ariaLabel?: string;
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
}: Props): JSX.Element | null {
  if (!pageInfo.hasNextPage && !pageInfo.hasPreviousPage) {
    return null;
  }

  let classes = 'pagination';
  if (pageInfo.hasNextPage) classes += ' has-next';
  if (pageInfo.hasPreviousPage) classes += ' has-previous';

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <div className="wrap">
        <ul>
          {pageInfo.hasPreviousPage && (
            <li className="pagination-previous">
              <Link href={`${baseURL}/before/${pageInfo?.startCursor || ''}`}>
                <a aria-label={previousAriaLabel}>{previousLabel}</a>
              </Link>
            </li>
          )}
          {pageInfo.hasNextPage && (
            <li className="pagination-next">
              <Link href={`${baseURL}/after/${pageInfo?.endCursor || ''}`}>
                <a aria-label={nextAriaLabel}>{nextLabel}</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
