/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docsSidebar: [
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'getting-started',
    },
    {
      type: 'doc',
      label: 'Example Project Walkthrough',
      id: 'next/guides/project-walkthrough',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'doc',
          label: 'Previews',
          id: 'next/guides/post-page-previews',
        },
        {
          type: 'doc',
          label: 'Authentication',
          id: 'authentication',
        },
        {
          type: 'doc',
          label: 'Sitemaps',
          id: 'sitemaps',
        },
        {
          type: 'doc',
          label: 'Apollo',
          id: 'apollo',
        },
        {
          type: 'doc',
          label: 'Portfolio Migration',
          id: 'migrationPath/portfolio-migration',
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'doc',
          label: 'Templates Overview',
          id: 'templates',
        },
        {
          type: 'doc',
          label: 'Seed Query',
          id: 'faustwp/seed-query',
        },
        {
          type: 'doc',
          label: 'API Router',
          id: 'next/reference/api-router',
        },
        {
          type: 'doc',
          label: 'getNextServerSideProps',
          id: 'next/reference/getNextServerSideProps',
        },
        {
          type: 'doc',
          label: 'getNextStaticProps',
          id: 'next/reference/getNextStaticProps',
        },
      ],
    },
    {
      type: 'category',
      label: 'Companion WordPress Plugin',
      items: [
        {
          type: 'doc',
          label: 'Settings Reference',
          id: 'faustwp/settings',
        },
      ],
    },
    {
      type: 'doc',
      label: 'Telemetry',
      id: 'telemetry',
    },
    {
      type: 'doc',
      label: 'Migration from old Faust',
      id: 'migrationPath/overview',
    },
    {
      type: 'doc',
      label: 'FAQ',
      id: 'faq',
    },
  ],
};
