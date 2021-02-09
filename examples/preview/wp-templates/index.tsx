import React from 'react';
import { gql, useGeneralSettings, usePosts } from '@wpengine/headless';
import { Footer, Header, Posts } from '../components';

export default function Index(): JSX.Element {
  const posts = usePosts({
    fragments: {
      listPostData: gql`
      fragment listPostData on Post {
        id
        title
        excerpt
        uri
      }
      `
    },
    variables: {
      first: 1,
    }
  });
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <Posts posts={posts?.nodes} />
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
