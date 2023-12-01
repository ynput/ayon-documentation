import { type Addon } from "../types";

const addon: Addon = {
    title: "3Ds Max",
    description:
        "3ds Max is a 3D animation software tool set used for creating visual effects in film and television.",
    icon: "3ds-max-icon.png",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "slates",
        "colorManaged",
        "farmRendering",
    ],
    products: [
        "model",
        "camera",
        "workfile",
        "cache",
        "pointCloud",
        "maxScene",
    ],
    docs: {
        user: "addon_3dsmax_artist",
        admin: "addon_3dsmax_admin",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/max",
};

export default addon;
