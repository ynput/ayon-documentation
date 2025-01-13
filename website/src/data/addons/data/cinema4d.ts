import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Cinema4D",
    description:
        "AYON integration addon for Maxon Cinema4D, the go-to software for 3D modeling, animation, simulation, and rendering. The AYON integration supports managing your workfiles, loading and managing loaded products and publishing Cinema4D outputs directly back into the pipeline.",
    icon: "cinema4d-icon.png",
    badge: versions.Cinema4d_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
    ],
    products: [
        "camera",
        "pointcache",
        "review",
        "render",
        "workfile",
    ],
    docs: {
        user: "addon_cinema4d_artist",
        admin: "addon_cinema4d_admin",
    },
    github: "https://github.com/Ynput/ayon-cinema4d",
};

export default addon;
