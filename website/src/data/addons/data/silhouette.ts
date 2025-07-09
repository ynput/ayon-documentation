import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Silhouette",
    description:
        "Boris FX Silhouette is an award-winning rotoscoping and paint tool that also delivers powerful high-end compositing options.",
    icon: "Boris_FX_Silhouette.png",
    badge: versions.Silhouette_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
    ],
    products: [
        "workfile",
        "render",
        "trackpoints",
        "matteshapes",
    ],
    docs: {
        user: "https://help.ayon.app/articles/9127304-working-with-silhouette-in-ayon",
        admin: "https://help.ayon.app/articles/5294823-silhouette-addon-settings",
    },
    github: "https://github.com/ynput/ayon-silhouette",
    discussion: "https://community.ynput.io/tag/silhouette",
};

export default addon;
