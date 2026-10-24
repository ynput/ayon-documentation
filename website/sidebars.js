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
        "ayon/setups",
        "ayon/plans",
        {
            type: "category",
            label: "How AYON works",
            collapsed: true,
            link: { type: "doc", id: "ayon/how-ayon-works/index" },
            items: [
                "ayon/how-ayon-works/creating-a-project",
                "ayon/how-ayon-works/permissions",
                "ayon/how-ayon-works/pipeline-storage",
                "ayon/how-ayon-works/bundles",
                "ayon/how-ayon-works/navigation",
                "ayon/how-ayon-works/artist-workflow",
                "ayon/how-ayon-works/production-workflow",
            ],
        },
        "ayon/glossary/index",
        {
            type: "category",
            label: "Web UI",
            collapsed: false,
            items: [
                "ayon/web-ui/navigating-the-web-app",
                "ayon/web-ui/keyboard-shortcuts",
                "ayon/web-ui/market",
                "ayon/web-ui/bundles-and-addons",
                "ayon/web-ui/project-bundles",
                "ayon/web-ui/users-and-permissions",
                "ayon/web-ui/events",
                "ayon/web-ui/services",
                "ayon/web-ui/secrets",
                "ayon/web-ui/attributes",
                "ayon/web-ui/entity-templates",
                "ayon/web-ui/licenses",
            ],
        },
        {
            type: "category",
            label: "Hosting",
            collapsed: false,
            items: [
                "ayon/hosting/cloud-hosting",
                "ayon/hosting/self-hosting",
                "ayon/hosting/ash",
            ],
        },
        {
            type: "category",
            label: "Backend",
            collapsed: false,
            items: ["ayon/backend/data-model/index", "ayon/backend/settings/index"],
        },
        { type: "doc", id: "ayon/migrating-openpype-projects", className: "addon-archived" },
    ],
    ProductionTracking: [
        "production-tracking/index",
        "production-tracking/tasks-home",
        "production-tracking/project-overview",
        "production-tracking/task-progress",
        "production-tracking/products-and-versions",
        "production-tracking/browser",
        "production-tracking/lists",
        "production-tracking/inbox-and-notifications",
        "production-tracking/details-panel",
        "production-tracking/activity-feed-and-comments",
        "production-tracking/links-manager",
        "production-tracking/subtasks",
        "production-tracking/teams",
        "production-tracking/views",
        "production-tracking/reviewables",
        "production-tracking/calculated-attributes",
        "production-tracking/power-features",
        "production-tracking/data-import",
        "production-tracking/versions-without-a-pipeline",
    ],
    Pipeline: [
        "pipeline/index",
        "pipeline/publishing",
        "pipeline/product-types",
        "pipeline/naming-conventions",
        {
            type: "category",
            label: "Color management",
            collapsed: false,
            items: [
                "pipeline/color-management-on-launch",
                "pipeline/color-management-in-publishing",
            ],
        },
        "pipeline/template-builder",
        {
            type: "category",
            label: "Pipeline tools",
            collapsed: false,
            items: [
                "pipeline/launcher",
                "pipeline/workfiles",
                "pipeline/loader",
                "pipeline/browser",
                "pipeline/publisher",
                "pipeline/scene-inventory",
                "pipeline/look-assigner",
                "pipeline/process-monitor",
                "pipeline/experimental-tools",
            ],
        },
    ],
    YnputCloud: ["ynput-cloud/index"],
    // Labels and descriptions of the addon categories and addons are written only here;
    // scripts/build_addons_index.py reads them for the catalogue page.
    // A new addon is a new folder, with no change needed here.
    // Three groups by scope, so the kind of addon is visible at a glance: AYON's own
    // production tracking (server addons, mostly Pro and Studio), pipeline addons
    // (everything with a pipeline part, including the application integrations), and
    // third-party project management. Each addon category stays a folder of its own,
    // so a new addon is still just a new folder.
    Addons: [
        "addons/index",
        {
            type: "category",
            label: "Production tracking",
            className: "addons-server",
            collapsed: false,
            items: [
                "addons/production-tracking/node-graph/index",
                {
                    type: "category",
                    label: "Planner",
                    collapsed: true,
                    link: { type: "doc", id: "addons/production-tracking/planner/index" },
                    items: [
                        "addons/production-tracking/planner/settings",
                    ],
                },
                {
                    type: "category",
                    label: "Power Pack",
                    collapsed: true,
                    link: { type: "doc", id: "addons/production-tracking/power-pack/index" },
                    items: [
                        "addons/production-tracking/power-pack/settings",
                    ],
                },
                "addons/production-tracking/reports/index",
                "addons/production-tracking/review/index",
                {
                    type: "category",
                    label: "Review Desktop",
                    collapsed: true,
                    link: { type: "doc", id: "addons/production-tracking/review-desktop/index" },
                    items: [
                        "addons/production-tracking/review-desktop/settings",
                    ],
                },
                "addons/production-tracking/mcp/index",
                {
                    type: "category",
                    label: "Access and support",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/access-and-support",
                        title: "Access and support",
                        description: "Server addons for signing in and getting help: single sign-on with an identity provider, Keycloak, and the Ynput Cloud login and remote support. They run on the AYON server only.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Keycloak",
                            collapsed: true,
                            link: { type: "doc", id: "addons/server-features/keycloak/index" },
                            items: [
                                "addons/server-features/keycloak/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "SSO",
                            collapsed: true,
                            link: { type: "doc", id: "addons/server-features/sso/index" },
                            items: [
                                "addons/server-features/sso/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Ynput Cloud",
                            collapsed: true,
                            link: { type: "doc", id: "addons/server-features/ynput-cloud/index" },
                            items: [
                                "addons/server-features/ynput-cloud/settings",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Pipeline addons",
            className: "addons-pipeline",
            collapsed: false,
            items: [
                {
                    type: "category",
                    label: "Essentials",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/essentials",
                        title: "Essentials",
                        description: "The addons every pipeline bundle starts from. Core is declared as required by 53 other addons and Applications by 8. Core's code also needs 3rd party binaries (FFmpeg and OpenImageIO) and OCIO configs (the built-in color configs), although it lists them only as compatible addons. TrayPublisher completes the base publishing features and is required by Batch Ingest.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "3rd party binaries",
                            collapsed: true,
                            link: { type: "doc", id: "addons/essentials/3rd-party-binaries/index" },
                            items: [
                                "addons/essentials/3rd-party-binaries/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Applications",
                            collapsed: true,
                            link: { type: "doc", id: "addons/essentials/applications/index" },
                            items: [
                                "addons/essentials/applications/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Core",
                            collapsed: true,
                            link: { type: "doc", id: "addons/essentials/core/index" },
                            items: [
                                "addons/essentials/core/settings",
                            ],
                        },
                        "addons/essentials/ocio/index",
                        {
                            type: "category",
                            label: "TrayPublisher",
                            collapsed: true,
                            link: { type: "doc", id: "addons/essentials/traypublisher/index" },
                            items: [
                                "addons/essentials/traypublisher/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Pipeline features",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/pipeline-features",
                        title: "Pipeline features",
                        description: "Pipeline addons that add publishing, delivery, storage and format features: site sync, USD, burn-ins, slates, batch ingest and delivery, archival and version control.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "ArchivalTool",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/archival-tool/index" },
                            items: [
                                "addons/pipeline-features/archival-tool/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Batch delivery",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/batch-delivery/index" },
                            items: [
                                "addons/pipeline-features/batch-delivery/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "BatchIngest",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/batch-ingest/index" },
                            items: [
                                "addons/pipeline-features/batch-ingest/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Perforce",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/perforce/index" },
                            items: [
                                "addons/pipeline-features/perforce/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Premium burnins",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/premium-burnins/index" },
                            items: [
                                "addons/pipeline-features/premium-burnins/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "SiteSync",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/sitesync/index" },
                            items: [
                                "addons/pipeline-features/sitesync/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Slater",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/slater/index" },
                            items: [
                                "addons/pipeline-features/slater/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "USD",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/usd/index" },
                            items: [
                                "addons/pipeline-features/usd/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Web Publisher",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/web-publisher/index" },
                            items: [
                                "addons/pipeline-features/web-publisher/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Version Control (archived)",
                            className: "addon-archived",
                            collapsed: true,
                            link: { type: "doc", id: "addons/pipeline-features/version-control/index" },
                            items: [
                                { type: "doc", id: "addons/pipeline-features/version-control/settings", className: "addon-archived" },
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "3D applications",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/3d-applications",
                        title: "3D applications",
                        description: "AYON addons that integrate 3D applications such as Blender, Houdini and Maya: modeling, animation, rigging, lookdev, FX and game engines.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "3DEqualizer",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/3dequalizer/index" },
                            items: [
                                "addons/3d-applications/3dequalizer/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "3ds Max",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/3dsmax/index" },
                            items: [
                                "addons/3d-applications/3dsmax/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Blender",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/blender/index" },
                            items: [
                                "addons/3d-applications/blender/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Cinema4D",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/cinema4d/index" },
                            items: [
                                "addons/3d-applications/cinema4d/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Houdini",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/houdini/index" },
                            items: [
                                "addons/3d-applications/houdini/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Marvelous Designer",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/marvelous-designer/index" },
                            items: [
                                "addons/3d-applications/marvelous-designer/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Maya",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/maya/index" },
                            items: [
                                "addons/3d-applications/maya/plugins",
                                "addons/3d-applications/maya/rendering",
                                "addons/3d-applications/maya/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Motionbuilder",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/motionbuilder/index" },
                            items: [
                                "addons/3d-applications/motionbuilder/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "PureRef",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/pureref/index" },
                            items: [
                                "addons/3d-applications/pureref/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "SpeedTree",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/speedtree/index" },
                            items: [
                                "addons/3d-applications/speedtree/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Substance Designer",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/substance-designer/index" },
                            items: [
                                "addons/3d-applications/substance-designer/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Substance Painter",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/substance-painter/index" },
                            items: [
                                "addons/3d-applications/substance-painter/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Unreal",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/unreal/index" },
                            items: [
                                "addons/3d-applications/unreal/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Wrap",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/wrap/index" },
                            items: [
                                "addons/3d-applications/wrap/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Zbrush",
                            collapsed: true,
                            link: { type: "doc", id: "addons/3d-applications/zbrush/index" },
                            items: [
                                "addons/3d-applications/zbrush/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "2D drawing applications",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/2d-drawing-applications",
                        title: "2D drawing applications",
                        description: "AYON addons that integrate 2D drawing and painting applications such as Photoshop, Harmony and TVPaint.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "CelAction",
                            collapsed: true,
                            link: { type: "doc", id: "addons/2d-drawing-applications/celaction/index" },
                            items: [
                                "addons/2d-drawing-applications/celaction/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Harmony",
                            collapsed: true,
                            link: { type: "doc", id: "addons/2d-drawing-applications/harmony/index" },
                            items: [
                                "addons/2d-drawing-applications/harmony/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Photoshop",
                            collapsed: true,
                            link: { type: "doc", id: "addons/2d-drawing-applications/photoshop/index" },
                            items: [
                                "addons/2d-drawing-applications/photoshop/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "TVPaint",
                            collapsed: true,
                            link: { type: "doc", id: "addons/2d-drawing-applications/tvpaint/index" },
                            items: [
                                "addons/2d-drawing-applications/tvpaint/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Compositing and editorial applications",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/compositing-and-editorial-applications",
                        title: "Compositing and editorial applications",
                        description: "AYON addons that integrate compositing, editorial and finishing applications such as Nuke, After Effects, Premiere and DaVinci Resolve.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "After Effects",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/after-effects/index" },
                            items: [
                                "addons/compositing-editorial-applications/after-effects/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Flame",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/flame/index" },
                            items: [
                                "addons/compositing-editorial-applications/flame/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Fusion",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/fusion/index" },
                            items: [
                                "addons/compositing-editorial-applications/fusion/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Hiero",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/hiero/index" },
                            items: [
                                "addons/compositing-editorial-applications/hiero/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Mocha Pro",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/mocha-pro/index" },
                            items: [
                                "addons/compositing-editorial-applications/mocha-pro/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Nuke",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/nuke/index" },
                            items: [
                                "addons/compositing-editorial-applications/nuke/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Premiere Pro",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/premiere-pro/index" },
                            items: [
                                "addons/compositing-editorial-applications/premiere-pro/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "DaVinci Resolve",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/resolve/index" },
                            items: [
                                "addons/compositing-editorial-applications/resolve/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Silhouette",
                            collapsed: true,
                            link: { type: "doc", id: "addons/compositing-editorial-applications/silhouette/index" },
                            items: [
                                "addons/compositing-editorial-applications/silhouette/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Review and media players",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/review-and-media-players",
                        title: "Review and media players",
                        description: "AYON addons for reviewing media: media players and review tools.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "DJV player",
                            collapsed: true,
                            link: { type: "doc", id: "addons/review-and-media-players/djv/index" },
                            items: [
                                "addons/review-and-media-players/djv/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Open RV",
                            collapsed: true,
                            link: { type: "doc", id: "addons/review-and-media-players/open-rv/index" },
                            items: [
                                "addons/review-and-media-players/open-rv/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "SyncSketch",
                            collapsed: true,
                            link: { type: "doc", id: "addons/review-and-media-players/syncsketch/index" },
                            items: [
                                "addons/review-and-media-players/syncsketch/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "xStudio",
                            collapsed: true,
                            link: { type: "doc", id: "addons/review-and-media-players/xstudio/index" },
                            items: [
                                "addons/review-and-media-players/xstudio/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Farm managers",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/farm-managers",
                        title: "Farm managers",
                        description: "AYON addons that submit publish and render jobs to render farm managers.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Deadline",
                            collapsed: true,
                            link: { type: "doc", id: "addons/farm-managers/deadline/index" },
                            items: [
                                "addons/farm-managers/deadline/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Deadline Cloud",
                            collapsed: true,
                            link: { type: "doc", id: "addons/farm-managers/deadline-cloud/index" },
                            items: [
                                "addons/farm-managers/deadline-cloud/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Royal Render",
                            collapsed: true,
                            link: { type: "doc", id: "addons/farm-managers/royal-render/index" },
                            items: [
                                "addons/farm-managers/royal-render/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Automation",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/automation",
                        title: "Automation",
                        description: "Addons for automating AYON with node-based workflows.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Workflow",
                            collapsed: true,
                            link: { type: "doc", id: "addons/automation/workflow/index" },
                            items: [
                                "addons/automation/workflow/nodes",
                                "addons/automation/workflow/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "AI",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/ai",
                        title: "AI",
                        description: "Addons that connect AYON to AI tooling.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "ComfyUI",
                            collapsed: true,
                            link: { type: "doc", id: "addons/ai/comfyui/index" },
                            items: [
                                "addons/ai/comfyui/settings",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Third-party project management",
            className: "addons-thirdparty",
            collapsed: false,
            items: [
                {
                    type: "category",
                    label: "Production trackers",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/production-trackers",
                        title: "Production trackers",
                        description: "AYON addons that connect AYON to third-party production trackers.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Airtable",
                            collapsed: true,
                            link: { type: "doc", id: "addons/third-party-trackers/airtable/index" },
                            items: [
                                "addons/third-party-trackers/airtable/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Flow (ShotGrid)",
                            collapsed: true,
                            link: { type: "doc", id: "addons/third-party-trackers/flow-shotgrid/index" },
                            items: [
                                "addons/third-party-trackers/flow-shotgrid/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "ftrack",
                            collapsed: true,
                            link: { type: "doc", id: "addons/third-party-trackers/ftrack/index" },
                            items: [
                                "addons/third-party-trackers/ftrack/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Kitsu",
                            collapsed: true,
                            link: { type: "doc", id: "addons/third-party-trackers/kitsu/index" },
                            items: [
                                "addons/third-party-trackers/kitsu/settings",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Other integrations",
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        slug: "/category/other-integrations",
                        title: "Other integrations",
                        description: "Addons that connect AYON to other third-party tools (time tracking, chat, issue tracking, HR) and the timers manager.",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Clockify",
                            collapsed: true,
                            link: { type: "doc", id: "addons/integrations/clockify/index" },
                            items: [
                                "addons/integrations/clockify/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "HiBob",
                            collapsed: true,
                            link: { type: "doc", id: "addons/integrations/hibob/index" },
                            items: [
                                "addons/integrations/hibob/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Slack",
                            collapsed: true,
                            link: { type: "doc", id: "addons/integrations/slack/index" },
                            items: [
                                "addons/integrations/slack/settings",
                            ],
                        },
                        "addons/integrations/soko/index",
                        {
                            type: "category",
                            label: "TimersManager",
                            collapsed: true,
                            link: { type: "doc", id: "addons/integrations/timers-manager/index" },
                            items: [
                                "addons/integrations/timers-manager/settings",
                            ],
                        },
                        {
                            type: "category",
                            label: "Jira (archived)",
                            className: "addon-archived",
                            collapsed: true,
                            link: { type: "doc", id: "addons/integrations/jira/index" },
                            items: [
                                { type: "doc", id: "addons/integrations/jira/settings", className: "addon-archived" },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
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
