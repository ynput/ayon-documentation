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
        user: "https://help.ayon.app/articles/4884565-working-with-3dequalizer-in-ayon",
        admin: "https://help.ayon.app/articles/0829992-configure-3dequalizer-addon",
    },
    github: "https://github.com/ynput/ayon-equalizer",
    discussion: "https://community.ynput.io/tag/3d-equalizer",
};

export default addon;
