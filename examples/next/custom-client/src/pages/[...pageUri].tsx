import { getNextStaticProps, client, is404 } from '@wpengine/headless-next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import type { Page as PageType } from '@wpengine/headless-core';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
  preview?: boolean;
}

export function PageComponent({ page, preview }: PageProps) {
  const { usePage, useGeneralSettings, useQuery } = client();
  const generalSettings = useGeneralSettings();
  const { isLoading } = useQuery().$state;

  if (preview && (typeof window === 'undefined' || isLoading)) {
    return (
      <>
        <Header
          title={generalSettings.title}
          description={generalSettings.description}
        />

        <Hero title="Loading..." />

        <main className="content content-single">
          <div className="wrap">
            <div>Loading...</div>
          </div>
        </main>

        <Footer copyrightHolder={generalSettings.title} />
      </>
    );
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
      </Head>

      <Hero
        title={page?.title()}
        bgImage={page?.featuredImage?.node.sourceUrl()}
      />

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePage, useGeneralSettings } = client();
  const page = usePage();

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (await is404(context)) {
    return {
      notFound: true,
    };
  }

  return getNextStaticProps(context, {
    Page,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
