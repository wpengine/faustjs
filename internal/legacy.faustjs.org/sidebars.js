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
      label: 'Core Package',
      items: [
        {
          type: 'category',
          label: 'Reference',
          items: [
            {
              type: 'doc',
              label: 'config',
              id: 'core/reference/config',
            },
          ],
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
              label: 'Permalinks',
              id: 'next/guides/permalinks',
            },
            {
              type: 'doc',
              label: 'Authentication',
              id: 'next/guides/authentication',
            },
            {
              type: 'doc',
              label: 'Logging Queries',
              id: 'next/guides/logging-queries',
            },
            {
              type: 'doc',
              label: 'Modifying the GraphQL Request',
              id: 'next/guides/modifying-graphql-request',
            },
            {
              type: 'doc',
              label: 'Testing with Jest',
              id: 'next/guides/testing-with-jest',
            },
            {
              type: 'doc',
              label: 'Sitemaps',
              id: 'next/guides/sitemaps',
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
              type: 'category',
              label: 'Hooks',
              items: [
                {
                  type: 'doc',
                  label: 'Hooks Intro',
                  id: 'next/reference/hooks/hooks',
                },
                {
                  type: 'doc',
                  label: 'usePost Hook',
                  id: 'next/reference/hooks/usePost',
                },
                {
                  type: 'doc',
                  label: 'usePosts Hook',
                  id: 'next/reference/hooks/usePosts',
                },
                {
                  type: 'doc',
                  label: 'usePage Hook',
                  id: 'next/reference/hooks/usePage',
                },
                {
                  type: 'doc',
                  label: 'usePreview Hook',
                  id: 'next/reference/hooks/usePreview',
                },
                {
                  type: 'doc',
                  label: 'usePreviewNode Hook',
                  id: 'next/reference/hooks/usePreviewNode',
                },
                {
                  type: 'doc',
                  label: 'useAuth Hook',
                  id: 'next/reference/hooks/useAuth',
                },
                {
                  type: 'doc',
                  label: 'useLogin Hook',
                  id: 'next/reference/hooks/useLogin',
                },
                {
                  type: 'doc',
                  label: 'useLogout Hook',
                  id: 'next/reference/hooks/useLogout',
                },
                {
                  type: 'doc',
                  label: 'GQty Hooks',
                  id: 'next/reference/hooks/gqty-hooks',
                },
              ],
            },
            {
              type: 'doc',
              label: 'API Router',
              id: 'next/reference/api-router',
            },
            {
              type: 'doc',
              label: 'is404',
              id: 'next/reference/is404',
            },
            {
              type: 'doc',
              label: 'getClient',
              id: 'next/reference/getClient',
            },
            {
              type: 'doc',
              label: 'withFaust',
              id: 'next/reference/with-faust',
            },
            {
              type: 'doc',
              label: 'FaustProvider',
              id: 'next/reference/faust-provider',
            },
            {
              type: 'doc',
              label: 'handleSitemapRequests',
              id: 'next/reference/handle-sitemap-requests',
            },
            {
              type: 'doc',
              label: 'URL Params',
              id: 'next/reference/expected-url-params',
            },
            {
              type: 'doc',
              label: 'config',
              id: 'next/reference/config',
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
          type: 'doc',
          label: 'Support Channels',
          id: 'support-channels',
        },
      ],
    },
    {
      type: 'doc',
      label: 'Introduction to GQty',
      id: 'gqty-intro',
    },
    {
      type: 'category',
      label: 'Going to Production',
      items: [
        {
          type: 'doc',
          label: 'Deploy Your Faust.js App',
          id: 'going-to-production/deployment',
        },
        {
          type: 'doc',
          label: 'Optimizations',
          id: 'going-to-production/optimizations',
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
  ],
};
