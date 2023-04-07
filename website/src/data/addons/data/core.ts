import { type Addon } from "../types";

const addon: Addon = {
    title: "Core",
    description: "A set of core pipeline tools and features available in all addons.",
    icon: "core-icon.png",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "appLauncher",
        "trayPublisher",
        "projectManager",
        "configurationGUI",
        "siteSync",
        "reviewables",
        "remoteWorkflow",
        "timersManager",
    ],
    families: [],
    docs: {
        user: "artist_tools",
        admin: "system_introduction",
    },

    github: "https://github.com/ynput/OpenPype",
};

export default addon;
