import { client } from '@wpengine/headless-next';
import { Footer, Header, CTA } from 'components';
import { useRouter } from 'next/router';

export default function Page() {
  const { usePost, useGeneralSettings, useQuery } = client();
  const generalSettings = useGeneralSettings();
  const post = usePost();
  const { $state } = useQuery();

  if ($state.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: post.content() ?? '' }} />
        </div>

        <CTA
          title="Start your headless journey today"
          buttonText="Get Started"
          buttonURL="https://github.com/wpengine/headless-framework/"
          headingLevel="h2">
          <p>
            Learn more in the{' '}
            <a href="https://github.com/wpengine/headless-framework">
              Headless Framework GitHub repository
            </a>
            .
          </p>
        </CTA>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}
