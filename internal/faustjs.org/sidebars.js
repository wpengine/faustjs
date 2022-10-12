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
      type: 'category',
      label: 'Tutorial for PHP Developers',
      items: [
        {
          type: 'doc',
          label: 'Development Environment Setup',
          id: 'tutorial/dev-env-setup',
        },
        {
          type: 'doc',
          label: 'Introduction to Next.js',
          id: 'tutorial/nextjs-intro',
        },
        {
          type: 'doc',
          label: 'Create A Basic Headless WordPress Site',
          id: 'tutorial/basic-headless-site',
        },
        {
          type: 'doc',
          label: 'Create Your First React Component',
          id: 'tutorial/first-react-component',
        },
        {
          type: 'doc',
          label: 'Setup Faust.js',
          id: 'tutorial/setup-faustjs',
        },
        {
          type: 'doc',
          label: 'Querying Data From Your Headless WordPress Site',
          id: 'tutorial/querying-data',
        },
      ],
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
