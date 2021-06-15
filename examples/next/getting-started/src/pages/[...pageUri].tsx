import { getNextStaticProps, client } from '@wpengine/headless-next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

export default function Page() {
  const { usePage, useGeneralSettings, useQuery } = client();
  const generalSettings = useGeneralSettings();
  const page = usePage();

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {page.title()} - {generalSettings.title}
        </title>
      </Head>

      <Hero title={page.title()} bgImage={page.featuredImageId} />

      <main className="content content-single">
        <div className="wrap">
          {page && (
            <div dangerouslySetInnerHTML={{ __html: page.content() ?? '' }} />
          )}
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context);
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
