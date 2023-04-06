import { type FeatureType, type Feature } from "./types";

// to add a new feature, make sure to add it to the FeatureType type first
const features: { [type in FeatureType]: Feature } = {
    slates: {
        title: "Slates",
        description: "Generate slates and attach them to rendered.",
        preview: "slates.png",
    },
    workfiles: {
        title: "Workfiles",
        description:
            "Save and load workfiles in progress. Change the context inside of the application.",
        preview: "workfiles.png",
        docs: {
            user: "artist_tools_workfiles",
        },
    },
    creator: {
        title: "Creator",
        description:
            "Universal GUI for defining content for publishing from your DCC app.",
        docs: {
            user: "artist_tools_creator",
        },
    },
    loader: {
        title: "Loader",
        description:
            "Universal GUI for loading published assets into your DCC app.",
        preview: "loader.png",
        docs: {
            user: "artist_tools_loader",
        },
    },
    publisher: {
        title: "Publisher",
        description:
            "Universal GUI for validating and publishing content from your DCC app.",
        docs: {
            user: "artist_tools_publisher",
        },
    },
    sceneManager: {
        title: "Scene manager",
        description:
            "Universal GUI for managing versions of assets loaded into your working scene.",
        preview: "scene_manager.png",
        docs: {
            user: "artist_tools_inventory",
        },
    },
    projectManager: {
        title: "Project manager",
        description:
            "Tools for creating shots, assets and task within your project if you don't use third party project management",
    },
    libraryLoader: {
        title: "Library Loader",
        description:
            "A loader GUI that allows yo to load content from dedicated cross project asset library",
        docs: {
            user: "artist_tool_library_loader",
        },
    },
    trayPublisher: {
        title: "Tray Publisher",
        description:
            "A standalone GUI for publishing data into pipeline without going though DCC app.",
    },
    appLauncher: {
        title: "App Launcher",
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
            admin: "module_site_sync",
        },
    },
    timersManager: {
        title: "Timers Manager",
        description:
            "Service for monitoring the user activity to start, stop and synchronise time tracking.",
        docs: {
            admin: "admin_settings_system#timers-manager",
        },
    },
    farmRendering: {
        title: "Farm rendering",
        docs: {
            admin: "module_deadline",
        },
        description:
            "Integrations with Deadline and Muster render managers. Render, publish and generate reviews on the farm.",
    },
    remote: {
        title: "Remote",
        description:
            "Production proven in fully remote workflows. Pype can run of cloud servers and storage.",
    },
    sceneBuilder: {
        title: "Scene Builder",
        description:
            "System for simple scene building. Loads pre-defined publishes to scene with single click, speeding up scene preparation.",
    },
    reviewables: {
        title: "Reviewables",
        docs: {
            user: "docs/project_settings/settings_project_global#extract-review",
        },
        description:
            "Generate automated reviewable quicktimes and sequences in any format, with metadata burnins.",
    },
    scriptBuilding: {
        title: "Script Building",
        description:
            "Automatically build initial workfiles from published plates or renders",
        preview: "script_building.png",
        docs: {
            user: "artist_hosts_nuke#build-first-work-file",
        },
    },
    colorManaged: {
        title: "Color Managed",
        description: "Fully colour managed outputs for work and review",
        preview: "color_managed.png",
        docs: {
            user: "artist_hosts_nuke#set-colorspace",
        },
    },
    nodePresets: {
        title: "Node Presets",
        description:
            "Template system for centrally controlled node parameters.",
    },
    rendering: {
        title: "Rendering",
        description:
            "Support for local and farm renders, including baked reviews.",
        preview: "rendering.png",
    },
};

export default features;
