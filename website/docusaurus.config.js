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
    title: "AYONpedia",
    tagline:
        "A reference for AYON, the production management and pipeline platform for creative studios",
    url: "https://docs.ayon.dev", // Your website URL
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
                    customCss: [
                        require.resolve("@fontsource-variable/inter/index.css"),
                        require.resolve("@fontsource-variable/jost/index.css"),
                        require.resolve("./src/css/ayon-theme.css"),
                        require.resolve("./src/css/custom.css"),
                    ],
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
                    primaryColor: "#8fceff",
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
                    // The groups are the navbar items (placeholder set: not final).
                    {
                        type: "docSidebar",
                        sidebarId: "Ayon",
                        label: "AYON",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "Backend",
                        label: "Backend",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "Pipeline",
                        label: "Pipeline",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "Server",
                        label: "Server",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "Hosting",
                        label: "Hosting",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "YnputCloud",
                        label: "Ynput Cloud",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "Addons",
                        label: "Addons",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "Developer",
                        label: "Developer",
                        position: "left",
                    },
                    {
                        // Interactive REST API reference (redocusaurus, route /api)
                        to: "/api",
                        label: "REST API",
                        position: "left",
                    },
                    {
                        type: "search",
                        position: "right",
                    },
                ],
            },
            // Diagrams use the AYON theme colors (the docs are dark only).
            mermaid: {
                theme: { light: "base", dark: "base" },
                options: {
                    themeVariables: {
                        darkMode: true,
                        background: "#1c2026",
                        // System stack: Mermaid measures text before webfonts load,
                        // so a webfont would give boxes that clip their labels.
                        fontFamily: '-apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                        primaryColor: "#353b46",
                        primaryTextColor: "#f4f5f5",
                        primaryBorderColor: "#8fceff",
                        secondaryColor: "#272d35",
                        secondaryTextColor: "#f4f5f5",
                        secondaryBorderColor: "#41474d",
                        tertiaryColor: "#272d35",
                        tertiaryTextColor: "#f4f5f5",
                        tertiaryBorderColor: "#41474d",
                        lineColor: "#8b9198",
                        textColor: "#f4f5f5",
                        mainBkg: "#353b46",
                        nodeBorder: "#8fceff",
                        clusterBkg: "#272d35",
                        clusterBorder: "#41474d",
                        edgeLabelBackground: "#1c2026",
                        cScale0: "#8fceff",
                        cScaleLabel0: "#16191d",
                        cScaleInv0: "#8fceff",
                        cScale1: "#23e0a9",
                        cScaleLabel1: "#16191d",
                        cScaleInv1: "#23e0a9",
                        cScale2: "#ffb400",
                        cScaleLabel2: "#16191d",
                        cScaleInv2: "#ffb400",
                        cScale3: "#ff6446",
                        cScaleLabel3: "#16191d",
                        cScaleInv3: "#ff6446",
                        cScale4: "#c78fff",
                        cScaleLabel4: "#16191d",
                        cScaleInv4: "#c78fff",
                        cScale5: "#b7c9d9",
                        cScaleLabel5: "#16191d",
                        cScaleInv5: "#b7c9d9",
                        cScale6: "#8fceff",
                        cScaleLabel6: "#16191d",
                        cScaleInv6: "#8fceff",
                        cScale7: "#23e0a9",
                        cScaleLabel7: "#16191d",
                        cScaleInv7: "#23e0a9",
                        cScale8: "#ffb400",
                        cScaleLabel8: "#16191d",
                        cScaleInv8: "#ffb400",
                        cScale9: "#ff6446",
                        cScaleLabel9: "#16191d",
                        cScaleInv9: "#ff6446",
                        cScale10: "#c78fff",
                        cScaleLabel10: "#16191d",
                        cScaleInv10: "#c78fff",
                        cScale11: "#b7c9d9",
                        cScaleLabel11: "#16191d",
                        cScaleInv11: "#b7c9d9",
                    },
                },
            },
            colorMode: {
                // AYON's UI is dark only, so the docs are too.
                defaultMode: "dark",
                disableSwitch: true,
                respectPrefersColorScheme: false,
            },
        }),

    markdown: {
        mermaid: true,
    },
    themes: [
        "@docusaurus/theme-mermaid",
        [
            // Local search: the index is built by `docusaurus build`, so it
            // always matches the deployed pages (no external crawler).
            require.resolve("@easyops-cn/docusaurus-search-local"),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                hashed: true,
                indexDocs: true,
                indexBlog: false,
                indexPages: false,
                docsRouteBasePath: "/docs",
                highlightSearchTermsOnTargetPage: true,
                explicitSearchResultPath: true,
            }),
        ],
    ],
    plugins: [
        [
            // Old flat URLs of the dev docs, still linked from other sites.
            "@docusaurus/plugin-client-redirects",
            {
                redirects: [
                        { from: "/docs/dev_introduction", to: "/docs/developer" },
                        { from: "/docs/dev_requirements", to: "/docs/developer/requirements" },
                        { from: "/docs/dev_dev_mode", to: "/docs/developer/developer-mode" },
                        { from: "/docs/dev_testing", to: "/docs/developer/testing" },
                        { from: "/docs/dev_contribute", to: "/docs/developer/contribute" },
                        { from: "/docs/dev_colorspace", to: "/docs/developer/colorspace" },
                        { from: "/docs/dev_event_system", to: "/docs/developer/event-system" },
                        { from: "/docs/dev_launcher", to: "/docs/developer/launcher" },
                        { from: "/docs/dev_launcher_build_windows", to: "/docs/developer/launcher/build-windows" },
                        { from: "/docs/dev_launcher_build_macos", to: "/docs/developer/launcher/build-macos" },
                        { from: "/docs/dev_launcher_build_linux", to: "/docs/developer/launcher/build-linux" },
                        { from: "/docs/dev_api_rest", to: "/docs/developer/api/rest" },
                        { from: "/docs/dev_api_graphql", to: "/docs/developer/api/graphql" },
                        { from: "/docs/dev_api_python", to: "/docs/developer/api/python" },
                        { from: "/docs/dev_api_cpp", to: "/docs/developer/api/cpp" },
                        { from: "/docs/dev_api_usd_resolver", to: "/docs/developer/api/usd-resolver" },
                        { from: "/docs/dev_components_react", to: "/docs/developer/api/react-components" },
                        { from: "/docs/server_introduction", to: "/docs/developer/server/introduction" },
                        { from: "/docs/server_api_architecture", to: "/docs/developer/server/api-architecture" },
                        { from: "/docs/server_theme", to: "/docs/developer/server/theme" },
                        { from: "/docs/server_testing", to: "/docs/developer/server/testing" },
                        { from: "/docs/dev_addon_intro", to: "/docs/developer/addon-development/intro" },
                        { from: "/docs/dev_addon_creation", to: "/docs/developer/addon-development/creation" },
                        { from: "/docs/dev_host_implementation", to: "/docs/developer/addon-development/host-implementation" },
                        { from: "/docs/dev_publishing", to: "/docs/developer/addon-development/publishing" },
                        { from: "/docs/dev_addon_workflow", to: "/docs/developer/integrations/workflow" },
                        { from: "/docs/dev_addon_workflow_event", to: "/docs/developer/integrations/workflow-events" },
                        { from: "/docs/dev_deadline", to: "/docs/developer/integrations/deadline" },
                        // generated category pages of the old Dev sidebar
                        { from: "/docs/category/addon-development", to: "/docs/developer/addon-development" },
                        { from: "/docs/category/apis--resources", to: "/docs/developer/api" },
                ],
            },
        ],
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
