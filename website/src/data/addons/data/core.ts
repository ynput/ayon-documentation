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
        user: "https://help.ayon.app/collections/3002056-pipeline-tools",
        admin: "https://help.ayon.app/articles/3005275-core-addon-settings",
    },
    github: "https://github.com/ynput/ayon-core",
    discussion: "https://community.ynput.io/tag/core",
};

export default addon;
