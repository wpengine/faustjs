import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Next.js',
    description: (
      <>
        Built on top of Next.js and React to take advantage of state-of-the-art frontend tools
      </>
    ),
    link: '/next/getting-started',
  },
  {
    title: 'GraphQL',
    description: (
      <>
        Use GQless to fetch data from the WordPress GraphQL API without writing GraphQL queries.
      </>
    ),
    link: '/next/guides/fetching-data',
  },
  {
    title: 'Previews',
    description: (
      <>
        Preview your posts and pages before publishing and rewrite WordPress preview URLs to your frontend.
      </>
    ),
    link: '/next/guides/post-page-previews',
  },
  {
    title: 'SSG and SSR',
    description: (
      <>
        Easily render pages on the server, or generate static pages at build-time.
      </>
    ),
    link: '/next/guides/ssr-ssg',
  },
  {
    title: 'React Hooks',
    description: (
      <>
        Fetch posts, categories, pages, and more using standard URL params.
      </>
    ),
    link: '/next/guides/ssr-ssg',
  },
  {
    title: 'Custom Post Types',
    description: (
      <>
        Add custom post types to your WordPress site and easily fetch them from your frontend.
      </>
    ),
    link: '/next/guides/ssr-ssg',
  },
];

function Feature({ title, description, link }) {
  return (
    <Link to={link} className={clsx('card shadow--tl', styles.featuresCard)}>
      <div className="card__header">
        <h3>{title}</h3>
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
      <div className="card__footer">
        <Link to={link} className="text--info">
          Documentation 🠖
        </Link>
      </div>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx('row', styles.featuresRow)}>
          <h2>Why Faust.js?</h2>
        </div>
        <div className={clsx('row', styles.featuresRow)}>
          <p>
            Faust.js is the <b>first choice</b> for companies that build
            Headless WordPress sites
          </p>
        </div>
        <div className={clsx('row', styles.featuresRow)}>
          {FeatureList.map((props, idx) => (
            <div className={clsx('col col--4 margin-top--lg')}>
              <Feature key={idx} {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
