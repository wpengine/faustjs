const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Faust.js',
  tagline: 'The Headless WordPress Framework',
  customFields: {
    description:
      'Faust.js is the Headless WordPress Framework. Faust.js provides a set of tools to make building front-end applications with WordPress as the headless CMS a pleasant experience for both developers and publishers. This framework consists of a WordPress plugin, a set of npm packages, and guides to get you started building headless WordPress sites React/Next.js/etc.',
  },
  url: 'https://legacy.faustjs.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wpengine', // Usually your GitHub org/user name.
  projectName: 'faustjs', // Usually your repo name.
  noIndex: process.env.SITE_NO_INDEX ?? false,
  themeConfig: {
    algolia: {
      // If Algolia did not provide you any appId, use 'BH4D9OD16A'
      appId: 'AP95JBPOT2',

      // Public API key: it is safe to commit it
      apiKey: 'c2ed2e53b4389758921aa98e9fd738cd',

      indexName: 'legacy-faustjs',
    },
    announcementBar: {
      id: 'depreciation_notice',
      content:
        '⭐️ This version of Faust.js (GQty) has been deprecated. Security updates will continue to be provided through 2024, but no new feature development will occur. Visit the new Faust.js with Apollo at <a target="_blank" rel="noopener noreferrer" href="https://faustjs.org/">faustjs.org</a> ⭐️',
      backgroundColor: '#7e5cef',
      textColor: '#FFF',
      isCloseable: false,
    },
    navbar: {
      title: 'Faust.js™',
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
          to: 'blog',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/wpengine/faustjs?ref=faustjs',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://wordpress.org/plugins/faustwp',
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
              label: '@faustjs/core',
              to: '/docs/changelog/core',
            },
            {
              label: '@faustjs/next',
              to: '/docs/changelog/next',
            },
            {
              label: '@faustjs/react',
              to: '/docs/changelog/react',
            },
            {
              label: 'FaustWP',
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
            {
              label: 'Privacy Policy',
              to: '/docs/privacy-policy',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wpengine/faustjs?ref=faustjs',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/wpengine?ref=faustjs',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCh1WuL54XFb9ZI6m6goFv1g?ref=faustjs',
            },
          ],
        },
        {
          title: 'WP Engine',
          items: [
            {
              label: 'Developers',
              to: 'https://developers.wpengine.com/?ref=faustjs',
            },
            {
              label: "We're Hiring!",
              to: 'https://wpengine.careers/?ref=faustjs',
            },
            {
              label: 'Headless WordPress Hosting',
              href: 'https://wpengine.com/atlas?ref=faustjs',
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
            'https://github.com/wpengine/faustjs/edit/canary/internal/legacy.faustjs.org/',
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
