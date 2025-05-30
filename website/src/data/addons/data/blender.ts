import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Blender",
    description:
        "Blender is a free, open-source, and user-friendly 3D creation suite for artists.",
    badge: versions.Blender_Badge,
    docs: {
        user: "https://help.ayon.app/articles/2501380-working-with-blender-in-ayon",
        admin: "https://help.ayon.app/articles/6836825-configure-blender-addon",
    },
    github: "https://github.com/ynput/ayon-blender",
    discussion: "https://community.ynput.io/tag/blender",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "slates",
        "colorManaged",
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
};

export default addon;
