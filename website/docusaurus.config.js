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
    title: "AYON",
    tagline:
        "The most robust open-source pipeline for studios and remote teams",
    url: process.env.DEPLOY_PRIME_URL || "http://localhost:3000", // Your website URL
    baseUrl: process.env.DEPLOY_BASE_URL || "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "ynput", // Usually your GitHub org/user name.
    projectName: "ayon-documentation", // Usually your repo name.

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/ynput/OpenPype/tree/develop/website",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
        [
            "redocusaurus",
            {
                // Plugin Options for loading OpenAPI files
                specs: [
                    {
                        spec: "https://ayon.cloud/openapi.json",
                        route: "/api",
                    },
                ],
                // Theme Options for modifying how redoc renders them
                theme: {
                    // Change with your site colors
                    primaryColor: "#00d6a1",
                },
            },
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                items: [
                    {
                        type: "custom-logo",
                        position: "left",
                        logo: "/img/yn_symbol_BG_sa.svg",
                        logoInverted: "/img/yn_symbol_W_sa.svg",
                        to: "https://ynput.io/ayon/",
                        title: "Ynput",
                    },
                    {
                        type: "custom-logo",
                        position: "left",
                        logo: "/img/Y_black.svg",
                        logoInverted: "/img/Y_white.svg",
                        to: "/",
                        title: "AYON",
                    },
                    {
                        to: "/features",
                        label: "Features",
                        position: "left",
                    },
                    {
                        to: "docs/artist_getting_started",
                        label: "User Docs",
                        position: "left",
                    },
                    {
                        to: "docs/system_introduction",
                        label: "Admin Docs",
                        position: "left",
                    },
                    {
                        to: "docs/dev_introduction",
                        label: "Dev Docs",
                        position: "left",
                    },
                    {
                        to: "/api",
                        label: "REST API Docs",
                        position: "right",
                    },
                    {
                        label: "Community",
                        position: "right",
                        items: [
                            {
                                label: "GitHub",
                                href: "https://github.com/ynput/OpenPype",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "Discord",
                                href: "https://discord.gg/ynput",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "LinkedIn",
                                href: "https://www.linkedin.com/company/ynput",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "Twitter",
                                href: "https://twitter.com/ynput_io",
                                target: "_blank",
                                rel: null,
                            },
                        ],
                        className: "navbar__link--community",
                    },
                    {
                        type: "search",
                        position: "right",
                    },
                ],
            },
        }),

    plugins: [
        [
            "ideal-image",
            /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
            ({
                quality: 70,
                max: 1030,
                min: 640,
                steps: 2,
                // Use false to debug, but it incurs huge perf costs
                disableInDev: true,
            }),
        ],
    ],
};

module.exports = config;
