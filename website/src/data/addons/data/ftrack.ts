import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "ftrack",
    description: "ftrack is a project management tool for creative teams.",
    badge: versions.Ftrack_Badge,
    docs: {
        user: "https://help.ayon.app/articles/6899451-working-with-ftrack-in-ayon",
        admin: "https://help.ayon.app/articles/1229195-configure-ftrack-addon",
    },
    preview: "ftrack.png",
    github: "https://github.com/ynput/ayon-ftrack",
    discussion: "https://community.ynput.io/tag/ftrack",
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
