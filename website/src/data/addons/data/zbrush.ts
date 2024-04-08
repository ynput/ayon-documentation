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
        user: "addon_zbrush_artist",
        admin: "addon_zbrush_admin",
    },
    github: "https://github.com/ynput/ayon-zbrush/tree/origin/AY-1029_Zbrush-integration/client/ayon_zbrush",
};

export default addon;
