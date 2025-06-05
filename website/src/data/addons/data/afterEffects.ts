import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "After Effects",
    description:
        "After Effects is a powerful motion graphics and visual effects software that is used by professionals in the film, television, and web industries.",
    preview: "after-effects.png",
    badge: versions.Aftereffects_Badge,
    docs: {
        user: "https://help.ayon.app/articles/9429657-working-with-after-effects-in-ayon",
        admin: "https://help.ayon.app/articles/4515672-aftereffects-addon-settings",
    },
    github: "https://github.com/ynput/ayon-aftereffects",
    discussion: "https://community.ynput.io/tag/after-effects",
    products: [
        "render",
        "plate",
        "image",
        "audio",
        "background",
        "workfile",
        "prerender",
        "review",
    ],
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
};

export default addon;
