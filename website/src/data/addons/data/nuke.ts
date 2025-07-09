import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Nuke",
    description: `
Nuke is a powerful node-based compositing software used extensively in the film and television industry for creating high-quality visual effects, offering a range of advanced tools and features for efficient and flexible workflows.

All the information also applies to _NukeX_ and _NukeAssist_.
We are supporting versions \`11.0\` and above.
    `,
    preview: "nuke.png",
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
        user: "https://help.ayon.app/articles/4670584-working-with-nuke-in-ayon",
        admin: "https://help.ayon.app/articles/2833967-nuke-addon-settings",
    },
    github: "https://github.com/ynput/ayon-nuke",
    discussion: "https://community.ynput.io/tag/nuke",
};

export default addon;
