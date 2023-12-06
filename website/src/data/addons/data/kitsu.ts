import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Kitsu",
    description:
        "Kitsu is a platform for Animation and VFX productions to bring teams and production tools in a single place.",
    icon: "kitsu-icon.png",
    badge: versions.Kitsu_Badge,
    docs: {
        user: "artist_kitsu",
        admin: "module_kitsu",
    },
    features: ["appLauncher",
    "reviewables",
    "trayPublisher",
    "projectManager",
],
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/kitsu",
};

export default addon;
