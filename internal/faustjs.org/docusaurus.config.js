const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Faust.js',
  tagline: 'The Headless WordPress Framework',
  customFields: {
    description:
      'Faust is a JavaScript framework designed to make the development of headless WordPress sites as easy as possible for WordPress and JavaScript developers. The mission of Faust is to reduce the complexity of building headless WordPress frontends for the web, allowing the developer to build production sites with the ease of a monolithic WordPress site.',
  },
  url: 'https://faustjs.org',
  baseUrl: '/',
  onBrokenLinks: 'warn', // @TODO Change this to 'throw' when we go to prod.
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wpengine', // Usually your GitHub org/user name.
  projectName: 'faustjs', // Usually your repo name.
  noIndex: process.env.SITE_NO_INDEX ?? false,
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
          docId: 'getting-started',
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
          items: [],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Example Project',
              to: '/docs/next/guides/project-walkthrough',
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
              href: 'https://twitter.com/wpengine',
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
