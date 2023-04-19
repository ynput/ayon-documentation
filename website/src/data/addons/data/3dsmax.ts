import { type Addon } from "../types";

const addon: Addon = {
    title: "3ds Max",
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
    families: [
        "model",
        "camera",
        "workfile",
        "cache",
        "pointCloud",
        "maxScene",
    ],
    docs: {
        user: "artist_hosts_3dsmax",
        admin: "admin_hosts_Houdini",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/houdini",
};

export default addon;
