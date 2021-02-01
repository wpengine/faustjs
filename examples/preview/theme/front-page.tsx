import React from 'react';
import { usePosts, useGeneralSettings } from '@wpengine/headless';
import { CTA, Header, Footer, Hero, Posts } from '../components';
import styles from '../sass/theme/front-page.module.scss';

export default function FrontPage() {
  const posts = usePosts();
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content">
        <Hero
          title="Get Started with Headless"
          buttonText="Developer Docs"
          buttonURL="https://developers.wpengine.com/"
          button2Text="Headless on GitHub"
          button2URL="https://github.com/wpengine/headless-framework"
          bgImage="/images/headless_hero_background.jpg"
          id={styles.home_hero}>
          <p>
            WP&nbsp;Engine’s Headless WordPress Framework includes this starter
            theme, the{' '}
            <a href="https://github.com/wpengine/headless-framework#plugin-features">
              headless WordPress plugin
            </a>
            ,{' '}
            <a href="https://www.npmjs.com/package/@wpengine/headless">
              headless package
            </a>
            , and <a href="https://developers.wpengine.com/">tutorials</a> to
            make building headless WordPress sites fast and fun.
          </p>
        </Hero>
        <section className={styles.explore}>
          <div className="wrap">
            <h2>Explore the Starter Theme</h2>
            <p>
              This headless starter theme uses{' '}
              <a href="https://nextjs.org/">Next.js</a>,{' '}
              <a href="https://graphql.org/">GraphQL</a>,{' '}
              <a href="https://www.apollographql.com/">Apollo</a> and the{' '}
              <a href="https://www.npmjs.com/package/@wpengine/headless">
                WP&nbsp;Engine headless package
              </a>{' '}
              for WordPress integration. Dive in and edit this template at{' '}
              <code>theme/front-page.tsx</code> or discover more below.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Page Templates</h3>
                <p>
                  Find templates in the the <code>theme/</code> folder. These
                  use the same convention as the{' '}
                  <a href="https://developer.wordpress.org/themes/basics/template-hierarchy/">
                    WordPress template hierarchy
                  </a>
                  , where <code>single.tsx</code> displays posts and{' '}
                  <code>page.tsx</code> displays pages. Find page-specific CSS
                  at <code>sass/theme</code>, which is scoped to the page with{' '}
                  <a href="https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css">
                    CSS modules
                  </a>
                  .
                </p>
              </div>

              <div className={styles.feature}>
                <h3>Global Styles and Fonts</h3>
                <p>
                  Add styles to load on every page, such as typography and
                  layout rules, in <code>sass/main.scss</code>. The theme adds{' '}
                  <a href="https://necolas.github.io/normalize.css/">
                    normalize.css
                  </a>{' '}
                  in <code>pages/_app.tsx</code>. Fonts live in{' '}
                  <code>public/fonts</code> and are defined in{' '}
                  <code>sass/_font-face.scss</code>.
                </p>
              </div>

              <div className={styles.feature}>
                <h3>Components</h3>
                <p>
                  Add or edit components in the <code>components/</code> folder.
                  Find component styles at <code>sass/components</code>, which
                  use{' '}
                  <a href="https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css">
                    CSS modules
                  </a>{' '}
                  to scope CSS to each component.
                </p>
              </div>

              <div className={styles.feature}>
                <h3>Hooks</h3>
                <p>
                  Fetch data from WordPress with <code>usePost</code>,{' '}
                  <code>usePosts</code>, <code>useGeneralSettings</code> and
                  other custom hooks. Use these hooks in your page templates to
                  pass data to custom components. See{' '}
                  <code>theme/front-page.tsx</code> for examples.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Posts
          posts={posts}
          heading="Latest Posts"
          intro="The Posts component in theme/front-page.tsx shows the latest six posts from the connected WordPress site."
          headingLevel={2}
          postTitleLevel={3}
          count={6}
          id={styles.post_list}
        />
        <CTA
          title="Questions or comments?"
          buttonText="Join the discussion on GitHub"
          buttonURL="https://github.com/wpengine/headless-framework/discussions"
          headingLevel={2}>
          <p>
            We welcome feature requests, bug reports and questions in the{' '}
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
