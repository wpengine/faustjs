import Link from 'next/link';
import { useRouter } from 'next/router';

interface NextPageNavigationProps {
  href: string;
}

function NextPageNavigation(props: NextPageNavigationProps) {
  return (
    <Link href={props.href}>
      <a aria-label={'Next page.'}>Next Page →</a>
    </Link>
  );
}

interface PreviousPageNavigationProps {
  href: string;
}

function PreviousPageNavigation(props: PreviousPageNavigationProps) {
  return (
    <Link href={props.href}>
      <a aria-label={'Previous page.'}>← Previous Page</a>
    </Link>
  );
}

interface PaginationProps {
  pageInfo: any;
  basePath: string;
}

export default function Pagination({ pageInfo, basePath }: PaginationProps) {
  let previousPageUrl = `${basePath}/before/${pageInfo?.startCursor}`;
  let nextPageUrl = `${basePath}/after/${pageInfo?.endCursor}`;

  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="wrap">
        <ul>
          {pageInfo.hasPreviousPage && (
            <li className="pagination-previous">
              <PreviousPageNavigation href={previousPageUrl} />
            </li>
          )}

          {pageInfo.hasNextPage && (
            <li className="pagination-next">
              <NextPageNavigation href={nextPageUrl} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
