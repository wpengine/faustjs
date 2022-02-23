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
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.tagline}</h1>
        <p className="hero__subtitle">{siteConfig.customFields.description}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--info button--lg"
            to="/docs/next/getting-started"
          >
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
          content="default-src 'self' http://kuergg39mb-dsn.algolia.net data: 'unsafe-inline' 'unsafe-eval'"
        />
      </Head>
      <Layout
        title={siteConfig.tagline}
        description={siteConfig.customFields.description}
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <HomepageGetStarted />
        </main>
      </Layout>
    </>
  );
}
