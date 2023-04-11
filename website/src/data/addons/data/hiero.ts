import { type Addon } from "../types";

const addon: Addon = {
    title: "Hiero",
    description:
        "Hiero is a versatile VFX tool for artists and teams. It helps you review, edit, and conform shots.",
    preview: "hiero.png",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "colorManaged",
        "localRendering",
    ],
    families: [
        "render",
        "plate",
        "review",
        "lut",
        "image",
        "nukeNodes",
        "gizmo",
        "workfile",
    ],
    docs: {
        user: "artist_hosts_hiero",
        admin: "admin_hosts_hiero",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/hiero",
};

export default addon;
