import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Kitsu",
    description:
        "Kitsu is a platform for Animation and VFX productions to bring teams and production tools in a single place.",
    icon: "kitsu-icon.png",
    badge: versions.Kitsu_Badge,
    docs: {
        user: "https://help.ayon.app/articles/6394498-working-with-kitsu-in-ayon",
        admin: "https://help.ayon.app/articles/3271341-kitsu-addon-settings",
    },
    features: ["appLauncher", "reviewables", "trayPublisher", "projectManager"],
    github: "https://github.com/ynput/ayon-kitsu",
    discussion: "https://community.ynput.io/tag/kitsu",
};

export default addon;
