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
    title: "AYON Docs",
    tagline:
        "Documentation for the most robust open-source pipeline for studios and remote teams",
    url: "https://docs.ynput.io", // Your website URL
    baseUrl: "/",
    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "ynput", // Usually your GitHub org/user name.
    projectName: "ayon-documentation", // Usually your repo name.
    stylesheets: [
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    ],

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
                        "https://github.com/ynput/ayon-documentation/tree/main/website",
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
                        spec: "https://playground.ayon.app/openapi.json",
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
                    // {
                    //     type: "custom-logo",
                    //     position: "left",
                    //     logo: "/img/yn_symbol_BG_sa.svg",
                    //     logoInverted: "/img/yn_symbol_W_sa.svg",
                    //     to: "https://ynput.io/ayon/",
                    //     title: "Ynput",
                    // },
                    {
                        type: "custom-logo",
                        position: "left",
                        logo: "/img/AYON_docs_black.svg",
                        logoInverted: "/img/AYON_docs_white.svg",
                        to: "/",
                        logoStyle: {
                            height: "2.5rem",
                            top: -2,
                        },
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
                        label: "Dev resources",
                        position: "left",
                        items: [
                            {
                                label: "REST API Docs",
                                to: "/api",
                            },
                            {
                                label: "GraphQL API Explorer",
                                href: "https://playground.ayon.app/explorer",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "Python API Docs",
                                href: "https://ynput.github.io/ayon-python-api/",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "C++ API Docs",
                                href: "https://ynput.github.io/ayon-cpp-api/",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "USD Resolver Docs",
                                href: "https://ynput.github.io/ayon-usd-resolver/",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "Frontend React Components",
                                href: "https://components.ayon.dev/?path=/docs/button--docs",
                                target: "_blank",
                                rel: null,
                            },
                        ],
                        className: "navbar__link--community",
                    },
                    {
                        label: "Addons",
                        position: "right",
                        items: [
                            {
                                label: "Web Publisher",
                                href: "https://ynput.io/ayon/addons/web-publisher/",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "Node Graph",
                                href: "https://ynput.io/ayon/addons/node-graph",
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
            colorMode: {
                defaultMode: "dark",
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
            algolia: {
                // The application ID provided by Algolia
                appId: "RLOQGA5MLU",

                // Public API key: it is safe to commit it
                apiKey: "98e725168db71b204e80f843f3e277e0",

                indexName: "ayon-ynput",
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
        "docusaurus-plugin-sass",
    ],
    scripts: [
        {
            src: "https://plausible.io/js/script.js",
            defer: true,
            "data-domain": "docs.ayon.dev",
        },
    ],
};

module.exports = config;
