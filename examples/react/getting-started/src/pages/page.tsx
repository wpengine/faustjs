import { client, PageIdType } from 'client';
import { PageTemplate } from 'components';
import { useParams } from 'react-router';

type PageParams = {
  pageSlug: string;
};

export default function Page() {
  const { pageSlug } = useParams<PageParams>();
  const { useQuery, useIsLoading } = client;
  const isLoading = useIsLoading();
  const page = useQuery().page({
    id: pageSlug,
    idType: PageIdType.URI,
  });

  return <PageTemplate page={page} isLoading={isLoading} />;
}
