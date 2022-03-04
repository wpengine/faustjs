import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function MetaTags() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteConfig.url ?? ''} />
      <meta property="og:title" content={siteConfig.title ?? ''} />
      <meta property="og:site_name" content={siteConfig.title ?? ''} />
      <meta
        property="og:description"
        content={siteConfig.customFields.description ?? ''}
      />
      <meta property="og:image" content="/docs/img/logo-with-background.jpg" />
      <meta property="twitter:image:alt" content="WP Engine Developers Logo" />
    </>
  );
}
