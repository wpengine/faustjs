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
}

export default function Pagination(props: PaginationProps) {
  const router = useRouter();
  const basePath = router.asPath.split('/').slice(0, 3).join('/');

  let previousPageUrl = `${basePath}/before/${props.pageInfo?.startCursor}`;
  let nextPageUrl = `${basePath}/after/${props.pageInfo?.endCursor}`;

  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="wrap">
        <ul>
          {props.pageInfo.hasPreviousPage && (
            <li className="pagination-previous">
              <PreviousPageNavigation href={previousPageUrl} />
            </li>
          )}

          {props.pageInfo.hasNextPage && (
            <li className="pagination-next">
              <NextPageNavigation href={nextPageUrl} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
