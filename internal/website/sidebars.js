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
      label: 'Tutorial',
      items: [
        {
          type: 'doc',
          label: 'Development Environment Setup',
          id: 'tutorial/dev-env-setup',
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
      label: 'Usage with Next.js',
      items: [
        {
          type: 'doc',
          label: 'Getting Started',
          id: 'next/getting-started',
        },
        {
          type: 'category',
          label: 'Guides',
          items: [
            {
              type: 'doc',
              label: 'Fetching Data',
              id: 'next/guides/fetching-data',
            },
            {
              type: 'doc',
              label: 'SSG & SSR',
              id: 'next/guides/ssr-ssg',
            },
            {
              type: 'doc',
              label: 'Custom Post Types',
              id: 'next/guides/custom-post-types',
            },
            {
              type: 'doc',
              label: 'Previews',
              id: 'next/guides/post-page-previews',
            },
            {
              type: 'doc',
              label: '404s',
              id: 'next/guides/handle-404s',
            },
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          items: [
            {
              type: 'doc',
              label: 'Custom Hooks',
              id: 'next/reference/custom-hooks',
            },
            {
              type: 'doc',
              label: 'URL Params',
              id: 'next/reference/expected-url-params',
            },
          ],
        },
      ],
    },
    {
      type: 'doc',
      label: 'Release Notes',
      id: 'release-notes',
    },
  ],
};
