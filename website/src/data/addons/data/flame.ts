import { type Addon } from "../types";

const addon: Addon = {
    title: "Flame",
    description:
        "Flame Autodesk is a high-end visual effects and finishing software used by professional studios for film, television, and commercials.",
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/flame",
    icon: "flame-icon.png",
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
        "nodePresets"
    ],
    families: [
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
