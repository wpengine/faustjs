import { useGeneralSettings } from '@wpengine/headless-react';
import {
  getNextStaticPaths,
  getNextStaticProps,
  usePost,
} from '@wpengine/headless-next';
import { CTA, Footer, Header } from 'components';
import { GetStaticPropsContext } from 'next';

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

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {});
}

export function getStaticPaths() {
  return getNextStaticPaths();
}
