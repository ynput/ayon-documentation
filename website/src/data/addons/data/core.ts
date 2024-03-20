import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Core",
    description:
        "A set of core pipeline tools and features available in all addons.",
    icon: "core-icon.png",
    badge: versions.Core_Badge,
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
    products: [],
    docs: {
        user: "artist_tools",
        admin: "system_introduction",
    },

    github: "https://github.com/ynput/OpenPype",
};

export default addon;
