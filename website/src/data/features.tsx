import { sortBy } from "@site/src/utils/jsUtils";

// LIST OF AVAILABLE TAGS
export type TagType =
    | "core"
    | "key"
    | "integration"
    | "ftrack"
    | "maya"
    | "nuke"
    | "deadline"
    | "hiero"
    | "blender"
    | "houdini"
    | "fusion"
    | "harmony"
    | "tvpaint"
    | "photoshop"
    | "aftereffects"
    | "addon";

export type FeaturesType = {
    [key: string]: Feature;
};

const CoreFeatures: FeaturesType = {
    workfiles: {
        title: "Workfiles",
        description:
            "Save and load workfiles in progress. Change the context inside of the application.",
        preview: require("./features/workfiles.png"),
        docs: {
            user: "artist_tools_workfiles",
        },
        tags: ["core", "key"],
    },
    creator: {
        title: "Creator",
        description:
            "Universal GUI for defining content for publishing from your DCC app.",
        // preview: require("./features/creator.png"),
        docs: {
            user: "artist_tools_creator",
        },
        tags: ["core"],
    },
    loader: {
        title: "Loader",
        description:
            "Universal GUI for loading published assets into your DCC app.",
        preview: require("./features/loader.png"),
        docs: {
            user: "artist_tools_loader",
        },
        tags: ["core", "key"],
    },
    publisher: {
        title: "Publisher",
        description:
            "Universal GUI for validating and publishing content from your DCC app.",
        // preview: require("./features/publisher.png"),
        docs: {
            user: "artist_tools_publisher",
        },
        tags: ["core"],
    },
    sceneManager: {
        title: "Scene manager",
        description:
            "Universal GUI for managing versions of assets loaded into your working scene.",
        preview: require("./features/scene_manager.png"),
        docs: {
            user: "artist_tools_inventory",
        },
        tags: ["core", "key"],
    },
    projectManager: {
        title: "Project manager",
        description:
            "Tools for creating shots, assets and task within your project if you don't use third party project management",
        // preview: require("./features/project_manager.png"),
        tags: ["core"],
    },
    libraryLoader: {
        title: "Library Loader",
        description:
            "A loader GUI that allows yo to load content from dedicated cross project asset library",
        // preview: require("./features/library_loader.png"),
        docs: {
            user: "artist_tool_library_loader",
        },
        tags: ["core"],
    },
    trayPublisher: {
        title: "Tray Publisher",
        description:
            "A standalone GUI for publishing data into pipeline without going though DCC app.",
        // preview: require("./features/tray_publisher.png"),
        tags: ["core"],
    },
    appLauncher: {
        title: "App Launcher",
        description:
            "Standalone GUI for launching application in the chosen context directly from tray",
        // preview: require("./features/app_launcher.png"),
        tags: ["core"],
    },
    configurationGUI: {
        title: "Configuration GUI",
        description:
            "All settings and configuration are done via AYON Settings tool. No need to dig around .json and .yaml",
        // preview: require("./features/configuration_gui.png"),
        tags: ["core"],
    },
    siteSync: {
        title: "Site Sync",
        description:
            "Built in file synchronization between your central storage (cloud or physical) and all your freelancers",
        // preview: require("./features/site_sync.png"),
        docs: {
            admin: "module_site_sync",
        },
        tags: ["core"],
    },
    timersManager: {
        title: "Timers Manager",
        description:
            "Service for monitoring the user activity to start, stop and synchronise time tracking.",
        // preview: require("./features/timers_manager.png"),
        docs: {
            admin: "admin_settings_system#timers-manager",
        },
        tags: ["core"],
    },
};

const NukeFeatures: FeaturesType = {
    nuke: {
        title: "Nuke",
        description:
            "Nuke is a compositing software for visual effects and motion graphics artists.",
        preview: require("./features/nuke.png"),
        docs: {
            user: "artist_hosts_nuke",
        },
        tags: ["nuke", "integration"],
    },
    colorManaged: {
        title: "Color Managed",
        description: "Fully colour managed outputs for work and review",
        preview: require("./features/color_managed.png"),
        docs: {
            user: "artist_hosts_nuke#set-colorspace",
        },
        tags: ["nuke"],
    },
    scriptBuilding: {
        title: "Script Building",
        description:
            "Automatically build initial workfiles from published plates or renders",
        preview: require("./features/script_building.png"),
        docs: {
            user: "artist_hosts_nuke#build-first-work-file",
        },
        tags: ["nuke"],
    },
    nodePresets: {
        title: "Node Presets",
        description:
            "Template system for centrally controlled node parameters.",
        // preview: require("./features/node_presets.png"),
        tags: ["nuke"],
    },
    rendering: {
        title: "Rendering",
        description:
            "Support for local and farm renders, including baked reviews.",
        tags: ["nuke"],
        preview: require("./features/rendering.png"),
    },
    slates: {
        title: "Slates",
        description: "Generate slates and attach them to rendered.",
        tags: ["nuke"],
        preview: require("./features/slates.png"),
    },
};

const ExtraFeatures: FeaturesType = {
    ftrack: {
        title: "Ftrack",
        description: "Ftrack is a project management tool for creative teams.",
        docs: {
            user: "artist_ftrack",
            admin: "module_ftrack",
        },
        preview: require("./features/ftrack.png"),
        tags: ["ftrack"],
    },
};

// add other features
export const Features: FeaturesType = {
    ...CoreFeatures,
    ...NukeFeatures,
    ...ExtraFeatures,
};

export type DocType = "user" | "admin" | "developer";

export type Feature = {
    title: string;
    description: string;
    preview?: string;
    tags: TagType[];
    docs?: { [type in DocType]?: String };
    families?: string[];
};

export type Tag = {
    label: string;
    feature?: string;
};

export const Tags: { [type in TagType]: Tag } = {
    key: {
        label: "Key",
    },
    core: {
        label: "Core",
    },
    integration: {
        label: "Integrations",
    },
    ftrack: {
        label: "Ftrack",
        feature: "ftrack",
    },
    nuke: {
        label: "Nuke",
        feature: "nuke",
    },
};

export type Family = {
    label: string;
};

export const TagList = Object.keys(Tags) as TagType[];
function sortFeatures() {
    let result = Object.values(Features);
    // Sort by site name
    result = sortBy(result, (feature) => feature.title.toLowerCase());
    // Sort by favorite tag, favorites first
    result = sortBy(result, (feature) => !feature.tags.includes("favorite"));
    return result;
}

export const sortedFeatures = sortFeatures();
