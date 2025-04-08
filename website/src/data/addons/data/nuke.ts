import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Nuke",
    description: `
Nuke is a powerful node-based compositing software used extensively in the film and television industry for creating high-quality visual effects, offering a range of advanced tools and features for efficient and flexible workflows.

**Variants**: _NukeX_, _NukeAssist_

**Versions**: AYON supports Nuke version **\`13.0\`** and above.
    `,
    icon: "nuke.png",
    badge: versions.Nuke_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "slates",
        "burnins",
        "colorManaged",
        "localRendering",
        "farmRendering",
        "nodePresets",
        "bakingColorspacePresets",
    ],
    products: [
        "nukeNodes",
        "camera",
        "gizmo",
        "render",
        "prerender",
        "model",
        "pointcache",
        "image",
        "layeredImage",
        "workfile",
    ],
    docs: {
        user: "addon_nuke_artist",
        admin: "addon_nuke_admin",
    },
    github: "https://github.com/ynput/ayon-nuke",
};

export default addon;
