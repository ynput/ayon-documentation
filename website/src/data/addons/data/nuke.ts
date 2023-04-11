import { type Addon } from "../types";

const addon: Addon = {
    title: "Nuke",
    description:
        "Nuke is a compositing software for visual effects and motion graphics artists.",
    preview: "nuke.png",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "slates",
        "colorManaged",
        "localRendering",
        "farmRendering",
        "nodePresets",
    ],
    families: [
        "nukeNodes",
        "camera",
        "gizmo",
        "render",
        "model",
        "audio",
        "pointcache",
        "image",
        "layeredImage",
        "workfile",
        "lut",
    ],
    docs: {
        user: "artist_hosts_nuke",
        admin: "admin_hosts_nuke",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/nuke",
};

export default addon;
