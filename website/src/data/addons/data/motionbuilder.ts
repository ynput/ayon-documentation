import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Motionbuilder",
    description:
        "Motionbuilder is a 3D character animation software which users can do virtual cinematography, motion capture and traditional keyframe animation.",
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
        user: "https://help.ayon.app/articles/7411907-working-with-motionbuilder-in-ayon",
        admin: "https://help.ayon.app/articles/8914380-configure-motionbuilder-addon",
    },
    github: "https://github.com/ynput/ayon-motionbuilder",
    discussion: "https://community.ynput.io/tag/motionbuilder",
};

export default addon;