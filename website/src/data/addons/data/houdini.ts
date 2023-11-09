import { type Addon } from "../types";

const addon: Addon = {
    title: "Houdini",
    description:
        "Houdini is a 3D animation software tool set used for creating visual effects in film and television.",
    icon: "houdini-icon.png",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "slates",
    ],
    families: [
        "arnoldAss",
        "arnoldRender",
        "camera",
        "imagesequence",
        "hda",
        "karmaRender",
        "mantraRender",
        "pointcache",
        "redshiftProxy",
        "redshiftRender",
        "review",
        "staticmesh",
        "VDBCache",
        "vrayRender",
        "workfile",
        "usd",
        "usdRender"
    ],
    docs: {
        user: "artist_hosts_houdini",
        admin: "admin_hosts_houdini",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/houdini",
};

export default addon;
