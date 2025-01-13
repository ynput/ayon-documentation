import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "3DEqualizer",
    description:
        "3DEqualizer stands as the premier 3D tracking solution in the VFX industry, seamlessly merging live-action footage with digital visual effects at the highest quality. It is a cornerstone of modern post-production, trusted by virtually all major players globally.",
    icon: "3de4.png",
    badge: versions.Equalizer_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
    ],
    products: [
        "camera",
        "workfile",
    ],
    docs: {
        user: "addon_3dequalizer_artist",
        admin: "addon_3dequalizer_admin",
    },
    github: "https://github.com/ynput/ayon-equalizer",
};

export default addon;
