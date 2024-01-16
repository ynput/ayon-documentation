import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Blender",
    description:
        "Blender is a free, open-source, and user-friendly 3D creation suite for artists.",
    badge: versions.Blender_Badge,
    docs: {
        user: "addon_blender_artist",
        admin: "addon_blender_admin",
    },
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "slates",
        "colorManaged"
    ],
    products: [
        "model",
        "rig",
        "layout",
        "animation",
        "camera",
        "layout",
        "review",
        "pointcache",
    ],
    icon: "blender-icon.png",
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/blender",
};

export default addon;
