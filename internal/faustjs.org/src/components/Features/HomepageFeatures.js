import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Apollo',
    description: (
      <>
        Flexibly perform declarative queries to manipulate and structure data using Apollo.
      </>
    ),
    link: '/blog/the-future-of-faust#where-faustjs-is-going',
  },
  {
    title: 'Previews',
    description: (
      <>
        Preview your posts and pages before publishing and rewrite WordPress
        preview URLs to your frontend.
      </>
    ),
    link: '/docs/next/guides/post-page-previews',
  },
  {
    title: 'WP Template Hierarchy',
    description: (
      <>Use chained requests, resolve custom post type templates, and more.</>
    ),
    link: '/docs/templates',
  },
  {
    title: 'Plugin System',
    description: (
      <>Use plugins to add quick and flexible functionality to your product.</>
    ),
    link: '',
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
        <p className={clsx('text--info', styles.featuresLink)}>
          Documentation →
        </p>
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
            <div key={idx} className={clsx('col col--4 margin-top--lg')}>
              <Feature {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
