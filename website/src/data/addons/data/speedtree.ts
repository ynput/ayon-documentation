import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "SpeedTree",
    description:
        "SpeedTree is the industry-standard vegetation toolkit for projects of any size and style, used across both games and film.",
    icon: "speedtree-icon.png",
    badge: versions.SpeedTree_Badge,
    features: [
        "workfiles",
        "publisher",
    ],
    products: ["workfile", "model"],
    docs: {
        user: "addon_speedtree_artist",
        admin: "addon_speedtree_admin",
    },
    github: "https://github.com/ynput/ayon-speedtree",
};

export default addon;
