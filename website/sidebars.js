function sorted(a, b) {
    const nameA = typeof a == "string" ? a : a.items[0] || a.label;
    const nameB = typeof b == "string" ? b : b.items[0] || b.label;
    return nameA > nameB ? 1 : -1;
}

// One sidebar per group. Each group is also a top-level folder in docs/ and an
// item in the navbar, so a page's folder, sidebar and navbar item agree and
// URLs stay clean: /docs/<group>/<topic>/...
module.exports = {
    Ayon: [
        "ayon/introduction",
        "ayon/how-ayon-works/index",
        "ayon/glossary/index",
        "ayon/ways-to-set-up/index",
    ],
    Backend: ["backend/data-model/index", "backend/settings/index"],
    Pipeline: ["pipeline/pipeline-flow/index", "pipeline/pipeline-tools/index"],
    Server: ["server/web-ui/index", "server/automations/index"],
    Hosting: ["hosting/server-hosting/index", "hosting/ash/index"],
    YnputCloud: [
        "ynput-cloud/cloud-ui/index",
        "ynput-cloud/plans/index",
        "ynput-cloud/cloud-hosting/index",
    ],
    Addons: ["addons/index"],
    Developer: [
        "developer/index",
        "developer/requirements",
        {
            type: "category",
            collapsed: true,
            label: "AYON Launcher",
            link: { type: "doc", id: "developer/launcher/index" },
            items: [
                "developer/launcher/build-windows",
                "developer/launcher/build-macos",
                "developer/launcher/build-linux",
            ],
        },
        {
            type: "category",
            label: "APIs & Resources",
            link: { type: "doc", id: "developer/api/index" },
            items: [
                "developer/api/rest",
                "developer/api/graphql",
                "developer/api/python",
                "developer/api/cpp",
                "developer/api/usd-resolver",
                "developer/api/react-components",
            ],
        },
        "developer/resources",
        {
            type: "category",
            label: "AYON server",
            items: [
                "developer/server/introduction",
                "developer/server/api-architecture",
                "developer/server/theme",
                "developer/server/testing",
            ],
        },
        "developer/developer-mode",
        "developer/testing",
        "developer/contribute",
        {
            type: "category",
            label: "Addon Development",
            link: {
                type: "generated-index",
                title: "AYON Addon Development",
                description: "Welcome to AYON Addon Development Documentation!",
                slug: "/developer/addon-development",
                keywords: ["addon", "dev"],
            },
            items: [
                "developer/addon-development/intro",
                "developer/addon-development/creation",
                "developer/addon-development/host-implementation",
                "developer/addon-development/publishing",
            ],
        },
        "developer/colorspace",
        "developer/event-system",
        {
            type: "category",
            label: "Integrations",
            items: [
                "developer/integrations/workflow",
                "developer/integrations/workflow-events",
                "developer/integrations/deadline",
            ].sort(sorted),
        },
    ],
};
