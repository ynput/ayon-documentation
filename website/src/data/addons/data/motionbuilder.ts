import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Motion Builder",
    description:
        "MotionBuilder is a 3D character animation software which users can do virtual cinematography, motion capture and traditional keyframe animation.",
    icon: "motionbuilder-icon.png",
    badge: versions.MotionBuilder_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
    ],
    products: [
        "animation",
        "model",
        "camera",
        "workfile",
        "rig"
    ],
    docs: {
        user: "addon_motionbuilder_artist",
        admin: "addon_motionbuilder_admin",
    },
    github: "https://github.com/ynput/ayon-motionbuilder",
};

export default addon;