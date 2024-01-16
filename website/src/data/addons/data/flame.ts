import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Flame",
    description:
        "Flame Autodesk is a high-end visual effects and finishing software used by professional studios for film, television, and commercials.",
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/flame",
    icon: "flame-icon.png",
    badge: versions.Flame_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "slates",
        "colorManaged",
        "localRendering",
        "nodePresets",
    ],
    products: [
        "render",
        "plate",
        "review",
        "lut",
        "image",
        "workfile",
        "audio",
    ],
};

export default addon;
