import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Harmony",
    description:
        "ToonBoom Harmony 22 is an all-in-one 2D animation software. It allows you to create traditional and digital animation.",
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
        user: "https://help.ayon.app/articles/3580393-working-with-harmony-in-ayon",
        admin: "https://help.ayon.app/articles/5752971-harmony-addon-settings",
    },
    github: "https://github.com/ynput/ayon-harmony",
    discussion: "https://community.ynput.io/tag/toonboom-harmony",
};

export default addon;
