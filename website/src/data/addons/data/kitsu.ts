import { type Addon } from "../types";

const addon: Addon = {
    title: "Kitsu",
    description:
        "Kitsu is a platform for Animation and VFX productions to bring teams and production tools in a single place.",
    icon: "kitsu-icon.png",
    docs: {
        user: "addon_kitsu_artist",
        admin: "addon_kitsu_admin",
    },
    features: ["appLauncher",
    "reviewables",
    "trayPublisher",
    "projectManager",
],
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/kitsu",
};

export default addon;
