const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'AXL.js',
  tagline: 'The Headless WordPress Framework',
  customFields: {
    description:
      'AXL.js is the Headless WordPress Framework. AXL.js provides a set of tools to make building front-end applications with WordPress as the headless CMS a pleasant experience for both developers and publishers. This framework consists of a WordPress plugin, a set of npm packages, and guides to get you started building headless WordPress sites React/Next.js/etc.',
  },
  url: 'https://faustjs.org', // rename with axl domain
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wpengine', // Usually your GitHub org/user name.
  projectName: 'faustjs', // Usually your repo name. Rename with axl repo when cloned
  themeConfig: {
    algolia: {
      // If Algolia did not provide you any appId, use 'BH4D9OD16A'
      appId: 'KUERGG39MB',

      // Public API key: it is safe to commit it
      apiKey: '1f3b1850f5442cf1d15033644ff5b1d3',

      indexName: 'faustjs',
    },
    navbar: {
      title: 'AXL.js™',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          type: 'doc',
          docId: 'next/getting-started',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/wpengine/faustjs?ref=faustjs', // rename with new axl repo
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://wordpress.org/plugins/faustwp', // rename with new axl plugin endpoint
          label: 'WordPress Plugin',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Changelogs',
          items: [
            {
              label: '@axl/core',
              to: '/docs/changelog/core',
            },
            {
              label: '@axl/next',
              to: '/docs/changelog/next',
            },
            {
              label: '@axl/react',
              to: '/docs/changelog/react',
            },
            {
              label: 'FaustWP', // rename
              to: '/docs/changelog/faustwp',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial/dev-env-setup',
            },
            {
              label: 'Getting Started',
              to: '/docs/next/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wpengine/faustjs?ref=faustjs', // rename with new axl repo
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/wpedecode?ref=axl',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCh1WuL54XFb9ZI6m6goFv1g?ref=faustjs', // rename with new axl youtube ref?
            },
          ],
        },
        {
          title: 'WP Engine',
          items: [
            {
              label: 'Developers',
              to: 'https://developers.wpengine.com/?ref=axl',
            },
            {
              label: "We're Hiring!",
              to: 'https://wpengine.careers/?ref=axl',
            },
            {
              label: 'Headless WordPress Hosting',
              href: 'https://wpengine.com/atlas?ref=axl',
            },
          ],
        },
      ],
      copyright: `&copy; 2013-${new Date().getFullYear()} WPEngine, Inc. All rights reserved.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/wpengine/faustjs/edit/site-dev/internal/website/', // rename with new axl repo
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
