import { useGeneralSettings } from '@wpengine/headless-react';
import { usePost } from '@wpengine/headless-next';
import { Footer, Header, CTA } from 'components';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

export default function Page() {
  const settings = useGeneralSettings();
  const post = usePost();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />

      <main className="content content-single">
        <div className="wrap">
          {post && (
            <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
          )}
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

      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
