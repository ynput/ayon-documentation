import { type Addon } from "../types";

const addon: Addon = {
    title: "Nuke",
    description:`
Nuke is a powerful node-based compositing software used extensively in the film and television industry for creating high-quality visual effects, offering a range of advanced tools and features for efficient and flexible workflows.

**Variants**: _NukeX_, _NukeAssist_

**Versions**: \`11.3\`, \`12.2\`, \`13.2\`, \`14.0\`
    `,
    preview: "nuke.png",
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
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/nuke",
};

export default addon;
