import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/Features/HomepageFeatures';
import HomepageGetStarted from '../components/GetStarted/HomepageGetStarted';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">The Headless WordPress Framework</h1>
        <p className="hero__subtitle">
          Faust.js focuses on delivering the best developer experience and
          features you need when building Headless WordPress websites with
          support for: static site generation, server-side rendering,
          TypeScript, data-fetching, post and page previews, and more.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--info button--lg"
            to="/docs/next/getting-started">
            Get Started
          </Link>
        </div>
        <div className={styles.license}>
          License: MIT{' '}
          <Link to="https://github.com/wpengine/faustjs">GitHub</Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' data: 'unsafe-inline' 'unsafe-eval'"
        />
      </Head>
      <Layout
        title={siteConfig.tagline}
        description={siteConfig.customFields.description}>
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <HomepageGetStarted />
        </main>
      </Layout>
    </>
  );
}
