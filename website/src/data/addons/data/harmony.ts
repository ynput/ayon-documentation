import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "ToonBoom Harmony",
    description:
        "Harmony 22 is an all-in-one 2D animation software. It allows you to create traditional and digital animation.",
    icon: "harmony-icon.png",
    badge: versions.Harmony_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "reviewables",
        "slates",
        "localRendering",
        "nodePresets",
        "farmRendering",
    ],
    products: [
        "harmonyTemplate",
        "harmonyPalette",
        "audio",
        "plate",
        "background",
        "rig",
        "workfile",
        "audio",
        "layeredImage",
        "layout",
        "render",
        "prerender",
        "review",
        "image",
    ],
    docs: {
        user: "addon_harmony_artist",
        admin: "addon_harmony_admin",
    },
};

export default addon;
