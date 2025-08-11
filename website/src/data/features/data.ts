import { type FeatureType, type Feature } from "./types";

export const topFeatures: FeatureType[] = [
    "workfiles",
    "loader",
    "publisher",
    "appLauncher",
    "localRendering",
    "scriptBuilding",
    "sceneManager",
    "farmRendering",
];

// to add a new feature, make sure to add it to the FeatureType type inside ./types.ts
const features: { [type in FeatureType]: Feature } = {
    slates: {
        title: "Slates",
        description: "Generate slates and attach them to rendered.",
        preview: "slates.jpg",
    },
    workfiles: {
        title: "Workfiles",
        description:
            "Save and load workfiles in progress. Change the context inside of the application.",
        preview: "workfiles.png",
        docs: {
            user: "https://help.ayon.app/en/help/articles/9624270-workfiles",
        },
    },
    loader: {
        title: "Loader",
        description:
            "Universal GUI for loading published assets into your DCC app.",
        preview: "loader.mp4",
        docs: {
            user: "https://help.ayon.app/en/help/articles/4345209-loader",
        },
    },
    publisher: {
        title: "Publisher",
        description:
            "Universal GUI for validating and publishing content from your DCC app.",
        preview: "publisher.mp4",
        docs: {
            user: "https://help.ayon.app/en/help/articles/1075843-creator-publisher",
        },
    },
    sceneManager: {
        title: "Scene manager",
        description:
            "Universal GUI for managing versions of assets loaded into your working scene.",
        preview: "scene_manager.png",
        docs: {
            user: "https://help.ayon.app/en/help/articles/9770233-scene-inventory",
        },
    },
    sgSync: {
        title: "Flow (Shotgrid) Sync",
        description:
            "A way to synchronize projects across AYON and Flow (Shotgrid), as well as react to events in either platform.",
        preview: "shotgrid_sync.png",
        docs: {
            user: "https://help.ayon.app/en/help/articles/3639938-configure-flow-shotgrid-addon",
        },
    },
    aquariumSync: {
        title: "Aquarium Sync",
        description:
            "Keep Ayon syncronized with your Aquarium's project, and create Aquarium from Ayon.",
        preview: "aquarium_sync.png",
        github: "https://github.com/ynput/ayon-aquarium",
        docs: {
            developer: "addon_aquarium_developer",
        },
    },
    trayPublisher: {
        title: "Tray Publisher",
        description:
            "A standalone GUI for publishing data into pipeline without going though DCC app.",
    },
    appLauncher: {
        title: "App Launcher",
        preview: "launcher.png",
        description:
            "Standalone GUI for launching application in the chosen context directly from tray",
    },
    configurationGUI: {
        title: "Configuration GUI",
        description:
            "All settings and configuration are done via AYON Settings tool. No need to dig around .json and .yaml",
    },
    siteSync: {
        title: "Site Sync",
        description:
            "Built in file synchronization between your central storage (cloud or physical) and all your freelancers",
        docs: {
            admin: "https://help.ayon.app/en/help/articles/3882937-site-sync",
        },
    },
    timersManager: {
        title: "Timers Manager",
        description:
            "Service for monitoring the user activity to start, stop and synchronise time tracking.",
        docs: {
        },
        github: "https://github.com/ynput/ayon-timers-manager"
    },
    farmRendering: {
        title: "Farm rendering",
        docs: {
            user: "https://help.ayon.app/en/help/articles/8138091-working-with-deadline-in-ayon",
            admin: "https://help.ayon.app/en/help/articles/5372986-configure-deadline-addon",
        },
        description:
            "Integrations with render managers. Render, publish and generate reviews on the farm.",
    },
    remoteWorkflow: {
        title: "Remote Workflow",
        description:
            "Production proven in fully remote workflows. AYON can run of cloud servers and storage.",
    },
    sceneBuilder: {
        title: "Scene Builder",
        description:
            "System for simple scene building. Loads pre-defined publishes to scene with single click, speeding up scene preparation.",
    },
    reviewables: {
        title: "Reviewables",
        docs: {
            user: "https://help.ayon.app/en/help/articles/3005275-core-addon-settings#izrleolormb",
        },
        description:
            "Generate automated reviewable quicktimes and sequences in any format, with metadata burnins.",
    },
    colorManaged: {
        title: "Color Managed",
        description: "Fully colour managed outputs for work and review",
        preview: "color_managed.png",
        docs: {
            user: "https://help.ayon.app/en/help/articles/1279384-colorspace-settings",
        },
    },
    nodePresets: {
        title: "Node Presets",
        description:
            "Template system for centrally controlled node parameters.",
    },
    localRendering: {
        title: "Local Rendering",
        description: "Support for local renders and their publishing.",
        preview: "rendering.png",
    },
    burnins: {
        title: "Burnins",
        description: "Support for image metadata burnins.",
        preview: "burnins.png",
    },
    bakingColorspacePresets: {
        title: "Baking Colorspace Presets",
        description: "Support for baking colorspace presets.",
        preview: "baking_colorspace_presets.png",
    },
};

export default features as { [type in FeatureType]: Feature & { id: string } };
