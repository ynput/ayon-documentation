import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Zbrush",
    description:
        "Pixologic ZBrush is a digital sculpting software which users can do 3D/2.5D modeling, texturing and painting.",
    icon: "zbrush-icon.png",
    badge: versions.Zbrush_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
    ],
    products: [
        "model",
        "workfile",
    ],
    docs: {
        user: "https://help.ayon.app/articles/2471745-working-with-zbrush-in-ayon",
        admin: "https://help.ayon.app/articles/9376182-zbrush-addon-settings",
    },
    github: "https://github.com/ynput/ayon-zbrush",
    discussion: "https://community.ynput.io/tag/zbrush",
};

export default addon;
