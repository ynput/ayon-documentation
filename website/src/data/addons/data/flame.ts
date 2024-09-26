import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Flame",
    description:
        "Flame Autodesk is a high-end visual effects and finishing software used by professional studios for film, television, and commercials.",
    icon: "flame-icon.png",
    badge: versions.Flame_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "libraryLoader",
        "reviewables",
        "colorManaged",
    ],
    products: [
        "render",
        "plate",
        "review",
        "image",
        "audio",
    ],
    docs: {
        user:"addon_flame_artist",
        admin: "addon_flame_admin",
    },
    github: "https://github.com/ynput/ayon-flame",
};

export default addon;
