import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "OpenRV",
    description:
        "Open RV is an image and sequence viewer for VFX and animation artists. Open RV is high-performant, hardware accelerated, and pipeline-friendly.",
    icon: "openrv-icon.svg",
    badge: versions.OpenRV_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
    ],
    products: ["workfile"],
    docs: {
        user: "addon_openrv_artist",
    },
    github: "https://github.com/ynput/ayon-openrv",
};

export default addon;
