import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Ftrack",
    description: "Ftrack is a project management tool for creative teams.",
    badge: versions.Ftrack_Badge,
    docs: {
        user: "addon_ftrack_artist",
        admin: "addon_ftrack_admin",
    },
    preview: "ftrack.png",
    github: "https://github.com/ynput/ayon-ftrack",
    features: [
        "appLauncher",
        "reviewables",
        "trayPublisher",
        "projectManager",
        "timersManager",
        "appLauncher",
    ],
};

export default addon;
