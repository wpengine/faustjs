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
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'doc',
          label: 'API Router',
          id: 'next/reference/api-router',
        },
      ],
    },
    {
      type: 'category',
      label: 'Usage with Next.js',
      items: [
        {
          type: 'doc',
          label: 'Previews',
          id: 'next/guides/post-page-previews',
        },
        {
          type: 'doc',
          label: 'Example Project Walkthrough',
          id: 'next/guides/project-walkthrough',
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
      type: 'category',
      label: 'Seed Query',
      items: [
        {
          type: 'doc',
          label: 'Seed Query',
          id: 'faustwp/seed-query',
        },
      ],
    },
    {
      type: 'category',
      label: 'Usage with Next.js',
      items: [
        {
          type: 'category',
          label: 'Reference',
          items: [
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
      ],
    },
    {
      type: 'category',
      label: 'Migration Path from Faust.js < v1.0.0',
      items: [
        {
          type: 'doc',
          label: 'Overview',
          id: 'migrationPath/overview',
        },
      ],
    },
  ],
};
