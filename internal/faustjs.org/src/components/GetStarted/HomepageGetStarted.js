import React from 'react';
import clsx from 'clsx';
import styles from './HomepageGetStarted.module.css';
import Link from '@docusaurus/Link';

export default function HomepageGetStarted() {
  return (
    <section className={styles.getStarted}>
      <div className="container padding-vert-lg">
        <div className={clsx('row', styles.getStartedRow)}>
          <h2>Learn Faust.js</h2>
        </div>
        <div className={clsx('row', styles.getStartedRow)}>
          <p>
            Get up and running with Faust.js quickly by downloading our example
          </p>
        </div>
        <div className={clsx('row', styles.getStartedRow)}>
          <p>
            <video
              src="/docs/video/next/getting-started-next-example.mp4"
              muted
              autoPlay
              playsInline
              controls
              loop
            />
          </p>
        </div>
        <div className={clsx('row', styles.getStartedRow)}>
          <Link
            className="button button--info button--lg"
            to="/docs/next/getting-started">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
