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
          label: 'Apollo',
          id: 'apollo',
        },
        {
          type: 'doc',
          label: 'Sitemaps',
          id: 'guides/sitemaps',
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
        {
          type: 'doc',
          label: 'WordPressBlocksViewer',
          id: 'reference/WordPressBlocksViewer',
        },
        {
          type: 'doc',
          label: 'WordPressBlocksProvider',
          id: 'reference/WordPressBlocksProvider',
        },
        {
          type: 'doc',
          label: 'getSitemapProps',
          id: 'reference/getSitemapProps',
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
      type: 'category',
      label: 'Faust Plugin System',
      items: [
        {
          type: 'doc',
          label: 'Creating a Plugin',
          id: 'plugin-system/creating-a-plugin',
        },
        {
          type: 'doc',
          label: 'Filters',
          id: 'plugin-system/filters',
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
      label: 'Gutenberg Support',
      items: [
        {
          type: 'doc',
          label: 'Getting Started',
          id: 'gutenberg/getting-started',
        },
        {
          type: 'doc',
          label: 'Using wp-graphql-content-blocks plugin',
          id: 'gutenberg/wp-graphql-content-blocks',
        },
        {
          type: 'doc',
          label: 'Plugin filters',
          id: 'gutenberg/filters',
        },
        {
          type: 'category',
          label: 'How to Create a Block',
          items: [
            {
              type: 'doc',
              label: 'Creating a Block from WordPress Core Blocks',
              id: 'gutenberg/tutorial/create-a-block-from-wordpress-core',
            },
            {
              type: 'doc',
              label: 'Creating a Block from a third party plugin',
              id: 'gutenberg/tutorial/create-a-block-from-third-party',
            },
          ],
        },
      ],
    },
    {
      type: 'doc',
      label: 'Migration from Legacy Faust',
      id: 'migrationPath/overview',
    },
    {
      type: 'doc',
      label: 'Deploy Your Faust.js App',
      id: 'going-to-production/deployment',
    },
    {
      type: 'doc',
      label: 'FAQ',
      id: 'faq',
    },
  ],
};
