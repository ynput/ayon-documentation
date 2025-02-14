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
        user: "addon_silhouette_artist",
        admin: "addon_silhouette_admin",
    },
    github: "https://github.com/ynput/ayon-silhouette",
};

export default addon;
