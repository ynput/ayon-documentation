/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AYON',
  tagline: 'The most robust open-source pipeline for studios and remote teams',
  url: 'https://ayon.ynput.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ynput', // Usually your GitHub org/user name.
  projectName: 'ayon-documentation', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/ynput/OpenPype/tree/develop/website',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'AYON',
        logo: {
          alt: 'AYON Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/features',
            label: 'Features',
            position: 'left',
          },
          {
            to: 'docs/artist_getting_started',
            label: 'User Docs',
            position: 'left',
          },
          {
            to: 'docs/system_introduction',
            label: 'Admin Docs',
            position: 'left',
          },
          {
            to: 'docs/dev_introduction',
            label: 'Dev Docs',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/ynput',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ynput/OpenPype',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/ynput',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/ynput_io',
              },
            ],
          },
          // {
          //   title: 'Legal',
          //   // Please do not remove the privacy and terms, it's a legal requirement.
          //   items: [
          //     {
          //       label: 'Privacy',
          //       href: 'https://opensource.fb.com/legal/privacy/',
          //     },
          //     {
          //       label: 'Terms',
          //       href: 'https://opensource.fb.com/legal/terms/',
          //     },
          //     {
          //       label: 'Data Policy',
          //       href: 'https://opensource.fb.com/legal/data-policy/',
          //     },
          //     {
          //       label: 'Cookie Policy',
          //       href: 'https://opensource.fb.com/legal/cookie-policy/',
          //     },
          //   ],
          // },
        ],
        // Please do not remove the credits, help to publicize Docusaurus :)
        copyright: `Copyright © ${new Date().getFullYear()} Orbi Tools`,
      },
    }),
};

module.exports = config;
