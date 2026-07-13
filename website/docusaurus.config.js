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
    url: "https://ynput.github.io", // Your website URL
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
                                href: "https://docs.ayon.dev/ayon-python-api",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "C++ API Docs",
                                href: "https://docs.ayon.dev/ayon-cpp-api",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "USD Resolver Docs",
                                href: "https://docs.ayon.dev/ayon-usd-resolver",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "Frontend React Components",
                                href: "https://components.ayon.dev/?path=/docs/button--docs",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "-------- AYON Server --------",
                                href: "#",
                                rel: null,
                            },
                            {
                                label: "AYON Frontend Deep Wiki",
                                href: "https://deepwiki.com/ynput/ayon-frontend",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Backend Deep Wiki",
                                href: "https://deepwiki.com/ynput/ayon-backend",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "-------- Addons API references --------",
                                href: "#",
                                rel: null,
                            },
                            {
                                label: "AYON Core API Reference",
                                href: "https://docs.ayon.dev/ayon-core",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Launcher API Reference",
                                href: "https://docs.ayon.dev/ayon-launcher",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON 3DEqualizer API Reference",
                                href: "https://docs.ayon.dev/ayon-equalizer",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON 3Ds Max API Reference",
                                href: "https://docs.ayon.dev/ayon-3dsmax",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON After Effects API Reference",
                                href: "https://docs.ayon.dev/ayon-aftereffects",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Applications API Reference",
                                href: "https://docs.ayon.dev/ayon-applications",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Blender API Reference",
                                href: "https://docs.ayon.dev/ayon-blender",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON CelAction API Reference",
                                href: "https://docs.ayon.dev/ayon-celaction",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Cinema 4D API Reference",
                                href: "https://docs.ayon.dev/ayon-cinema4d",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Clockify API Reference",
                                href: "https://docs.ayon.dev/ayon-clockify",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Deadline API Reference",
                                href: "https://docs.ayon.dev/ayon-deadline",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON DJV API Reference",
                                href: "https://docs.ayon.dev/ayon-djv",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Flame API Reference",
                                href: "https://docs.ayon.dev/ayon-flame",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON ftrack API Reference",
                                href: "https://docs.ayon.dev/ayon-ftrack",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Fusion API Reference",
                                href: "https://docs.ayon.dev/ayon-fusion",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Harmony API Reference",
                                href: "https://docs.ayon.dev/ayon-harmony",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Hiero/Nuke Studio API Reference",
                                href: "https://docs.ayon.dev/ayon-hiero",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Houdini API Reference",
                                href: "https://docs.ayon.dev/ayon-houdini",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Kitsu API Reference",
                                href: "https://docs.ayon.dev/ayon-kitsu",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Maya API Reference",
                                href: "https://docs.ayon.dev/ayon-maya",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Marvelous Designer API Reference",
                                href: "https://docs.ayon.dev/ayon-marvelous-designer",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Mocha Pro API Reference",
                                href: "https://docs.ayon.dev/ayon-mocha",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Motionbuilder API Reference",
                                href: "https://docs.ayon.dev/ayon-motionbuilder",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Nuke API Reference",
                                href: "https://docs.ayon.dev/ayon-nuke",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON OCIO API Reference",
                                href: "https://docs.ayon.dev/ayon-ocio",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON OpenRV API Reference",
                                href: "https://docs.ayon.dev/ayon-openrv",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON OpenUSD API Reference",
                                href: "https://docs.ayon.dev/ayon-usd",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Photoshop API Reference",
                                href: "https://docs.ayon.dev/ayon-photoshop",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Premiere API Reference",
                                href: "https://docs.ayon.dev/ayon-premiere",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Resolve API Reference",
                                href: "https://docs.ayon.dev/ayon-resolve",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Royal Render API Reference",
                                href: "https://docs.ayon.dev/ayon-royalrender",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Flow (Shotgrid) API Reference",
                                href: "https://docs.ayon.dev/ayon-shotgrid",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Silhouette API Reference",
                                href: "https://docs.ayon.dev/ayon-silhouette",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Site Sync API Reference",
                                href: "https://docs.ayon.dev/ayon-sitesync",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Slack API Reference",
                                href: "https://docs.ayon.dev/ayon-slack",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON SpeedTree API Reference",
                                href: "https://docs.ayon.dev/ayon-speedtree",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Substance Designer API Reference",
                                href: "https://docs.ayon.dev/ayon-substance-designer",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Substance Painter API Reference",
                                href: "https://docs.ayon.dev/ayon-substance-painter",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON SyncSketch API Reference",
                                href: "https://docs.ayon.dev/ayon-syncsketch",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Timers Manager API Reference",
                                href: "https://docs.ayon.dev/ayon-timers-manager",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Third Party API Reference",
                                href: "https://docs.ayon.dev/ayon-third-party",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Tray Publisher API Reference",
                                href: "https://docs.ayon.dev/ayon-traypublisher",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON TVPaint API Reference",
                                href: "https://docs.ayon.dev/ayon-tvpaint",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON UI QT API Reference",
                                href: "https://docs.ayon.dev/ayon-ui-qt",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Unreal Engine API Reference",
                                href: "https://docs.ayon.dev/ayon-unreal",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Wrap API Reference",
                                href: "https://docs.ayon.dev/ayon-wrap",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON xSTUDIO API Reference",
                                href: "https://docs.ayon.dev/ayon-xstudio",
                                target: "_blank",
                                rel: null,
                            },
                            {
                                label: "AYON Zbrush API Reference",
                                href: "https://docs.ayon.dev/ayon-zbrush",
                                target: "_blank",
                                rel: null,
                            },
                        ],
                        className: "navbar__link--community",
                    },
                    {
                        label: "User Docs",
                        href: "https://help.ayon.app/",
                        target: "_blank",
                        rel: null,
                        position: "left",
                    },
                    {
                        label: "Admin Docs",
                        href: "https://help.ayon.app/",
                        target: "_blank",
                        rel: null,
                        position: "left",
                    },
                    {
                        label: "REST API Docs",
                        position: "right",
                        to: "/api",
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
