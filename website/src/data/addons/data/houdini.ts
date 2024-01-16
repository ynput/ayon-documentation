import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Houdini",
    description:
        "Houdini is a 3D animation software tool set used for creating visual effects in film and television.",
    icon: "houdini-icon.png",
    badge: versions.Houdini_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "slates",
    ],
    products: [
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
        "usdRender",
    ],
    docs: {
        user: "addon_houdini_artist",
        admin: "addon_houdini_admin",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/houdini",
};

export default addon;
