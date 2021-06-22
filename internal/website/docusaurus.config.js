const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Headless Framework',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Headless Framework',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/introduction',
            },
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Usage with Next.js',
              to: '/next/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wpengine/headless-framework',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/wpedecode',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCh1WuL54XFb9ZI6m6goFv1g',
            },
          ],
        },
        {
          title: 'WP Engine',
          items: [
            {
              label: "We're Hiring!",
              to: 'https://wpengine.careers/',
            },
            {
              label: 'Headless WordPress Hosting',
              href: 'https://wpengine.com/atlas',
            },
          ],
        },
      ],
      copyright: `&copy; ${new Date().getFullYear()} WPEngine, Inc. All rights reserved.`,
    },
    prism: {
      theme: darkCodeTheme,
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
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
