import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "3Ds Max",
    description:
        "3ds Max is a 3D animation software tool set used for creating visual effects in film and television.",
    icon: "3ds-max-icon.png",
    badge: versions.Max_Badge,
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
        user: "https://help.ayon.app/articles/6074628-working-with-3ds-max-in-ayon",
        admin: "https://help.ayon.app/articles/3959010-3ds-max-addon-settings",
    },
    github: "https://github.com/ynput/ayon-3dsmax",
    discussion: "https://community.ynput.io/tag/3ds-max",
};

export default addon;
