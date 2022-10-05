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
  url: 'https://faustjs.org',
  baseUrl: '/',
  onBrokenLinks: 'warn', // @TODO Change this to 'throw' when we go to prod.
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wpengine', // Usually your GitHub org/user name.
  projectName: 'faustjs', // Usually your repo name.
  themeConfig: {
    algolia: {
      // If Algolia did not provide you any appId, use 'BH4D9OD16A'
      appId: 'KUERGG39MB',

      // Public API key: it is safe to commit it
      apiKey: '1f3b1850f5442cf1d15033644ff5b1d3',

      indexName: 'faustjs',
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
          items: [],
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
              href: 'https://github.com/wpengine/faustjs?ref=faustjs',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/wpedecode?ref=faustjs',
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
            'https://github.com/wpengine/faustjs/edit/site-dev/internal/faustjs.org/',
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
